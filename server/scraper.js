const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const playerInfo = require("./variable");
const playerData = require("./data.json");
const playerImage = require("./image.json");

const allNBATeams = [
  // "atlanta hawks",
  // "boston celtics",
  // "brooklyn nets",
  // "charlotte hornets",
  // "chicago bulls",
  // "cleveland cavaliers",
  // "dallas mavericks",
  // "denver nuggets",
  // "detroit pistons",
  // "golden state warriors",
  // "houston rockets",
  // "indiana pacers",
  // "los angeles clippers",
  // "los angeles lakers",
  // "memphis grizzlies",
  // "miami heat",
  // "milwaukee bucks",
  // "minnesota timberwolves",
  // "new orleans pelicans",
  // "new york knicks",
  // "oklahoma city thunder",
  // "orlando magic",
  // "philadelphia 76ers",
  "phoenix suns",
  "portland trail blazers",
  "sacramento kings",
  "san antonio spurs",
  "toronto raptors",
  "utah jazz",
  "washington wizards",
];

const scraper = async () => {
  const scraperData = {};
  try {
    for (let i = 0; i < allNBATeams.length; i += 1) {
      console.log(`currently scraping ${allNBATeams[i]}`);
      const data = await getTeamData(allNBATeams[i]);
      scraperData[allNBATeams[i]] = data || [];
    }

    fs.writeFile(
      path.join(__dirname, "data.json"),
      JSON.stringify(scraperData),
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
  } catch (e) {
    console.log(`error at scraper: ${allNBATeams[i]}`, e);
  }
};

// function that accepts a team name and scrapes all info
// returns an array of every player's overall

const teamLinks = [
  // "https://www.basketball-reference.com/teams/ATL/2023.html",
  // "https://www.basketball-reference.com/teams/BOS/2023.html",
  // "https://www.basketball-reference.com/teams/BRK/2023.html",
  // "https://www.basketball-reference.com/teams/CHA/2023.html",
  // "https://www.basketball-reference.com/teams/CHI/2023.html",
  // "https://www.basketball-reference.com/teams/CLE/2023.html",
  // "https://www.basketball-reference.com/teams/DAL/2023.html",
  // "https://www.basketball-reference.com/teams/DEN/2023.html",
  // "https://www.basketball-reference.com/teams/DET/2023.html",
  // "https://www.basketball-reference.com/teams/GSW/2023.html",
  // "https://www.basketball-reference.com/teams/HOU/2023.html",
  // "https://www.basketball-reference.com/teams/IND/2023.html",
  // "https://www.basketball-reference.com/teams/LAC/2023.html",
  // "https://www.basketball-reference.com/teams/LAL/2023.html",
  // "https://www.basketball-reference.com/teams/MEM/2023.html",
  // "https://www.basketball-reference.com/teams/MIA/2023.html",
  // "https://www.basketball-reference.com/teams/MIL/2023.html",
  // "https://www.basketball-reference.com/teams/MIN/2023.html",
  // "https://www.basketball-reference.com/teams/NOP/2023.html",
  // "https://www.basketball-reference.com/teams/NYK/2023.html",
  // "https://www.basketball-reference.com/teams/OKC/2023.html",
  // "https://www.basketball-reference.com/teams/ORL/2023.html",
  "https://www.basketball-reference.com/teams/PHI/2023.html",
  "https://www.basketball-reference.com/teams/PHO/2023.html",
  "https://www.basketball-reference.com/teams/POR/2023.html",
  "https://www.basketball-reference.com/teams/SAC/2023.html",
  "https://www.basketball-reference.com/teams/SAS/2023.html",
  "https://www.basketball-reference.com/teams/TOR/2023.html",
  "https://www.basketball-reference.com/teams/UTA/2023.html",
  "https://www.basketball-reference.com/teams/WAS/2023.html",
];

const scrapeTeamPics = async () => {
  let scraperData = {};
  try {
    for (let i = 0; i < teamLinks.length; i += 1) {
      console.log(teamLinks);
      console.log(`currently scraping ${teamLinks[i]}`);
      const data = await getTeamPics(teamLinks[i]);
      scraperData = { ...scraperData, ...data };
    }
    scraperData = { ...scraperData, ...playerInfo };
    fs.writeFile(
      path.join(__dirname, "image.json"),
      JSON.stringify(scraperData),
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
  } catch (e) {
    console.log(`error at scraper`, e);
  }
};

async function getTeamPics(teamName) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const link = teamName;

    await page.goto(link, { waitUntil: "domcontentloaded" });

    const bbreference = await page.evaluate(() => {
      const tableRows = Array.from(
        document.querySelector("#roster").querySelector("tbody").children
      );

      console.log(tableRows, "anthony tablerows");
      const data = {};

      tableRows.forEach((row) => {
        const player = {};
        const name = row.querySelector(".left a").textContent;
        console.log(name, "anthony name");
        const hrefValue = row.querySelector(".left a").getAttribute("href");
        const start = hrefValue.lastIndexOf("/") + 1;
        const end = hrefValue.lastIndexOf(".");
        const extractedValue = hrefValue.substring(start, end);
        // player[
        //   `${name}`
        // ] = `https://www.basketball-reference.com/req/202106291/images/headshots/${extractedValue}.jpg`;
        data[
          `${name}`
        ] = `https://www.basketball-reference.com/req/202106291/images/headshots/${extractedValue}.jpg`;
      });

      return data;
    });

    await browser.close();

    return bbreference;

    console.log(bbreference, "anthony bbereference");
  } catch (e) {
    console.log("error at scraping team data", e);
  }
}

