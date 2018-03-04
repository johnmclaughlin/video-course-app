import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Subheader from 'material-ui/Subheader';
import ModuleList from './ModuleList';

export default class ProgramMenu extends React.Component {

  render() {
    
    return (
      <div>
        <List>
          {this.props.lessons.map((lesson, i) => {
            var mods = lesson.modules;
            if(lesson.week <= this.props.userWeek){
            return (
              <ListItem
                key={i}
                primaryText={lesson.title}
                // leftIcon={<ActionGrade />}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ModuleList modules={mods} key={i} onSelectModule={this.props.onSelectModule}/>
                ]}
              />
            )
            }
          })}
        </List>
      </div>
    );
  }
}