const cheerio = require('cheerio');
const request = require('request');
const puppeteer = require('puppeteer');
let cFile = process.argv[2];
let fs = require("fs");

module.exports.Scrapper = function (twitterUsername) {
    const twitterUrl = 'https://twitter.com/' + twitterUsername;
    request(twitterUrl, function (error, response, html) {
        if (!error) {
            const $ = cheerio.load(html);
            const $wrapper = $('.ProfileHeaderCard');
            const $new = $('.ProfileNav');
            let name, username, bio, following, tweets, followers, likes;
            name = $wrapper.find('.ProfileHeaderCard-name a').first().text();
            username = $wrapper.find('.ProfileHeaderCard-screenname > a').first().text();
            bio = $wrapper.find('.ProfileHeaderCard-bio').first().text();
            tweets = $new.find('.ProfileNav-item--tweets .ProfileNav-value').first().text();
            following = $new.find('.ProfileNav-item--following .ProfileNav-value').first().text();
            followers = $new.find('.ProfileNav-item--followers .ProfileNav-value').first().text();
            likes = $new.find('.ProfileNav-item--favorites .ProfileNav-value').first().text();

            const userData = {
                Name: name,
                Username: username,
                Bio: bio,
                Tweets: tweets,
                Following: following,
                Followers: followers,
                Likes: likes
            };

            //fs.writeFile(userData, "data.json");
            //console.table(userData);
            fs.writeFile("./info.json", JSON.stringify(userData), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };


                console.log("File has been created");
                console.log("`````````````````````````````````````````````````````````");

            });

        }
    })
    //tscraper(process.argv[2]);
}