// scrapeTeamPics();

function formatter() {
  const newData = { ...playerData };

  for (let team in newData) {
    console.log(team, "anthony team");
    newData[team].forEach((player) => {
      if (playerImage[player.name]) {
        player.image = playerImage[player.name];
      }
    });
  }

  fs.writeFile(
    path.join(__dirname, "data2.json"),
    JSON.stringify(newData),
    (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );
}

formatter();

async function getTeamData(teamName) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const formattedTeamname = teamName.replace(/ /gi, "-");
    const link = `https://www.2kratings.com/teams/${formattedTeamname}`;

    console.log("the link is", link);
    const ua =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";
    await page.setUserAgent(ua);

    await page.goto(link, { waitUntil: "domcontentloaded" });

    const test = await page.evaluate(() => {
      const tableRows = Array.from(
        document.querySelector(".content").children[1].querySelector("tbody")
          .children
      );

      const players = [];
      const roles = ["PG", "SG", "SF", "PF", "C"];
      tableRows.forEach((row) => {
        if (row.children.length >= 5) {
          const playerData = {};
          playerData.name =
            row.children[1].querySelector(".entry-font").textContent;
          // playerData.test = row.children[1];
          let entries = row.children[1];

          //  row.children[1].children[0].children[4] if no all-star-badgelist
          //  row.children[1].children[0].children[5] with all-star-badgelist

          // let details = entries.querySelector(".all-star-badge-list")
          //   ? row.children[1].children[0].children[5]
          //   : row.children[1].children[0].children[4];

          let details = entries.querySelector(
            ".entry-subtext-font.crop-subtext-font"
          );

          // if (!entries.querySelector(".all-star-badge-list")) {
          //   details = row.children[1].children[0].children[4];
          // } else {
          //   details = row.children[1].children[0].children[5];
          // }

          if (details.children.length === 4) {
            console.log(details, "anthony details");
            playerData.position = [
              details.children[0].textContent,
              details.children[2].textContent,
            ];
            playerData.height = details.children[3].textContent;
          } else if (details.children.length === 1) {
            playerData.position = [details.children[0].textContent];
            playerData.extraData = details.textContent;
          } else {
            playerData.position = [details.children[0].textContent];
            playerData.height = details.children[1].textContent;
          }

          // if (row.children[1].children[0].children[4].children.length >= 4) {
          //   playerData.height =
          //     row.children[1].children[0].children[4].children[3].textContent;
          // } else {
          //   playerData.height =
          //     row.children[1].children[0].children[4].children[1].textContent;
          // }

          playerData.overall =
            row.children[2].querySelector("span").textContent;
          console.log(playerData, "anthony playerdata");
          players.push(playerData);
        }
      });

      return players;
    });

    console.log(teamName, test, "players");
    // const teamData = await page.evaluate(() => {
    //   return Array.from(
    //     document.querySelector(".content").children[1].querySelector("tbody")
    //       .children
    //   ).reduce((acc, curr) => {
    //     if (curr.children.length >= 5) {
    //       const playerCard = {};
    //       playerCard.name =
    //         curr.children[1].querySelector(".entry-font").textContent;
    //       playerCard.overall =
    //         curr.children[2].querySelector("span").textContent;
    //       playerCard.image = curr.children[1]
    //         .querySelector("img")
    //         .getAttribute("data-src");
    //       acc.push(playerCard);
    //     }
    //     return acc;
    //   }, []);
    // // });
    // await browser.close();
    // return teamData;
    return test;
  } catch (e) {
    console.log("error at scraping team data", e);
  }
}

// get all stats of a player
async function getAllStats(playerName) {
  try {
    const formattedPlayerName = playerName.replace(/ /gi, "-");
    const link = `https://www.2kratings.com/${formattedPlayerName}`;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(link);

    const playerData = await page.evaluate(() => {
      const playerObj = {};
      // information cards for all attributes
      const attributesData = document
        .querySelector("#nav-attributes")
        .children[0].querySelectorAll(".card");

      for (let i = 0; i < attributesData.length; i += 1) {
        // grab h5 tag and span for first child
        const statNumber =
          attributesData[i].children[0].querySelector("h5").firstChild
            .textContent;
        const attribute =
          attributesData[i].children[0].querySelector("h5").lastChild
            .textContent;
        playerObj[attribute] = statNumber;
        //
      }
      console.log(playerObj);
    });
    // await browser.close();
  } catch (e) {
    console.log("error at get all stats", e);
  }
}

// scraper();
// getAllStats('Lebron James');

module.exports = scraper;
