import "dotenv/config";
import {
  InstallGlobalCommands,
  InstallGuildCommands,
  getSeasonList,
} from "./utils.js";

async function createSeasonChoices() {
  // Retrieves updated list of NBA seasons
  const seasonList = await getSeasonList();

  // Formats list into discord choice objects
  let formattedList = seasonList.map((item) => {
    return { name: item.toString(), value: item.toString() };
  });

  return formattedList;
}

async function installCommands() {
  const seasonChoices = await createSeasonChoices();

  const SEARCH_COMMAND = {
    name: "nba",
    description: "Get a NBA player's stats",
    type: 1,
    options: [
      {
        name: "firstname",
        description: "Player's first name",
        type: 3,
        required: true,
      },
      {
        name: "lastname",
        description: "Player's last name",
        type: 3,
        required: true,
      },
      {
        name: "season",
        description: "Season to retrieve stats from",
        type: 3,
        required: false,
        choices: seasonChoices,
      },
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
}

installCommands();
