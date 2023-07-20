const Score = ({ rounds, text, emoji }) => {
  return (
    <>
      <p>{text}</p>
      {Array(rounds)
        .fill(emoji)
        .map((target, index) => (
          <span key={index}>{target}</span>
        ))}
    </>
  );
};

export default Score;
