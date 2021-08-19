import { h as hastScript } from 'hastscript';
import { visit } from 'unist-util-visit';
const rehypeDetails = function () {
    return (tree) => {
        visit(tree, ['detailsContainer', 'detailsContainerSummary'], (node) => {
            var data = node.data || (node.data = {});
            var hast = hastScript(node.name, node.attributes);
            data.hName = hast.tagName;
            data.hProperties = hast.properties;
        });
    };
};
export default rehypeDetails;
