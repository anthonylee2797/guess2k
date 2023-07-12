/* eslint-disable */
// @ts-nocheck

export function getRandomPlayers(teamsObject, x, minOverall) {
  // Flatten the players into one array
  const allPlayers = [].concat(...Object.values(teamsObject));

  // Filter players by minimum overall
  const eligiblePlayers = allPlayers.filter(
    (player) => Number(player.overall) >= minOverall
  );

  // Array to store the randomly selected players
  const randomPlayers = [];

  // Loop to select x players
  for (let i = 0; i < x; i++) {
    // If there are no players left to choose from, break the loop
    if (eligiblePlayers.length === 0) {
      break;
    }

    // Random index between 0 and the number of players left - 1
    const randomIndex = Math.floor(Math.random() * eligiblePlayers.length);

    // Remove the player at the random index from eligiblePlayers and add to randomPlayers
    const [player] = eligiblePlayers.splice(randomIndex, 1);
    randomPlayers.push(player);
  }

  return randomPlayers;
}

export function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
