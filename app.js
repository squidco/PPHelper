import express from "express";
import fetch from "node-fetch";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import { VerifyDiscordRequest } from "./utils.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Verify discord request with middleware
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Interaction routes
app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  // Handle verification requests
  // Discord requires this route to be able to verify that it can handle interactions

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  // Handle slash command requests
  // See https://discord.com/developers/docs/interactions/application-commands#slash-commands

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "nba" command
    if (name === "nba") {
      console.log(req.body);
      // Should be the first name
      console.log(data.options[0].value);
      // Should be the last name
      console.log(data.options[1].value);
      // API url and options
      // const url = "https://api-nba-v1.p.rapidapi.com/players?search=james";
      // const options = {
      //   method: "GET",
      //   headers: {
      //     "X-RapidAPI-Key": process.env.API_KEY,
      //     "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      //   },
      // };
      // Attempt to fetch data from API-NBA
      // try {
      //   const response = await fetch(url, options);
      //   const result = await response;
      //   console.log(result.id);
      //   // Send a message into the channel where command was triggered from
      //   return res.send({
      //     type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      //     data: {
      //       // Returns API response
      //       content: result.id,
      //     },
      //   });
      // } catch (error) {
      //   console.error(error);
      // }
    }
  }
});

// Start app
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
