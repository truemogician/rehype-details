import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

export default function rehypeDetails(options) {
  return transform;

  function transform(tree) {
    visit(tree, ['detailsContainer', 'detailsContainerSummary'], ondetails);
  }

  function ondetails(node) {
    var data = node.data || (node.data = {});
    var hast = h(node.name, node.attributes);

    data.hName = hast.tagName;
    data.hProperties = hast.properties;
  }
}
