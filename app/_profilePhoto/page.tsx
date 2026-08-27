import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dispatch, State } from '../_redux/store';

import { Box, Button } from '@mui/material';
import { uploadProfilePhoto } from '../_redux/authSlice';

export default function ProfilePhoto() {
    const user = useSelector(
  (state: State) => state.authReducer.user
);
console.log("PROFILE PHOTO USER:", user);
  const dispatch = useDispatch<dispatch>();

   const [image, setImage] = useState<File | null>(null);



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0];

    if(file){
      console.log(file);
      setImage(file);
    }

  }

  async function handleUpload(){

    if(!image) return;


    const result = await dispatch(
  uploadProfilePhoto(image)
);

console.log("UPLOAD RESULT:", result);

  }


  return (
    <Box>
       <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />


      <Button
        variant="contained"
        onClick={handleUpload}
      >
        Upload Photo
      </Button>

    </Box>
  )
}
