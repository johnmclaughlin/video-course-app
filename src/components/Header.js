import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';
import IconButton from 'material-ui-next/IconButton';
import Popover from 'material-ui/Popover';

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
        open: false,
        anchorEl: null,
        anchorOriginVertical: 'bottom',
        anchorOriginHorizontal: 'middle',
        anchorReference: 'anchorEl'
      };
  
      handleDrawerToggle = () => {
          this.setState({ mobileOpen: !this.state.mobileOpen });
      };

      handleClickButton = () => {
        this.setState({
          open: true,
          anchorEl: findDOMNode(this),
        });
      };

      handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };
  
      render() {
          const { classes, theme } = this.props;

          const {
            open,
            anchorEl,
            anchorOriginVertical,
            anchorOriginHorizontal,
            transformOriginVertical,
            transformOriginHorizontal,
            positionTop,
            positionLeft,
            anchorReference,
          } = this.state;

          const styles = theme => ({
            button: {
              marginBottom: theme.spacing.unit * 4,
            },
            typography: {
              margin: theme.spacing.unit * 2,
            },
          });
      
          const drawer = (
            <div>
                <nav className='display-item xxx-mobile'>
                <ProgramMenu lessons={this.props.lessons} userWeek={this.props.userWeek} onSelectModule={this.props.onSelectModule}/>
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
                    Create Your Great <span className="desktop"><br />How To Create Your Dream Career</span>
                    </Typography>
                    <IconButton><i className="material-icons toolbar" onClick={this.props.resetContent}>home</i></IconButton>
                    <IconButton><i className="material-icons toolbar">help</i></IconButton>
                    {this.props.user ?
                    <div>
                    <IconButton><i className="material-icons toolbar" onClick={this.props.logout}>account_circle</i></IconButton>
                    {/*<
                        IconButton id='anchorEl' ref={node => {this.button = node;}} onClick={this.handleClickButton}><i className="material-icons toolbar">supervisor_account</i></IconButton>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        anchorReference={anchorReference}
                        onRequestClose={this.handleRequestClose}
                        anchorOrigin={{
                            vertical: anchorOriginVertical,
                            horizontal: anchorOriginHorizontal,
                        }}
                        >
                        <Typography className={classes.typography} style={{ margin: '2em' }}>Sign Out</Typography>
                        <Typography className={classes.typography} style={{ margin: '2em' }}>Administration</Typography>
                    </Popover>
                    */}
                    </div>
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