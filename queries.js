import "dotenv/config";
import fetch from "node-fetch";

// Queries for a player by name
export async function queryPlayer(name) {
  // API url and options
  const url = `https://api-nba-v1.p.rapidapi.com/players?search=${name}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response;
    console.log(result.id);
  } catch (error) {
    console.log(error);
  }
}
