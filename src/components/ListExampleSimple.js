import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import ModuleList from './ModuleList';

export default class ListExampleNested extends React.Component {

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  renderModules = (modules) => {
    for (let module in modules) {
      console.log(module);
      return (
      <ListItem
          key={module.week}
          primaryText={module.title}
          leftIcon={<ActionGrade />}
          initiallyOpen={false}
      />
      )
    }
  };

  render() {
    return (
      <div>
        <Toggle
          toggled={this.state.open}
          onToggle={this.handleToggle}
          labelPosition="right"
          label="This toggle controls the expanded state of the submenu item."
        />
        <br />
        <div>
          <List>
            <Subheader>Program Modules</Subheader>
            {this.props.lessons.map((lesson) => {
              var modules = lesson.modules;
              
              return (
                <ListItem
                  key={lesson.week}
                  primaryText={lesson.title}
                  leftIcon={<ActionGrade />}
                  initiallyOpen={false}
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    {for (let module in modules) {
                      console.log(module);
                      return (
                      <ListItem
                          key={module.week}
                          primaryText={module.title}
                          leftIcon={<ActionGrade />}
                          initiallyOpen={false}
                      />
                      )
                    }}
                  ]}
                />
              )
            })}
          </List>
        </div>
      </div>
    );
  }
}