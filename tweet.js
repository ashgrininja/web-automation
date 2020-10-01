const puppeteer = require('puppeteer');
let cFile = process.argv[2];
let fs = require("fs");
let scrap = require("./scrap");

(async () => {
  try {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1280,
        height: 587
      }
    });
    let data = await fs.promises.readFile(cFile);
    let { loginUrl, homeUrl, user, pwd, tweet, message, userSearched } = JSON.parse(data);
    const page = await browser.newPage()
    const navigationPromise = page.waitForNavigation()

    //*********************************LOGIN PAGE

    await page.goto(loginUrl, { waitUntil: "networkidle2" });
    await page.waitForSelector('.css-1dbjc4n:nth-child(6) > .css-1dbjc4n > .css-1dbjc4n > .css-1dbjc4n > .css-901oao > .r-30o5oe')
    await page.type('.css-1dbjc4n:nth-child(6) > .css-1dbjc4n > .css-1dbjc4n > .css-1dbjc4n > .css-901oao > .r-30o5oe', user, { delay: 100 });
    await page.type('.css-1dbjc4n:nth-child(7) > .css-1dbjc4n > .css-1dbjc4n > .css-1dbjc4n > .css-901oao > .r-30o5oe', pwd, { delay: 100 })
    await page.click('.r-13qz1uu:nth-child(3) > .css-1dbjc4n > .css-1dbjc4n > .css-1dbjc4n > .css-901oao > .css-901oao > .css-901oao')
    await page.waitForNavigation();

    //*************************************** Login Ends


    //*******************************Tweet Starts    
    //await page.goto(homeUrl, { waitUntil: "networkidle2" });
    //await page.setViewport({ width: 1280, height: 587 })
    await page.waitFor(4000);

    await page.waitForSelector('.DraftEditor-editorContainer');
    await page.click('.DraftEditor-editorContainer');
    await page.type('.DraftEditor-editorContainer', tweet, { delay: 100 })
    await page.waitFor(2000);
    // await page.waitForSelector('.css-1dbjc4n > .css-18t94o4:nth-child(4) > .css-901oao > .css-901oao > .css-901oao')
    await page.click('.css-1dbjc4n > .css-18t94o4:nth-child(4) > .css-901oao > .css-901oao > .css-901oao')
    await page.waitFor(2000);
    await page.screenshot({ path: 'tweet.png' }, { delay: 80 });

    await page.waitFor(1000);
    console.log("\nTweet posted");
    console.log("`````````````````````````````````````````````````````````");
