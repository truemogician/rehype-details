import { h as hastScript } from 'hastscript';
import { Plugin, Transformer } from 'unified';
import { Root, Node } from 'hast';
import { visit } from 'unist-util-visit';

interface DetailsNode extends Node {
	name: string;
	attributes: {
		open: boolean,
		class?: string
	}
}

const rehypeDetails: Plugin<[], Root, Root> = function (): Transformer<Root> {
	return (tree) => {
		visit(tree, ['detailsContainer', 'detailsContainerSummary'], (node: DetailsNode) => {
			var data = node.data || (node.data = {});
			var hast = hastScript(node.name, node.attributes);
			data.hName = hast.tagName;
			data.hProperties = hast.properties;
		});
	};
}
export default rehypeDetails;