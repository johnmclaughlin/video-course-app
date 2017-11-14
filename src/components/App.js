import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ProgramMenu from './ProgramMenu';
import Content from './Content';

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
      user: null
    }
    this.handleModule = this.handleModule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleModule = (modValue) => {
    this.setState({module: modValue.val});
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
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
          user
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
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
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
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className='app'>
        <header>
          <div className="wrapper">
            <div>
              <h2>Lead Yourself to a Fulfilling Career</h2>
              {this.state.user ?
              <h5>{this.state.user.displayName}</h5>
              :
              <h5>Please log in to view your content</h5>
              }
            </div>
              <div className="login">
              <FlatButton label="Dashboard" />
              <FlatButton label="Support" />
            {this.state.user ?
              <RaisedButton label="Logout" onClick={this.logout}/>
            :
              <RaisedButton label="Log In" onClick={this.login}/> 
            }
            </div>
        </div>
        </header>

          {this.state.user ?
            <div className='container'>
          <nav className='display-item'>
            <ProgramMenu lessons={this.state.lessons} onSelectModule={this.handleModule}/>
          </nav>
          <div className='content'><Content content={this.state.module}/></div>
          </div>
          :
          <div className='container'>
          <nav className='wrapper'>
            <p></p>
          </nav>
          <div className='content'><Content content={NoContent}/></div>
          </div>
          }
      
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App
