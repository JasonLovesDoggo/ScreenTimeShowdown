import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import GroupsIcon from '@mui/icons-material/Groups';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import PersonIcon from '@mui/icons-material/Person';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const SideNav = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    return (
        <>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemText primary={<Typography variant="h5">Showdown Menu</Typography>} />
                    </ListItem>
                </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={(): void => nav('/party')}>
                            <ListItemIcon>
                                <GroupsIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">My Party</Typography>} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={(): void => nav('/game')}>
                            <ListItemIcon>
                                <VideogameAssetIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">My Game</Typography>} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={(): void => nav('/payouts')}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Profile</Typography>} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </>
    );
}

export default SideNav;
