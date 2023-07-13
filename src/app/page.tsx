"use client";

/* eslint-disable */

import Image from "next/image";
import styles from "./page.module.css";
import playerData from "../../server/data2.json";
import { getRandomPlayers, getRandomItem } from "@/utils/getRandomPlayer";
import { useEffect, useState } from "react";
import Stat from "./components/Stat/Stat";
import Input from "./components/Input/Input";

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
    getRandomPlayers(playerData, 100, 80)
  );
  const [randomPlayer, setRandomPlayer] = useState<Player>({
    name: "",
    position: [],
    height: "",
    overall: "",
    image: "",
  });
  const [reveal, setReveal] = useState<boolean>(false);
  const [showAllPlayers, setShowAllPlayers] = useState<boolean>(false);

  useEffect(() => {
    setRandomPlayer(getRandomItem(players));
  }, []);

  const { name, position, height, overall, image } = randomPlayer;

  console.log(randomPlayer, players);

  if (!randomPlayer) {
    return null;
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
                  setReveal(false);
                }}
              >
                Next
              </button>
            ) : (
              <button
                className={styles.button}
                onClick={() => {
                  setReveal(true);
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
          <Input players={players} />
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
