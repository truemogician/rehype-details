const test = require('ava');

const vfile = require('to-vfile');
const report = require('vfile-reporter');
const unified = require('unified');
const details = require('remark-details');
const markdown = require('remark-parse');
const magic = require('../index.js');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');

test('main', (t) => {
  unified()
    .use(markdown)
    .use(details)
    .use(remark2rehype)
    .use(magic)
    .use(html)
    .process(vfile.readSync('tests/example.md'), function (err, file) {
      console.error(report(err || file));
      console.log(String(file));
    });
  t.pass();
});

// to-vfile vfile-reporter unified remark-parse remark-rehype
// rehype-stringify
