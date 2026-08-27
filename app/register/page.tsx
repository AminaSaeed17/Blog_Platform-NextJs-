"use client";

import { useState, ChangeEvent, FormEvent } from "react";
// import axios from "axios";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../_redux/store";
import toast from "react-hot-toast";
import { setError, setToken } from "../_redux/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: "male" | "female" | "";
}

export default function Register() {
  const router = useRouter();
  const isLoading = useSelector((store: State) => store.authReducer.isLoading);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "",
  });

  // const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.rePassword) {
      setError("Password and rePassword do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        dispatch(setError(data.message));
      } else {
        dispatch(setToken(data));
        router.push("/login");
      }

      console.log(data);

      console.log("Token saved to localStorage:", data.token);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Sign Up
      </Typography>

      {/* {error && <Alert severity="error">{error}</Alert>} */}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <TextField
        label="Confirm Password"
        name="rePassword"
        type="password"
        value={formData.rePassword}
        onChange={handleChange}
        required
      />

      <TextField
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
      />

      <TextField
        select
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
      </TextField>

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Loading..." : "Sign Up"}
      </Button>
      <Typography>
        you already have account{" "}
        <Link style={{ textDecoration: "none" }} href={"/login"}>
          Login
        </Link>{" "}
      </Typography>
    </Box>
  );
}
