import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

export default function rehypeDetails() {
  return (tree) => {
    visit(tree, ['detailsContainer', 'detailsContainerSummary'], (node) => {
      var data = node.data || (node.data = {});
      var hast = h(node.name, node.attributes);
      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    });
  };
}
