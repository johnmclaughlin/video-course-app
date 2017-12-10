import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';
import IconButton from 'material-ui-next/IconButton';

import Hidden from 'material-ui-next/Hidden';
import Drawer from 'material-ui-next/Drawer';
import Divider from 'material-ui-next/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui-next/List';

import ProgramMenu from './ProgramMenu';

const root = {
    marginTop: '0',
    width: '100%'
  };
const flex = {
    flex: '1 1 50%',
    'fontSize': '3vw',
    'marginTop': '1vw',
    'fontFamily': 'Crimson Text',
    'textTransform': 'uppercase'
  };
 const menuButton =  {
    marginLeft: -12,
    marginRight: 20,
  };

  export default class Header extends React.Component {
    state = {
        mobileOpen: false,
      };
  
      handleDrawerToggle = () => {
          this.setState({ mobileOpen: !this.state.mobileOpen });
      };
  
      render() {
          const { classes, theme } = this.props;
      
          const drawer = (
            <div>
                <nav className='display-item'>
                <ProgramMenu lessons={this.props.lessons} onSelectModule={this.props.onSelectModule}/>
              </nav> 
            </div>
          );
        return (
            <div style={root}>
            <AppBar position="static">
                <Toolbar>
                    <div className="button__menu">
                        <IconButton style={menuButton} color="contrast" aria-label="Menu" onClick={this.handleDrawerToggle}>
                            <i className="material-icons">menu</i>
                        </IconButton>
                    </div>
                    <Typography type="title" gutterBottom color="inherit" style={flex}>
                    How To Lead Yourself to a Fulfilling Career
                    </Typography>
                    <IconButton><i className="material-icons toolbar" onClick={this.props.resetContent}>home</i></IconButton>
                    <IconButton><i className="material-icons toolbar">help</i></IconButton>
                    {this.props.user ?
                    <IconButton><i className="material-icons toolbar" onClick={this.props.logout}>account_circle</i></IconButton>
                    :
                    <IconButton><i className="material-icons toolbar" style={{ opacity: 0.5 }} onClick={this.props.login}>account_circle</i></IconButton> 
                    } 
                </Toolbar>
            </AppBar>
            <Hidden mdUp>
                <Drawer
                    type="temporary"
                    // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={this.state.mobileOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    onRequestClose={this.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    >
                    {drawer}
                    </Drawer>
                </Hidden>
            </div>
        )
    }
}