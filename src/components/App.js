import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ListExampleSimple from './ListExampleSimple';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: '',
      username: '',
      lessons: [],
      user: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
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
        lessons: newState
      });
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  
  render() {
    return (
      <div className='app'>
        <header>
          <div className="wrapper">
            <h1>How to Lead Yourself to a Fulfilling Career</h1>
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>                
            :
              <button onClick={this.login}>Log In</button>              
            }
        </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <h3>{this.state.user.displayName}</h3>
              {/* <img src={this.state.user.photoURL} /> */}
            </div>
          </div>
        :
          <div className='wrapper'>
            <p>You must be logged in to see the program modules.</p>
          </div>
        } 
        <div className='container'>
          <section className='add-item control'>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                  <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                  <button>Add Item</button>
                </form>
          </section>
          {this.state.user ?
          <section className='display-item'>
              <MuiThemeProvider>
                <ListExampleSimple lessons={this.state.lessons} />
              </MuiThemeProvider>
          </section>
          :
          <div className='wrapper'>
            <p>--- this indicates an unauthenticated vistor ---</p>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default App
