import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "./MenuButton";
import {Switch, useTheme} from "@mui/material";


type ButtonBar = {
    changeModeHandler: () => void;
}

export default function ButtonAppBar({changeModeHandler}: ButtonBar) {
    const theme=useTheme();

    return (
        <Box sx={{ flexGrow: 1 , marginBottom: 10}}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <MenuButton background={theme.palette.primary.dark} color="inherit">Login</MenuButton>
                    <MenuButton background={theme.palette.primary.dark} color="inherit">Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark} color="inherit">FAQ</MenuButton>
                    <Switch color={'default'}  onChange={changeModeHandler}></Switch>
                </Toolbar>
            </AppBar>
        </Box>
    );
}