// import React, { useState } from "react";

"use client"
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../_redux/store";
import { setLoading, setError, setToken } from "../_redux/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {

  const theme = useTheme();
  const router = useRouter();

  const isLoading = useSelector((store: State) => store.authReducer.isLoading);
  const dispatch = useDispatch();

async function login(values: { email: string; password: string }) {
  try {
    dispatch(setLoading());
    const response = await fetch("/api/users/signin", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      dispatch(setError(data.message));
    } else {
      dispatch(setToken(data));
      router.push("/")
    }

    console.log(data);

  
    console.log("Token saved to localStorage:", data.token);

  } catch (error) {
    toast.error("Something went wrong");
    console.log(error);
  }
}

const { values, handleChange, handleSubmit } = useFormik({
  initialValues: {
    email: "",
    password: ""
  },
  onSubmit: login,

})




  return <>
     <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <Card
        sx={{
          width: 350,
          padding: 2,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              id="email"
              sx={{ mb: 2, color: theme.palette.text.primary }}
              onChange={handleChange}
              value={values.email}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              id="password"
              sx={{ mb: 3, color: theme.palette.text.primary }}
              onChange={handleChange}
              value={values.password}
            />

            <Button
              fullWidth
              variant="contained"
              disabled={isLoading}
              type="submit"
              sx={{
                py: 1.2,
                borderRadius: 2,
              }}
            >
              {isLoading ?  <CircularProgress aria-label="Loading…" /> : "Login"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </>
}
