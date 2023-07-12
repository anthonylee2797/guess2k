"use client";

/* eslint-disable */

import Image from "next/image";
import styles from "./page.module.css";
import playerData from "../../server/data2.json";
import { getRandomPlayers, getRandomItem } from "@/utils/getRandomPlayer";
import { useEffect, useState } from "react";

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
    getRandomPlayers(playerData, 60, 84)
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
        <h1>Guess the nba player</h1>

        <div className={styles.container}>
          <div className={styles.container_item}>
            <p>Position: </p>

            <div className={styles.container_item_position}>
              {randomPlayer.position.map((position) => {
                return <span key={`${name}${position}`}>{position}</span>;
              })}
            </div>
          </div>

          {height && <p className={styles.container_item}>Height: {height}</p>}
          {randomPlayer.extraData && (
            <p className={styles.container_item}>
              Extra Data {randomPlayer.extraData}
            </p>
          )}
          <p className={styles.container_item}>Overall: {overall}</p>

          {reveal ? (
            <div>
              <p className={styles.container_item}>Name: {name}</p>
              {randomPlayer.image ? (
                <Image
                  className={styles.image}
                  src={randomPlayer.image}
                  alt="player image"
                  height={150}
                  width={110}
                />
              ) : (
                <Image
                  className={styles.image}
                  alt="Placeholder Player Image"
                  src="/noPlayerImage.png"
                  height={200}
                  width={200}
                />
              )}
            </div>
          ) : (
            <div>
              <button
                className={styles.button}
                onClick={() => {
                  setReveal(true);
                }}
              >
                Reveal Player
              </button>
            </div>
          )}

          <button
            className={styles.button}
            onClick={() => {
              setRandomPlayer(getRandomItem(players));
              setReveal(false);
            }}
          >
            Reroll
          </button>

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
      </div>
    </main>
  );
}
