import React from 'react';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import IconButton from 'material-ui-next/IconButton';
import Hidden from 'material-ui-next/Hidden';
import Drawer from 'material-ui-next/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Modal from 'material-ui-next/Modal';
import ProgramMenu from './ProgramMenu';

const root = {
  marginTop: '0',
  width: '100%',
};
const flex = {
  flex: '1 1 50%',
  fontSize: '3vw',
  marginTop: '1vw',
  fontFamily: 'Crimson Text',
  textTransform: 'uppercase',
};
const menuButton = {
  marginLeft: -12,
  marginRight: 20,
};

/* BEGIN SUPPORT MODAL */

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 25,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const SimpleModal = (props) => {
  const { classes } = props;
  return (
    <Modal
      aria-labelledby="Support"
      aria-describedby="Contact information for support"
      open={props.open}
      onClose={props.handleCloseModal}
    >
      <div style={getModalStyle()} className={classes.paper}>
        <Typography variant="title" id="modal-title">
          {'We\'re here to help!'}
        </Typography>
        <Typography variant="subheading" id="simple-modal-description">
          <br />
            Having trouble?<br />
            Please send us an email at:<br />
          <a href="mailto:support@teaching2lead.com?subject=I'm having trouble with...">support@teaching2lead.com</a>
        </Typography>
      </div>
    </Modal>
  );
};

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SupportModal = withStyles(styles)(SimpleModal);

/* END SUPPORT MODAL */


export default class Header extends React.Component { // eslint-disable-line react/no-multi-comp
    state = {
      mobileOpen: false,
      open: false,
      user: false,
      content: false,
    };

      handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
      };

      toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };

      handleOpenModal = () => {
        this.setState({ open: true });
      };

      handleCloseModal = () => {
        this.setState({ open: false });
      };

      render() {
        const { classes } = this.props;

        const userList = (
          <div>
            <div className="admin__title">User Administration</div>
            <div className="admin_description">
              <ul>
                <li>Display all users and their details</li>
                <li>Modify userWeek, role [ user, admin, disabled ]</li>
              </ul>
            </div>
          </div>
        );

        const contentList = (
          <div>
            <div className="admin__title">Content Administration</div>
            <div className="admin_description">
              <ul>
                <li>Display all videos and their details</li>
                <li>Modify all videos and their details</li>
              </ul>
            </div>
          </div>
        );

        const drawer = (
          <div>
            <nav className="display-item xxx-mobile">
              <ProgramMenu lessons={this.props.lessons} userWeek={this.props.userWeek} onSelectModule={this.props.onSelectModule} />
            </nav>
          </div>
        );
        return (
          <div style={root}>
            <AppBar position="static">
              <Toolbar>
                <div className="button__menu">
                  <IconButton style={menuButton} color="inherit" aria-label="Menu" onClick={this.handleDrawerToggle}>
                    <i className="material-icons">menu</i>
                  </IconButton>
                </div>
                <Typography type="title" gutterBottom color="inherit" style={flex}>
                    Create Your Great <span className="desktop">How To Create Your Dream Career</span>
                </Typography>
                <div className="controls">
                  <div classNmae="controls__user">
                    <IconButton><i className="material-icons toolbar" onClick={this.props.resetContent}>home</i></IconButton>
                    <IconButton><i className="material-icons toolbar" onClick={this.handleOpenModal}>help</i></IconButton>

                    {this.props.user ?
                      <IconButton><i className="material-icons toolbar" onClick={this.props.logout}>account_circle</i></IconButton>
                    :
                      <IconButton><i className="material-icons toolbar" style={{ opacity: 0.5 }} onClick={this.props.login}>account_circle</i></IconButton>
                    }
                  </div>
                  {this.props.role === 'admin' && // need to load user data
                  <div classNmae="controls__admin">
                    <IconButton><i className="material-icons toolbar" onClick={this.toggleDrawer('user', true)}>supervisor_account</i></IconButton>
                    <IconButton><i className="material-icons toolbar" onClick={this.toggleDrawer('content', true)}>video_library</i></IconButton>
                  </div>
                    }
                </div>
              </Toolbar>
            </AppBar>

            {/* SUPPORT MODAL */}
            <SupportModal open={this.state.open} handleOpenModal={this.handleOpenModal} handleCloseModal={this.handleCloseModal} />

            {/* USER ADMIN DRAWER */}
            <Drawer anchor="right" open={this.state.user} onClose={this.toggleDrawer('user', false)}>
              <div
                className="admin users"
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('user', false)}
                onKeyDown={this.toggleDrawer('user', false)}
              >
                {userList}
              </div>
            </Drawer>

            {/* CONTENT ADMIN DRAWER */}
            <Drawer anchor="right" open={this.state.content} onClose={this.toggleDrawer('content', false)}>
              <div
                className="admin modules"
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('content', false)}
                onKeyDown={this.toggleDrawer('content', false)}
              >
                {contentList}
              </div>
            </Drawer>

            {/* MOBILE MENU */}
            <Hidden mdUp>
              <Drawer
                type="temporary"
                    // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                classes={{
                        paper: classes.drawerPaper,
                    }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
              >
                {drawer}
              </Drawer>
            </Hidden>
          </div>
        );
      }
}
