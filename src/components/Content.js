import React from 'react';
  
export default class Content extends React.Component {

// renderList(modules) {
//     const list = [];
//     for (const k in modules){
//         let val = modules[k];
//         let title = val.title;
//         list.push(<ListItem key={title} primaryText={title} /> );
        
//     }

//     return list;
// }

//need method to update module state

render() {
    let content = this.props.content[0];
    //console.log('content',content);
    return (
        <div>
            <h2>{content.title}</h2>
            <h4>{content.subtitle}</h4>
            <div>{content.videoRef}</div>
            <div>{content.description}</div>
        </div>
    )
    }
    
}