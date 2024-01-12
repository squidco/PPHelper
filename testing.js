import { queryPlayer } from "./queries.js";
import { getSeasonList } from "./utils.js";

// queryPlayer("lebron", "james")
// const year = new Date().getFullYear()
// console.log(Date())
async function testingSeasonList() {
  // Retrieves updated list of NBA seasons
  const seasonList = await getSeasonList();
  
  // Formats list into discord choice objects
  let formattedList = seasonList.map((item) => {
    return { name: item, value: item };
  });

  return formattedList;
}

testingSeasonList();
