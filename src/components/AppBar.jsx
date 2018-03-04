import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';
import IconButton from 'material-ui-next/IconButton';

// const styles = theme => ({
//   root: {
//     marginTop: theme.spacing.unit * 3,
//     width: '100%',
//   },
//   flex: {
//     flex: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// });

const root = {
    marginTop: theme.spacing.unit * 3,
    width: '100%'
  };
const flex = {
    flex: 1
  };
 const menuButton =  {
    marginLeft: -12,
    marginRight: 20,
  };

  export default class AppBar extends React.Component {
    render() {
        return (
            <div className={root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={menuButton} color="contrast" aria-label="Menu">
                    <i className="material-icons">menu</i>
                    </IconButton>
                    <Typography type="title" color="inherit" className={flex}>
                    Create Your Great
                    </Typography>
                    <IconButton><i className="material-icons">home</i></IconButton>
                    <IconButton><i className="material-icons">help</i></IconButton>
                    <Button color="contrast">Login</Button>
                    {/* {this.props.user ?
                    <Button raised onClick={this.logout}>Logout</Button>
                    :
                    <Button raised onClick={this.login}>Log In</Button> 
                    } */}
                    <Button raised >Log In</Button> 
                </Toolbar>
            </AppBar>
            </div>
        )
    }
}