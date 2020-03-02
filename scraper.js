const cheerio = require("cheerio");
const axios = require("axios");

const siteUrl = "https://www.allinonehighschool.com/spanish-1-2018/";

const courseTitle = new Set();
const content = new Set();
const dayTitle = new Set();

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

const getResults = async () => {
  const $ = await fetchData();

  // siteName = $('.top > .action-post-job').text();
  siteName = "EP Scraper";

  // $(".tags .tag").each((index, element) => {
  //   tags.add($(element).text());
  // });
  // $(".location").each((index, element) => {
  //   locations.add($(element).text());
  // });
  // $("div.nav p").each((index, element) => {
  //   categories.add($(element).text());
  // });
  // $('.company_and_position [itemprop="title"]').each((index, element) => {
  //   positions.add($(element).text());
  // });

  var dayNo = "4";

  // This is the version with changed html

  // $("div.entry-content").each(function (index, element) {

  //   dayTitle.add($(element).children("#day1").children("strong").text());
  //   calculus.add($(element).children("#day" + dayNo).children("ol").text()); 
  //   });

  //This is the version with unchanged html
  $("header.entry-header").each(function(index, element) {
    courseTitle.add($(element).children("h1").text());
  });

  $("div.entry-content").each(function (index, element) {
    dayTitle.add($(element).children("p").children("#day" + dayNo).text());
    content.add($(element).children("p").children("#day" + dayNo).parent().next("ol").text());
  });

  return {
    courseTitle: [...courseTitle].sort(),
    dayTitle: [...dayTitle].sort(),
    content: [...content].sort(),
    // siteName,
  };
};

module.exports = getResults;
