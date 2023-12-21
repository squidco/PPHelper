import "dotenv/config";
import { InstallGlobalCommands, InstallGuildCommands } from "./utils.js";

const SEARCH_COMMAND = {
  name: "nba",
  description: "Get a NBA player's stats",
  type: 1,
  options: [
    {
      name: "player",
      description: "The name of the player",
      type: 3,
      required: true
    },
    {
        name: "stat",
        description: "Specify which stat you want",
        type: 3,
        required: false,
        choices: [
            {
                name: "Stat",
                value: "stat"
            }
        ]
    }
  ],
};

const ALL_COMMANDS = [SEARCH_COMMAND];

if (process.env.ENVIRONMENT === "development") {
  console.log("\n==== REGISTERING GUILD COMMANDS ====\n");
  // Guild commands install instantly according to the docs
  InstallGuildCommands(ALL_COMMANDS);
} else {
  console.log("\n==== REGISTERING GLOBAL COMMANDS ====\n");
  // These take time to install
  InstallGlobalCommands(ALL_COMMANDS);
}
