import "dotenv/config"
import {InstallGlobalCommands} from "./utils.js"

const SEARCH_COMMAND = {
    name: "search",
    description: "Search a NBA player by name",
    type: 1
}

const ALL_COMMANDS = [SEARCH_COMMAND]

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS)