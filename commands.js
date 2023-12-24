import "dotenv/config";
import { InstallGlobalCommands, InstallGuildCommands } from "./utils.js";

const SEARCH_COMMAND = {
  name: "nba",
  description: "Get a NBA player's stats",
  type: 1,
  options: [
    {
      name: "firstname",
      description: "Player's first name",
      type: 3,
      required: true
    },
    {
      name: "lastname",
      description: "Player's last name",
      type: 3,
      required: true
    },
  ]
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
