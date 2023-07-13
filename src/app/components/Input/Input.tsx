import { useState } from "react";

const Input = ({ players }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Run your code here when Enter key is pressed
      console.log("Enter key pressed!");
    }
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <div>
        {inputValue.length > 1 &&
          filteredPlayers.map((player) => (
            <p key={player.name}>{player.name}</p>
          ))}
      </div>
    </div>
  );
};

export default Input;
