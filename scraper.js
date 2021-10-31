const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://blog.wealthfront.com/career-launching-companies-list/#companies-list'

axios.get(url)
  .then(html => {
    const $ = cheerio.load(html);
    const listContainer = $('.the-list-container');
    console.log(listContainer.children());
  })
  .catch(console.log)