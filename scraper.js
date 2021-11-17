const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
require('dotenv').config();

const db_pool = require('./database');
const csvWriter = createCsvWriter({
  path: './companies.csv',
  header: [
      { id: 'name', title: 'COMPANY' },
      { id: 'url', title: 'WEBSITE' },
      { id: 'location', title: 'LOCATION' },
      { id: 'description', title: 'ABOUT' },
  ]
});

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
      const sqlQuery = 'INSERT INTO companies(id, name, url, location, description) VALUES(DEFAULT, $1, $2, $3, $4)';
      const values = [companyData.name, this.price, this.description, this.imageUrl];
      // return db_pool.query(sqlQuery, values);
      companies.push(companyData);
    });
    return companies;
  })
  .then(companies => csvWriter.writeRecords(companies))
  .then(result => console.log("Finished Writing File"))
  .catch(console.log);