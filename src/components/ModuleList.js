import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
  
export default class ModuleList extends React.Component {

render() {
    return (
        <div>
            {this.props.modules.map((module) => {
                console.log('more mods:',module);
                return (
                <ListItem
                    key={module.week}
                    primaryText={module.title}
                    leftIcon={<ActionGrade />}
                    initiallyOpen={false}
                />
                )
            })}
        </div>
    );
    }
}