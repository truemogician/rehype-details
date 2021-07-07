const visit = require('unist-util-visit');
const unified = require('unified');
const parse = require('rehype-parse');
const toHTML = require('hast-util-to-html');

const parseHtml = unified().use(parse, { fragment: true, position: false });

function rehypeDetails(options) {
  const opts = options || {};

  return transformDetails;

  function transformDetails(tree) {
    visit(tree, 'element', visitor);

    function visitor(node, index, parent) {
      // only process <div class="details" ... />
      const className = node.properties.className || [];
      if (node.tagName !== 'div' || !className.includes('details')) {
        return;
      }

      let header = node.properties.header || '';
      if (header.length > 0) header = header.replace('\n', '');
      // if has !!! or has '+' then set details to be expanded by default
      let display = 0;
      if (header.indexOf('!!!') > -1 || header.substr(0, 4).indexOf('+') > -1) {
        display = 1;
      }

      let icon = 'note';
      let value = node.properties.summary || '<p>Details</p>';
      if (value.indexOf('warning') > -1) icon = 'warning';

      let classes = `details-${icon}` + (display ? ` details-open` : ``);
      let starter = `<details class="${classes}">`;
      if (value && value.length > 0) {
        value = value.trim();
        starter += `<summary class="summary-note">${value}</summary>`;
      }
      let result = '';
      const ch = node.children;
      for (let cur of ch) result += toHTML(cur);
      let ending = `</details>`;

      node.children = parseHtml.parse(starter + result + ending).children;
    }
  }
}

module.exports = rehypeDetails;
