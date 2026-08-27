"use client"

import { Button, TextField, Box } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { dispatch } from "../_redux/store";
import { changePassword } from "../_redux/authSlice";
import toast from "react-hot-toast";


export default function ChangePassword(){


const dispatch = useDispatch<dispatch>();

const [values,setValues]=useState({
 password:"",
 newPassword:""
});



function handleChange(e:ChangeEvent<HTMLInputElement>){

 setValues({
   ...values,
   [e.target.name]:e.target.value
 });

}



async function handleSubmit(){

  try {

    await dispatch(changePassword(values)).unwrap();

    toast.success("Password changed successfully");
     setValues({
      password: "",
      newPassword: ""
    });

  } catch(error) {

    toast.error(error as string);

  }

}


return (

<Box sx={{display:'flex', flexDirection: 'column', gap:2}}>

<TextField
name="password"
label="Old Password"
type="password"
value={values.password}
onChange={handleChange}
/>


<TextField
name="newPassword"
label="New Password"
type="password"
value={values.newPassword}
onChange={handleChange}
/>


<Button
onClick={handleSubmit}
variant="contained"
>
Change Password
</Button>


</Box>

)

}