import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProgramMenu from './ProgramMenu';
import Content from './Content';

const muiTheme = getMuiTheme({
  palette: {
    // accent1Color: deepOrange500,
  },
});

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
          user: null
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
          title: "This default title",
          subtitle: "This is the default subtitle",
          ref: "This is the module reference",
          description: "This is the default description",
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
            <h1>How to Lead Yourself to a Fulfilling Career</h1>
            {this.state.user ?
              <div>
                <h3>{this.state.user.displayName}</h3>
                <button onClick={this.logout}>Logout</button> 
              </div>               
            :
              <button onClick={this.login}>Log In</button>              
            }
        </div>
        </header>
        {this.state.user ?
          <div>
           {/* Move this block into access control */}
          </div>
        :
          <div className='wrapper'>
            <p>You must be logged in to see the program modules.</p>
          </div>
        } 
        <div className='container'>

          {this.state.user ?
          <nav className='display-item'>
            <ProgramMenu lessons={this.state.lessons} onSelectModule={this.handleModule}/>
          </nav>
          :
          <nav className='wrapper'>
            <p>--- this indicates an unauthenticated vistor ---</p>
          </nav>
          }

          <div className='content'><Content content={this.state.module}/></div>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App
