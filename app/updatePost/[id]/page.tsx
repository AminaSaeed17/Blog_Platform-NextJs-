"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, TextField } from "@mui/material";
import toast from "react-hot-toast";


export default function UpdatePost(){

  const { id } = useParams();

  const router = useRouter();


  const [body,setBody] = useState("");
  const [image,setImage] = useState<File | null>(null);



  // get old post data
  useEffect(()=>{

    async function getPost(){

      const res = await fetch(`/api/posts/${id}`);

      const data = await res.json();

      setBody(data.post.body);

    }


    if(id){
      getPost();
    }

  },[id]);





  async function handleSubmit(){


    const formData = new FormData();


    formData.append(
      "body",
      body
    );


    if(image){
      formData.append(
        "image",
        image
      );
    }



    const token = localStorage.getItem("token");



    const res = await fetch(
      `/api/posts/${id}`,
      {
        method:"PUT",

        headers:{
          token: token || ""
        },

        body: formData
      }
    );



    if(res.ok){

      toast.success(
        "Post updated successfully"
      );


      router.push("/");

    }
    else{

      toast.error(
        "Failed to update post"
      );

    }


  }




  return (

    <Box
      sx={{
        width:500,
        mx:"auto",
        mt:5
      }}
    >

      <TextField
        fullWidth
        multiline
        rows={4}
        value={body}
        onChange={(e)=>setBody(e.target.value)}
      />


      <input
        type="file"
        accept="image/*"
        onChange={(e)=>
          setImage(
            e.target.files?.[0] || null
          )
        }
      />


      <Button
        variant="contained"
        onClick={handleSubmit}
      >
        Update Post
      </Button>


    </Box>

  )
}