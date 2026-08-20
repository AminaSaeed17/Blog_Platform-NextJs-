"use client"
import { Box, Button, Card, CardContent, TextField, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';

export default function CreatePost() {
    
    
    const theme = useTheme();
    const router = useRouter();

    async function handelSumbit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        console.log(form.body.value, form.image.files[0])
        const formData = new FormData();
        formData.append('body',form.body.value);
        formData.append('image',form.image.files[0]);


        const response = await fetch('/api/posts/createPost', {
          method: "POST",
          body: formData,
          headers: {
            'token': `${localStorage.getItem('token')}`
          }
        })

        const data = await response.json();
        toast.success(data.message);
        router.push('profile');
    }

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
            Add Your Post
          </Typography>

          <Box component="form" onSubmit={(e) => handelSumbit(e)}>
            <TextField
              fullWidth
              name='body'
              label="body"
              type="text"
              id="body"
              sx={{ mb: 2, color: theme.palette.text.primary }}
            />

            <TextField
              fullWidth
              name='image'
              label="image"
              type="file"
              id="image"
              sx={{ mb: 3, color: theme.palette.text.primary }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                py: 1.2,
                borderRadius: 2,
              }}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </>
}
