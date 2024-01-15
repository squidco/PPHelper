import "dotenv/config";
import fetch from "node-fetch";
import { verifyKey } from "discord-interactions";

export function VerifyDiscordRequest(clientKey) {
  return function (req, res, buf, encoding) {
    const signature = req.get("X-Signature-Ed25519");
    const timestamp = req.get("X-Signature-Timestamp");

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send("Bad request signature");
      throw new Error("Bad request signature");
    }
  };
}

export async function InstallGlobalCommands(commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${process.env.APP_ID}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    const res = await DiscordRequest(endpoint, {
      method: "PUT",
      body: commands,
    });
    console.log(res);
    console.log("==== GLOBAL COMMANDS SUCCESSFULLY REGISTERED ====");
  } catch (err) {
    console.error(err);
  }
}

export async function InstallGuildCommands(commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${process.env.APP_ID}/guilds/${process.env.GUILD_ID}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    const res = await DiscordRequest(endpoint, {
      method: "PUT",
      body: commands,
    });
    console.log(res);
    console.log("==== GUILD COMMANDS SUCCESSFULLY REGISTERED ====");
  } catch (err) {
    console.error(err);
  }
}

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = "https://discord.com/api/v10/" + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use node-fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json; charset=UTF-8",
      "User-Agent":
        "DiscordBot (https://github.com/SquidDOTjpeg/PPHelper, 1.0.0)",
    },
    ...options,
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export function averageStats(statArray) {
  // Get number of games played this season to use when averaging data
  const gamesPlayed = statArray.length;
  // Create list of important stats
  let averages = {
    points: 0,
    min: 0,
    fga: 0,
    fgm: 0,
    ftm: 0,
    fta: 0,
    tpm: 0,
    tpa: 0,
    offReb: 0,
    defReb: 0,
    totReb: 0,
    assists: 0,
    steals: 0,
    turnovers: 0,
    blocks: 0,
  };

  // Add up all stats
  for (const game of statArray) {
    // Checks if they actually played in the game
    if (game.min !== null) {
      averages.points += parseInt(game.points);
      averages.min += parseInt(game.min);
      averages.fga += parseInt(game.fga);
      averages.fgm += parseInt(game.fgm);
      averages.ftm += parseInt(game.ftm);
      averages.fta += parseInt(game.fta);
      averages.tpm += parseInt(game.tpm);
      averages.tpa += parseInt(game.tpa);
      averages.offReb += parseInt(game.offReb);
      averages.defReb += parseInt(game.defReb);
      averages.totReb += parseInt(game.totReb);
      averages.assists += parseInt(game.assists);
      averages.steals += parseInt(game.steals);
      averages.turnovers += parseInt(game.turnovers);
      averages.blocks += parseInt(game.blocks);
    }
  }

  // Divide all stats by number of gamesPlayed
  for (const stat in averages) {
    averages[stat] = Math.round((averages[stat] / gamesPlayed) * 100) / 100;
  }
  console.log(averages);
  return averages;
}
