"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Link from "next/link";
import { DarkMode } from "@mui/icons-material";
import { useColorMode } from "../ThemeContext";
import { useTheme } from "@mui/material/styles";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { State } from "../_redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setRemoveToken } from "../_redux/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    

  const theme = useTheme();
  const token = useSelector((state: State) => state.authReducer.token);
  const router = useRouter();
  const dispatch = useDispatch();



const mounted = React.useSyncExternalStore(
  () => () => {},
  () => true,
  () => false
);

  const handleOpenNavMenu = (event: {
    currentTarget: React.SetStateAction<HTMLElement | null>;
  }) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: {
    currentTarget: React.SetStateAction<HTMLElement | null>;
  }) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { toggleColorMode } = useColorMode();

  function logout() {
    handleCloseUserMenu();
    router.push("/login");
    dispatch(setRemoveToken());
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
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

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                {token && <MenuIcon />}
              </IconButton>

              {token && (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      href="/profile"
                      style={{
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        profile
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      href="/createpost"
                      style={{
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        add post
                      </Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              )}
            </Box>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
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
            {token && (
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Link href="/profile" style={{ textDecoration: "none" }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    profile
                  </Button>
                </Link>

                <Link href="/createpost" style={{ textDecoration: "none" }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      textTransform: "none",
                    }}
                  >
                    add post
                  </Button>
                </Link>
              </Box>
            )}
            {!token && <Box sx={{flexGrow: 1}} />}
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={toggleColorMode} sx={{ mr: 2 }}>
                {mounted &&
    (theme.palette.mode === "dark" ? (
      <DarkMode />
    ) : (
      <LightModeOutlinedIcon />
    ))}
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {token ? (
                  <MenuItem onClick={logout}>
                    <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                  </MenuItem>
                ) : (
                  <Box>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        <Link
                          href="/register"
                          style={{
                            textDecoration: "none",
                            color: theme.palette.text.primary,
                          }}
                        >
                          Register
                        </Link>
                      </Typography>
                    </MenuItem>

                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        <Link
                          href="/login"
                          style={{
                            textDecoration: "none",
                            color: theme.palette.text.primary,
                          }}
                        >
                          Login
                        </Link>
                      </Typography>
                    </MenuItem>
                  </Box>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
