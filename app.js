import express from "express";
import { VerifyDiscordRequest } from "./utils.js";

const app = express();

const PORT = process.env.PORT || 3000;
// Verify discord request
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" command
    if (name === "search") {
        console.log("You are hitting this endpoint")
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: "You hit the search endpoint. Congrats.",
        },
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
