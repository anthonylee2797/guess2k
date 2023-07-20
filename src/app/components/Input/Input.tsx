import { useEffect, useState } from "react";

const Input = ({ randomPlayer, players, onSelect }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [randomPlayer]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelect = (playerName) => {
    if (randomPlayer.name === playerName) {
      setInputValue(playerName);
    }

    onSelect(playerName);
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <input
        list="players"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <ul>
        {inputValue.length > 1 &&
          filteredPlayers.map((player, index) => (
            <li class key={player.name} onClick={() => handleSelect(player.name)}>
              {player.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Input;
