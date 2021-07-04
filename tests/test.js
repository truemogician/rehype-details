var vfile = require('to-vfile');
var report = require('vfile-reporter');
var unified = require('unified');
var details = require('/home/ir1d/Documents/repo/remark-details/index.js');
var markdown = require('remark-parse');
var magic = require('./index.js');
var remark2rehype = require('remark-rehype');
var html = require('rehype-stringify');

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

// to-vfile vfile-reporter unified remark-parse remark-rehype
// rehype-stringify

