import express from "express";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import { queryPlayer } from "./queries.js";
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
      // console.log(req.body);
      // Should be the first name
      // console.log(data.options);
      const firstName = data.options[0].value;
      // Should be the last name
      // console.log(data.options[1].value);
      const lastName = data.options[1].value;
      // Attempt to fetch data from API-NBA
      try {
        const playerInfo = await queryPlayer(firstName, lastName);
        console.log("\n PLAYER INFO \n", playerInfo);
        // Send a message into the channel where command was triggered from
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            // Returns API response
            content: JSON.stringify(playerInfo.response[0].player),
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
});

// Start app
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
