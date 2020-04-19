import React from 'react';
import clsx from 'clsx';
import { SwipeableDrawer, Badge, AppBar, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, CssBaseline, useTheme, Menu, MenuItem } from '@material-ui/core';
import useStyles from '../styles/Header';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BuildIcon from '@material-ui/icons/Build';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UndoIcon from '@material-ui/icons/Undo';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import RedoIcon from '@material-ui/icons/Redo';
import LockIcon from '@material-ui/icons/Lock';
import Link from 'next/link';
import PublicIcon from '@material-ui/icons/Public';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CorreoInteraccionGlobal from './CorreoInteraccionGlobal';
import WhatsappInteraccionGlobal from './WhatsappInteraccionGlobal';
import { logOut } from '../services/UserService';

function Header(props) {
  const toggleHandleDrawer = () => {
    setOpen(!open);
  };
  const handleDrawerMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const MenuDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const handleCloseInteraccion = result => {
    console.log(result)
    setOpenDialogCorreoInteraccion(false)
    setOpenDialogWhatsappInteraccion(false)
  }
  const handleOpenCorreoInteraccion = () => {
    setOpenDialogCorreoInteraccion(true)
  }
  const handleOpenWhatsappInteraccion = () => {
    setOpenDialogWhatsappInteraccion(true)
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const preventDefault = event => event.preventDefault();
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDialogCorreoInteraccion, setOpenDialogCorreoInteraccion] = React.useState(false)
  const [openDialogWhatsappInteraccion, setOpenDialogWhatsappInteraccion] = React.useState(false)
  const Tools = (
    <div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <UndoIcon />
          </ListItemIcon>
          <ListItemText primary={"Deshacer"} />
        </ListItem>
      </List>
      <List>
        <ListItem button>
          <ListItemIcon>
            <RedoIcon />
          </ListItemIcon>
          <ListItemText primary={"Rehacer"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <CloudUploadIcon />
          </ListItemIcon>
          <ListItemText primary={"Importar"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary={"Bloquear"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleOpenWhatsappInteraccion}>
          <ListItemIcon>
            <Badge badgeContent={<PublicIcon fontSize="small" />}>
              <WhatsAppIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={"Whatsapp"} />
        </ListItem>
        <ListItem button onClick={handleOpenCorreoInteraccion}>
          <ListItemIcon>
            <Badge badgeContent={<PublicIcon fontSize="small" />}>
              <MailOutlineIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={"Correo"} />
        </ListItem>
      </List>
    </div>
  );
  const Navigation = (
    <div>
      <Divider />
      <List>
        <Link href="/tablero">
          <a className={classes.responsiveLink}>
            <ListItem button >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Tablero"} />
            </ListItem>
          </a>
        </Link>
      </List>
      <List>
        <Link href="/clientes">
          <a className={classes.responsiveLink}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Clientes"} />
            </ListItem>
          </a>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href="/estadisticas">
          <a className={classes.responsiveLink}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Estadisticas"} />
            </ListItem>
          </a>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href="/usuario">
          <a className={classes.responsiveLink}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Usuario"} />
            </ListItem>
          </a>
        </Link>
      </List>
    </div >
  );
  return (
    <div>
      <WhatsappInteraccionGlobal id={'WhatsappGlobal'} open={openDialogWhatsappInteraccion} handleClose={handleCloseInteraccion} />
      <CorreoInteraccionGlobal id={'CorreoGlobal'} open={openDialogCorreoInteraccion} handleClose={handleCloseInteraccion} />
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.toolOpenPC]: open,
        })}
      >
        <Toolbar>
          <Hidden smUp implementation="css" >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerMobileToggle}
              className={classes.menuButton}
            >
              <BuildIcon />
            </IconButton>
          </Hidden>
          <Hidden xsDown implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleHandleDrawer}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <ChevronRightIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" noWrap className={classes.title}>
            <div>CRM</div>
            <Hidden xsDown implementation="css" className={classes.links}>
              <Link href="/tablero">
                <a className={classes.link}>
                  Tablero
                </a>
              </Link>
              <Link href="/clientes">
                <a className={classes.link}>
                  Clientes
                </a>
              </Link>
              <Link href="/estadisticas">
                <a className={classes.link}>
                  Estadisticas
                </a>
              </Link>
            </Hidden>
          </Typography>
          <Hidden xsDown implementation="css">
            <IconButton
              color="inherit"
              edge="end"
              aria-label="user"
              onClick={handleClick}
            >
              {/* <Link href="/usuario"> */}
              {/* <a className={classes.link}> */}
              <AccountCircleIcon />
              {/* </a> */}
              {/* </Link> */}
            </IconButton>
            <Menu
              getContentAnchorEl={null}
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={()=>{logOut()}}>Logout</MenuItem>
            </Menu>
          </Hidden>
          <Hidden smUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={MenuDrawerToggle}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={toggleHandleDrawer}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          {Tools}
        </Drawer>
      </Hidden>
      <Hidden smUp implementation="css" >
        <SwipeableDrawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onOpen={handleDrawerMobileToggle}
          onClose={handleDrawerMobileToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {Tools}
        </SwipeableDrawer>
      </Hidden>
      <SwipeableDrawer open={menuOpen} anchor="top" onOpen={MenuDrawerToggle} onClose={MenuDrawerToggle}>
        {Navigation}
      </SwipeableDrawer>
    </div>
  )
}
export default Header;