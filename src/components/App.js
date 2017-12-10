import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import SignInScreen from './FirebaseAuth';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles } from 'material-ui-next/styles';
import Button from 'material-ui-next/Button';
import IconButton from 'material-ui-next/IconButton';
import ProgramMenu from './ProgramMenu';
import Content from './Content';

import Header from './Header';


const muiTheme = getMuiTheme({
  palette: {
    // accent1Color: deepOrange500,
  },
});

const NoContent = {
  title: "Welcome Message", 
  subtitle: "For Unauthenticated Visitors", 
  ref: "This is the module reference", 
  description: "This is a good place to talk about the program and provide links back to the main webisite for more information", 
  videoRef: "none"
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: '',
      username: '',
      lessons: [],
      module: [],
      classes: {},
      user: null
    }
    this.handleModule = this.handleModule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.resetContent = this.resetContent.bind(this);
  }

  handleModule = (modValue) => {
    this.setState({module: modValue.val});
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
          username: '',
          lessons: [],
          module: []
        });
      });
  }
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user,
          username: user.username
        });
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    const lessonsRef = firebase.database().ref('lessons');
    const lesson = {
      title: this.state.currentItem,
      user: this.state.username
    }
    lessonsRef.push(lesson);
    this.setState({
      currentItem: '',
      username: ''
    });
  }

  resetContent() {
    console.log('resetContent', firebase);
    const lessonsRef = firebase.database().ref('lessons');
    lessonsRef.on('value', (snapshot) => {
      let lessons = snapshot.val();
      let newState = [];
      for (let lesson in lessons) {
        newState.push({
          id: lessons[lesson].id,
          title: lessons[lesson].title,
          week: lessons[lesson].week,
          modules: lessons[lesson].modules
        });
      }
      this.setState({
        lessons: newState,
        module: {
          title: "Welcome Message for your clients",
          subtitle: "For clients who have logged in",
          ref: "This is the module reference",
          description: "This is an area for a high-level program overview",
          videoRef: "none"
      }
    });
  });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
      console.log('in componentDidMount');
      this.resetContent();
  });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className='app'>
        <Header user={this.state.user} classes={this.state.classes} login={this.login} logout={this.logout} lessons={this.state.lessons} onSelectModule={this.handleModule} resetContent={this.resetContent}/>
          {this.state.user ?
            <div className='container'>
          <nav className='display-item desktop'>
            <ProgramMenu lessons={this.state.lessons} onSelectModule={this.handleModule}/>
          </nav>
          <div className='content'><Content content={this.state.module}/></div>
          </div>
          :

          <div>
            <SignInScreen />
          </div>
          }
      
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App
