import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from "@material-ui/core";
import DvrIcon from '@mui/icons-material/Dvr';
import CategoryIcon from '@mui/icons-material/Category';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import LayersIcon from '@mui/icons-material/Layers';

import { Outlet, Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import avatar from '../../assets/user.jpg';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const icon = (index) => {
  switch (index) {
    case 0:
      return <DvrIcon sx={{ color: "white" }} />;
      break;
    case 1:
      return <LayersIcon sx={{ color: "white" }} />;
      break;
    case 2:
      return <ViewCarouselIcon sx={{ color: "white" }} />;
      break;
    case 3:
      return <CategoryIcon sx={{ color: "white" }} />;
      break;
  }
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "#2c1762",
      color: "white"
    }
  }
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {

  const classes = useStyles();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sidebarLinks = ['$', 'productlist', 'banners', 'categories']

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar id="navbar">
          <Tooltip title="Open sidbar">
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          <img id="logo" src={logo} alt="logo" />
          <Box id='avatar' sx={{ flexGrow: 0 }}>
            <Tooltip title="Show options">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="avatar" src={avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              PaperProps={{
                sx: {
                  backgroundColor: "#2c1762",
                  color: "white",
                }
              }}
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Drawer
          sx={{
            backgroundColor: "rgba(30, 139, 195, 0.8)",
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader className="background-test" >
            <Tooltip title="Close sidebar">
              <IconButton onClick={handleDrawerClose}>
                <ArrowBackIosIcon sx={{ color: "white" }}></ArrowBackIosIcon>
              </IconButton>
            </Tooltip>
          </DrawerHeader>
          <Divider />
          <List sx={{ fontSize: 20 }}>
            {['Dashboard', 'Products', 'Banners', 'Categories'].map((text, index) => (
              <ListItem component={Link} to={sidebarLinks[index]} key={text} disablePadding >
                <ListItemButton>
                  <ListItemIcon>
                    {icon(index)}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
