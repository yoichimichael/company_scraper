function convertCompanyData(element) {
  const location = element.nextSibling.children[0].children[0].data;
  const [city, state] = location.split(',').map(s => s.trim());
  return ({
    name: element.children[1].children[0].data,
    url: element.children[2].children[0].attribs.href,
    description: element.nextSibling.children[1].children[0].data,
    city,
    state,
  })
}

module.exports = { convertCompanyData };