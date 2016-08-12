import React from 'react';
import { is } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import BlocklyToolboxCategory from './BlocklyToolboxCategory';
import BlocklyToolboxBlock from './BlocklyToolboxBlock';

// custom
import ReactDOM from 'react-dom';

class BlocklyToolbox extends BaseComponent {
	constructor(props) {
	    super(props);
	    this._bind("processCategory");
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !(is(nextProps.categories, this.props.categories) && is(nextProps.blocks, this.props.blocks));
	}

	renderCategories(categories) {
		return categories.map(function(category, i) {
			if (category.get('type') === 'sep')
				return <sep key={"sep_" + i}></sep>;
			if (category.get('type') === 'search')
				return <search key={"search_" + i}/>;
			return <BlocklyToolboxCategory
				name={category.get('name')}
				custom={category.get('custom')}
				key={"category_" + category.get('name') + "_" + i}
				blocks={category.get('blocks')}
				categories={category.get('categories')} />;
		}.bind(this));
	}
	processCategory(category) {
		var processedCategory = category;

		if (processedCategory.has('categories')) {
			processedCategory = category.update('categories', function(subcategories) {
			return subcategories.map(this.processCategory);
			}.bind(this));
		}

		if (this.props.processCategory)
			return this.props.processCategory(processedCategory);
		return processedCategory;
	}
	render() {
		return (
			<div>
				<xml ref="toolboxData" style={{display: "none"}}>
					{this.props.categories
						? this.renderCategories(this.props.categories.map(this.processCategory))
						: this.props.blocks.map(BlocklyToolboxBlock.renderBlock)}
				</xml>
				<div ref="toolboxUIHolder" id="toolboxUIHolder"/>
			</div>
		);
	}

	componentDidMount() {
		// custom
		$("body").children(".blocklyToolboxDiv").appendTo($(ReactDOM.findDOMNode(this.refs.toolboxUIHolder)));
		WaitXThenRun(0, ()=>window.requestAnimationFrame(()=>this.PostRender()));
	}
	componentDidUpdate(prevProps, prevState) {
	    WaitXThenRun(0, ()=>window.requestAnimationFrame(()=>this.PostRender()));
	}
	PostRender() {
	    var toolboxNode = ReactDOM.findDOMNode(this.refs.toolboxData);
	    if (toolboxNode && this.props.workspace) // && this.props.workspace.state.workspace)
			this.props.workspace.state.workspace.updateToolbox(toolboxNode);
	}
}
/*propTypes: {
	categories: ImmutablePropTypes.list,
	blocks: ImmutablePropTypes.list,
	processCategory: React.PropTypes.func
},*/

export default BlocklyToolbox;