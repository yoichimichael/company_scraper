const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = 'https://blog.wealthfront.com/career-launching-companies-list/#companies-list'

puppeteer
  .launch()
  .then(browser => {
    return browser.newPage();
  })
  .then(page => {
    return page.goto(url).then(() => {
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html);
    const companies = [];
    $('.company_name').each((i, element) => {
      companies.push($(element).text());
    });
    console.log(companies);
  })
  .catch(console.log);