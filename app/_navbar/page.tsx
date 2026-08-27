"use client";

import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Link from "next/link";
import { DarkMode } from "@mui/icons-material";
import { useColorMode } from "../ThemeContext";
import { useTheme } from "@mui/material/styles";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { dispatch, State } from "../_redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser, setRemoveToken } from "../_redux/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

const drawerWidth = 240;

export default function Sidebar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const token = useSelector((state: State) => state.authReducer.token);
  const user = useSelector((state: State) => state.authReducer.user);
  const router = useRouter();
  const dispatch = useDispatch<dispatch>();

  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  React.useEffect(() => {
    if (token && !user) {
      dispatch(getLoggedUser());
    }
  }, [token, user, dispatch]);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const { toggleColorMode } = useColorMode();

  function logout() {
    handleCloseUserMenu();
    router.push("/login");
    dispatch(setRemoveToken());
  }

  const drawerContent = token && (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {token ? (
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                Circle
              </Link>
            ) : (
              "Circle"
            )}
          </Typography>
          <IconButton onClick={toggleColorMode}>
            {mounted &&
              (theme.palette.mode === "dark" ? (
                <DarkMode />
              ) : (
                <LightModeOutlinedIcon />
              ))}
          </IconButton>
        </Toolbar>

        <Divider />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            py: 2,
          }}
        >
          {user && (
            <>
              <Image
                src={user.photo || "/user.png"}
                alt={user.name}
                width={60}
                height={60}
                style={{
                  borderRadius: "50%",
                }}
              />

              <Typography>{user.name}</Typography>

              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </>
          )}
        </Box>

        <List>
          <ListItem disablePadding>
            <Link
              href="/"
              style={{ textDecoration: "none", width: "100%" }}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemButton>
                <ListItemText
                  primary="All Posts"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              href="/profile"
              style={{ textDecoration: "none", width: "100%" }}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemButton>
                <ListItemText
                  primary="my Posts"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link
              href="/createpost"
              style={{ textDecoration: "none", width: "100%" }}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemButton>
                <ListItemText
                  primary="add post"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              href="/userProfile"
              style={{ textDecoration: "none", width: "100%" }}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemButton>
                <ListItemText
                  primary="profile"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem onClick={logout}>
            <Typography sx={{ textAlign: "center" }}>Logout</Typography>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {token && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {token && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
