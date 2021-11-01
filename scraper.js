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
    // console.log($('.pure-u-1.pure-u-md-18-24')[0].nextSibling.children[1].children[0].data);
    $('.pure-u-1.pure-u-md-18-24').each((i, element) => {
      const companyData = {
        name: element.children[1].children[0].data,
        url: element.children[2].children[0].attribs.href,
        location: element.nextSibling.children[0].children[0].data,
        description: element.nextSibling.children[1].children[0].data,
      }
      companies.push(companyData);
    });
    console.log(companies);
  })
  .catch(console.log);