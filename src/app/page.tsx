"use client";

/* eslint-disable */

import Image from "next/image";
import styles from "./page.module.css";
import playerData from "../../server/data2.json";
import { getRandomPlayers, getRandomItem } from "@/utils/getRandomPlayer";
import { useEffect, useState } from "react";
import Stat from "./components/Stat/Stat";
import Input from "./components/Input/Input";
import Score from "./components/Score/Score";

interface Player {
  name: string;
  position: string[];
  height: string;
  overall: string;
  image?: string;
  extraData?: string;
}

export default function Home(props: any) {
  const [players, setPlayers] = useState<Player[]>(
    getRandomPlayers(playerData, 5, 95)
  );
  const [randomPlayer, setRandomPlayer] = useState<Player>({
    name: "",
    position: [],
    height: "",
    overall: "",
    image: "",
  });
  // const [reveal, setReveal] = useState<boolean>(false);
  const [showAllPlayers, setShowAllPlayers] = useState<boolean>(false);
  // const [chances, setChances] = useState(8);
  // const [gameResult, setGameResult] = useState("inProgress");
  // const [guesses, setGuesses] = useState([]);

  const [game, setGame] = useState({
    chances: 8,
    guesses: [],
    gameResult: "inProgress",
    reveal: false,
  });

  const { chances, guesses, gameResult, reveal } = game;

  useEffect(() => {
    setRandomPlayer(getRandomItem(players));
  }, []);

  useEffect(() => {
    if (chances === 0) {
      setGame({ ...game, gameResult: "lose" });
    }
  }, [game.chances]);

  const { name, position, height, overall, image } = randomPlayer;

  if (!randomPlayer) {
    return null;
  }

  function selectPlayer(player) {
    if (player === randomPlayer.name) {
      setGame({ ...game, reveal: true, gameResult: "win" });
    } else {
      setGame({ ...game, chances: game.chances - 1 });
    }
  }

  if (gameResult === "win" || gameResult === "lose") {
    return (
      <main className={styles.main}>
        {gameResult === "win" && <p>You Won</p>}
        {gameResult === "lose" && <p>You lost!</p>}
        <button
          onClick={() => {
            setGame({
              chances: 8,
              guesses: [],
              gameResult: "inProgress",
              reveal: false,
            });

            setRandomPlayer(getRandomItem(players));
          }}
        >
          Play Again
        </button>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.container}>
          <div className={styles.container_item}>
            <p>Position: </p>

            <div className={styles.container_item_position}>
              {randomPlayer.position.map((position) => {
                return <span key={`${name}${position}`}>{position}</span>;
              })}
            </div>
          </div>
          {height && <Stat atr="Height" data={height} />}
          {randomPlayer.extraData && (
            <Stat atr="Extra Data" data={randomPlayer.extraData} />
          )}
          <Stat atr="Overall" data={overall} />
          <div>
            {reveal ? (
              <button
                className={styles.button}
                onClick={() => {
                  setRandomPlayer(getRandomItem(players));
                  setGame({ ...game, reveal: false });
                }}
              >
                Next
              </button>
            ) : (
              <button
                className={styles.button}
                onClick={() => {
                  setGame({ ...game, chances: game.chances - 1, reveal: true });
                }}
              >
                Reveal Player
              </button>
            )}
          </div>
          <div></div>
        </div>

        <div>
          <Stat atr="Name" data={reveal ? randomPlayer.name : "???"} />
          {reveal && (
            <Image
              className={styles.image}
              src={randomPlayer.image || "/noPlayerImage.png"}
              alt="player image"
              height={195}
              width={143}
            />
          )}
        </div>
        <div>
          {!reveal && (
            <Input
              randomPlayer={randomPlayer}
              players={players}
              onSelect={selectPlayer}
            />
          )}
        </div>

        <div>
          <Score text="Chances" rounds={chances} emoji="💜" />
        </div>
      </div>

      <div>
        <button
          className={styles.button}
          onClick={() => {
            setShowAllPlayers(!showAllPlayers);
          }}
        >
          Show all possible players
        </button>

        {showAllPlayers && (
          <div className={styles.showAllPlayers}>
            {players.map((player) => {
              return <p>{player.name}</p>;
            })}
          </div>
        )}
      </div>
    </main>
  );
}
