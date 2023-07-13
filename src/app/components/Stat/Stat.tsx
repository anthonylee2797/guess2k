"use client";
import styles from "./stat.module.css";

export default function Stat({ atr, data }) {
  return (
    <div className={styles.container_item}>
      <p>
        {atr}: {data}
      </p>
    </div>
  );
}
