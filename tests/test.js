const test = require('ava');

const markdown = require('remark-parse');
const vfile = require('to-vfile');
const report = require('vfile-reporter');
const unified = require('unified');
const directive = require('remark-directive');
const details = require('remark-details');
const magic = require('../index.js');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');
const fs = require('fs');
const visit = require('unist-util-visit');
const h = require('hastscript');

test('main', (t) => {
  unified()
    .use(markdown)
    .use(directive)
    .use(htmlDirectives)
    //.use(details)
    .use(remark2rehype)
    .use(magic)
    .use(html)
    .process(fs.readFileSync('tests/a.md'), function (err, file) {
      console.error(report(err || file));
      console.log(String(file));
      fs.writeFileSync('tmp', String(file));
    });
  t.pass();
});

function htmlDirectives() {
  return transform;

  function transform(tree) {
    visit(
      tree,
      ['textDirective', 'leafDirective', 'containerDirective'],
      ondirective,
    );
  }

  function ondirective(node) {
    var data = node.data || (node.data = {});
    var hast = h(node.name, node.attributes);

    data.hName = hast.tagName;
    data.hProperties = hast.properties;
  }
}
