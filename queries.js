import "dotenv/config";
import fetch from "node-fetch";
import { averageStats } from "./utils.js";

// Queries for a player by last name
async function getPlayerId(firstName, lastName) {
  const lowerFirst = firstName.toLowerCase();
  const lowerLast = lastName.toLowerCase();
  // API url and options
  const url = `https://api-nba-v1.p.rapidapi.com/players?search=${lowerLast}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("THIS IS THE RESULT", result);
    // Loop through results to see if the player exists
    for (const player of result.response) {
      if (lowerFirst === player.firstname.toLowerCase()) {
        return player.id;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// Queries for player stats by ID
async function getPlayerStats(playerId) {
  const currentYear = new Date().getFullYear();
  const url = `https://api-nba-v1.p.rapidapi.com/players/statistics?id=${playerId}&season=${currentYear}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function queryPlayer(firstName, lastName) {
  const playerId = await getPlayerId(firstName, lastName);
  const playerStats = await getPlayerStats(playerId);
  const averagedPlayerStats = averageStats(playerStats.response);
  console.log(averagedPlayerStats);
  return averagedPlayerStats;
}
