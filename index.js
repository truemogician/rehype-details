const visit = require('unist-util-visit');
const unified = require('unified');
const parse = require('rehype-parse');
const toHTML = require('hast-util-to-html');

const parseHtml = unified().use(parse, { fragment: true, position: false });

function rehypeDetails(options) {
  const opts = options || {};

  return transformDetails;

  function transformDetails(tree, file) {
    visit(tree, 'element', visitor);

    function visitor(node, index, parent) {
      const className = node.properties.className || [];
      if (node.tagName !== 'div' || !className.includes('details')) {
        return;
      }
      // console.log(node)

      let header = node.properties.header || '';
      let icon = 'note';
      let display = 0;
      let value = node.properties.summary || '<p>Details</p>';

      if (header.length > 0) header = header.replace('\n', '');

      // const arr = header.split(value)
      if (header.indexOf('!!!') > -1 || header.substr(0, 4).indexOf('+') > -1)
        display = 1;

      //   // const title = arr[1]
      if (value.indexOf('warning') > -1) icon = 'warning';
      //   // value = value.replace(icon, '').trim()
      //   // console.log(`${title}, ${header}, ${value}, ${display}`)
      //   // value = value.replace(/"+$/, "").replace(/^"+/, "").trim();
      // }

      const ch = node.children;
      // console.log(header)
      // console.log(toHTML(node))
      let classes = `details-${icon}` + (display ? ` details-open` : ``);
      // console.log(classes)
      let starter = `<details class="${classes}">`;
      if (value && value.length > 0) {
        value = value.trim();
        starter += `<summary class="summary-note">${value}</summary>`;
      }
      let result = '';
      let ending = `</details>`;
      for (let cur of ch) result += toHTML(cur);
      //       node.children

      // {/* <summary>Details</summary> */}

      // console.log((ch.length))
      // console.log((starter + result + ending))
      // node.children = parseHtml.parse(result).children
      node.children = parseHtml.parse(starter + result + ending).children;
    }
  }
}

module.exports = rehypeDetails;
