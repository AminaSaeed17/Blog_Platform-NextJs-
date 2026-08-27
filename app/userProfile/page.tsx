'use client'

import { useEffect } from 'react';
import { dispatch, State } from '../_redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../_redux/authSlice';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ProfileSection from '../_profileSection/page';

export default function UserProfile() {
    const user = useSelector((state: State) => state.authReducer.user);
    const dispatch = useDispatch<dispatch>();

    useEffect(() => {
        if (!user) {
          dispatch(getLoggedUser());
        }
      }, [user, dispatch]);
  return <>
     <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
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

              <Box sx={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                <Typography>{user.name}</Typography>
                
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </>
          )}
        </Box>
        <ProfileSection user={user}/>

  </>
}
