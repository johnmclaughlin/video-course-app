import React from 'react';
import {List, ListItem} from 'material-ui/List';
  
export default class ModuleList extends React.Component {

handleModChange = (val) => {
    this.props.onSelectModule(val);            
}

renderList(modules) {
    const list = [];
    for (const k in modules){
        let val = modules[k];
        let title = val.title;
        list.push(<ListItem key={k} primaryText={title} onClick={() => this.handleModChange({val})}/> );
    }
    return list;
}

render() {
    let modules = this.props.modules;
    return (
        <div>
            { this.renderList(modules) }
        </div>
    )
    }
}