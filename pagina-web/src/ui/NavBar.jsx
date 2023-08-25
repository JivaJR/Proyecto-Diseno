import React from 'react'
import { NavLink} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';

export const NavBar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    let activeStyle = {
        textDecoration: "none",
        display:'none',
        color: 'inherit',
    };
    let nonActiveStyle = {
        textDecoration: "none",
        color: 'inherit',
    };

    return (
        <Box sx={{width:'100%', flexGrow:2,position:'fixed',zIndex:1}}>
            <AppBar  sx={{flexDirection:'row',position:"static"}}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <NavLink 
                                    to={"/home"}
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : nonActiveStyle
                                    }
                                >
                                    <Typography  
                                        textAlign="center"
                                    >
                                        Home
                                    </Typography>
                                </NavLink>
                                <NavLink 
                                    to={"/consultas"}
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : nonActiveStyle
                                    }
                                >
                                    <Typography  
                                        textAlign="center"
                                    >
                                        Consultas
                                    </Typography>
                                </NavLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography 
                        variant="h6" component="a" 
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                        href="/"
                    >
                        Home
                    </Typography>
                    <Typography 
                        variant="h6" component="a" 
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                        href="/consultas"
                    >
                        Consultas
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}


