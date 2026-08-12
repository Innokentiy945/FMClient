import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import "@mui/icons-material/MoveToInbox";
import "@mui/icons-material/Mail";

import { useNavigate } from "react-router-dom";
import {IconButton} from "@mui/material";

export default function AppDrawer() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleNavigate = (path) => {
        navigate(path);
        setOpen(false);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigate("/GrillMap")}>
                        <ListItemIcon>
                            <IconButton />
                        </ListItemIcon>
                        <ListItemText primary="Grill Map" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigate("/GrillDashboard")}>
                        <ListItemIcon>
                            <IconButton />
                        </ListItemIcon>
                        <ListItemText primary="Grill Dashboard" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            {!open && (
                <Button
                    sx={{
                        position: "fixed",
                        top: 10,
                        left: 10,
                        zIndex: 2000
                    }}
                    onClick={toggleDrawer(true)}
                >
                    Open menu
                </Button>
            )}

            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
            >
                {DrawerList}
            </Drawer>
        </>
    );
}
