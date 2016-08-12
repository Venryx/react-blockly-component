import React from 'react';
import ReactDOM from 'react-dom';

var debounce = function(wait, func) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			func.apply(context, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

/*propTypes: {
	initialXml: React.PropTypes.string,
	workspaceConfiguration: React.PropTypes.object,
	wrapperDivClassName: React.PropTypes.string,
	xmlDidChange: React.PropTypes.func,
	toolboxMode: React.PropTypes.oneOf(['CATEGORIES', 'BLOCKS'])
},*/

class BlocklyWorkspace extends BaseComponent {
	constructor(args) {
	    super(args);
		this.state = {
			workspace: null
		};
	}

	render() {
		// We have to fool Blockly into setting up a toolbox with categories initially;
		// otherwise it will refuse to do so after we inject the real categories into it.
		var dummyToolboxContent;
		if (this.props.toolboxMode === "CATEGORIES")
			dummyToolboxContent = <category name="Dummy toolbox"/>;

		return (
			<div className={this.props.wrapperDivClassName}>
				<xml style={{display: "none"}} ref="dummyToolbox">
					{dummyToolboxContent}
				</xml>
				<div ref="editorDiv" className={this.props.wrapperDivClassName} />
			</div>
		);
	}

	componentDidMount() {
		// TODO figure out how to use setState here without breaking the toolbox when switching tabs
		this.state.workspace = Blockly.inject(
			this.refs.editorDiv,
			{}.Extended(this.props.workspaceConfiguration).Extended({
				toolbox: ReactDOM.findDOMNode(this.refs.dummyToolbox)
			})
		);

	    /*if (this.props.parent.state.xml) {
	        this.importFromXML(this.props.parent.state.xml);
	        /*if (this.props.xmlDidChange)
	            this.props.xmlDidChange(this.state.xml);*#/
	    }*/

	    this.state.workspace.addChangeListener(debounce(200, ()=>{
			//var newXML = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.state.workspace));
			var newXML = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.state.workspace));
			if (newXML == this.displayedXML)
				return;

			this.displayedXML = newXML;
			var code = Blockly.CSharp.workspaceToCode(this.state.workspace);
			this.props.parent.SetXMLAndCSCode_FromBlocks(newXML, code);
		}));
	}

	importFromXML(xml) {
	    this.state.workspace.clear();
		Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.state.workspace);

	    this.displayedXML = xml;
		var code = Blockly.CSharp.workspaceToCode(this.state.workspace);
		this.props.parent.SetCSCode(code);
	}

	componentWillReceiveProps(newProps) {
	    if (newProps.xml != this.displayedXML)
	        this.importFromXML(newProps.xml);
	}
	shouldComponentUpdate() {
		return false;
	}

	resize() {
		Blockly.svgResize(this.state.workspace);
	}

	componentWillUnmount() {
		if (this.state.workspace)
			this.state.workspace.dispose();
	}
}

export default BlocklyWorkspace;