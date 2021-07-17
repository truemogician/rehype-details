"use strict";

exports.__esModule = true;
exports.default = rehypeDetails;

var _hastscript = require("hastscript");

var _unistUtilVisit = require("unist-util-visit");

function rehypeDetails(options) {
  return transform;

  function transform(tree) {
    (0, _unistUtilVisit.visit)(tree, ['detailsContainer', 'detailsContainerSummary'], ondetails);
  }

  function ondetails(node) {
    var data = node.data || (node.data = {});
    var hast = (0, _hastscript.h)(node.name, node.attributes);
    data.hName = hast.tagName;
    data.hProperties = hast.properties;
  }
}