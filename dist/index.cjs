"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _hastscript = _interopRequireDefault(require("hastscript"));

var _unistUtilVisit = require("unist-util-visit");

const rehypeDetails = function () {
  return tree => {
    (0, _unistUtilVisit.visit)(tree, ['detailsContainer', 'detailsContainerSummary'], node => {
      var data = node.data || (node.data = {});
      var hast = (0, _hastscript.default)(node.name, node.attributes);
      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    });
  };
};

var _default = rehypeDetails;
exports.default = _default;