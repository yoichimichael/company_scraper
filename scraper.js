const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://blog.wealthfront.com/career-launching-companies-list/#companies-list'

axios.get(url)
  .then(res => {
    console.log(res)
    const html = res.data;
    // console.log(html);
    const $ = cheerio.load(html);
    const companies = [];
    // $('.company_name').each((i, element) => {
    //   console.log(element);
    // });
    // console.log(companies);
  })
  .catch(console.log)