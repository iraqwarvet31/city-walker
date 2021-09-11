const express = require("express");
const path = require("path");
const Promise = require("bluebird");
const puppeteer = require("puppeteer");

const PORT = 3000;

const app = express();
// const CLIENT_DIR = path.resolve(__dirname, "..", "client", "dist");

app.use(express.json());

const preparePageForTests = async (page) => {     
  // Pass the User-Agent Test
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);
};

const getPostData = async () => {
  // var counter = 1;
  // Exract all href urls
  const getLinks = async (...urls) => {
    const hrefList = [];

    for (let url of urls) {
      const page = await browser.newPage();
      await preparePageForTests(page);
  
      try {
        await page.goto(url)
      } catch (err) {
        console.log('Something went wrong error: ', err)
      }
  
      // Scrape the data we want
      const extractHrefList = await page.evaluate(() => {
        const links = [];
        let list = document.querySelectorAll('.result-image')
        list.forEach(element => links.push(element.href));
       
        return links;
      });

      hrefList.push(...extractHrefList);
    }
    
    return hrefList;
  };

  // const getSearchData = async (links) => {
    //   const data = [];

    //   links.forEach((item, i) => {
        
    //   })
    // }
    
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  });
  const sanLuisObispoUrl = `https://slo.craigslist.org/d/community/search/ccc?query=kitten&sort=rel/`;
  const sanDiegoUrl = `https://sandiego.craigslist.org/d/for-sale/search/sss?query=kitten&sort=rel`;
  const sanFranciscoUrl = `https://sfbay.craigslist.org/d/for-sale/search/sss?query=kitten&sort=rel`;
  const losAngelesUrl = `https://losangeles.craigslist.org/d/for-sale/search/sss?query=kitten&sort=rel`;
  const links = await getLinks(sanLuisObispoUrl, sanDiegoUrl, sanFranciscoUrl, losAngelesUrl);
  console.log(links)
  await browser.close();
  return links;
}

// Initiate extraction
getPostData();

// getSearchData(hrefUrls)
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});