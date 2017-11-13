import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
  
export default class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        this.loadContent = this.loadContent.bind(this);
    }

loadContent(e) {
    e.preventDefault();
    console.log(e);
    // this.setState({
    //     [e.target.name]: e.target.value
    // });
    }

renderList(modules) {
    const list = [];
    for (const k in modules){
        let val = modules[k];
        let title = val.title;
        list.push(<ListItem key={title} primaryText={title} onClick={this.loadContent}/> );
    }

    return list;
}

//need method to update module state

render() {
    let modules = this.props.modules;
    return (
        <div>
            { this.renderList(modules) }
        </div>
    )
    }
    
}