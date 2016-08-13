import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

import BlocklyToolboxBlock from './BlocklyToolboxBlock';

var BlocklyToolboxCategory = React.createClass({
  mixins: [ImmutableRenderMixin],

  propTypes: {
    name: React.PropTypes.string,
	color: React.PropTypes.string,
    custom: React.PropTypes.string,
    categories: ImmutablePropTypes.list,
    blocks: ImmutablePropTypes.list
  },

  statics: {
    renderCategory: function(category, key) {
      if (category.get('type') === 'sep') {
        return <sep key={key}></sep>;
      } else if (category.get('type') === 'search') {
        return <search key={key}/>;
      } else {
        return <BlocklyToolboxCategory
          name={category.get('name')}
          custom={category.get('custom')}
          key={key}
          blocks={category.get('blocks')}
          categories={category.get('categories')} />;
      }
    }
  },

	componentDidMount: function() {
	    var dom = ReactDOM.findDOMNode(this.refs.category);
		if (this.props.custom)
			dom.setAttribute('custom', this.props.custom);
		if (this.props.color)
			dom.setAttribute("colour", this.props.color);
	},

  render: function() {
    var subcategories = (this.props.categories || []).map(BlocklyToolboxCategory.renderCategory);
    var blocks = (this.props.blocks || []).map(BlocklyToolboxBlock.renderBlock);

    return (
      <category name={this.props.name} ref="category">
        {blocks}
        {subcategories}
      </category>
    );
  }
});

export default BlocklyToolboxCategory;