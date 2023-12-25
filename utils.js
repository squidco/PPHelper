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
    console.log("==== COMMANDS SUCCESSFULLY REGISTERED ====");
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
    console.log("==== COMMANDS SUCCESSFULLY REGISTERED ====");
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

}