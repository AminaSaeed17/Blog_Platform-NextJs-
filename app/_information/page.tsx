import { User } from '@/types/auth'
import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

export default function Information({ user }: { user: User | null }) {
  return <>
    <Box>
        <Box sx={{display: 'flex', justifyContent:'space-between'}}>
            <Typography>Name</Typography>
            <Typography>{user?.name}</Typography>
        </Box>
        <Divider sx={{mb:3}}/>
        <Box sx={{display: 'flex', justifyContent:'space-between'}}>
            <Typography>Email</Typography>
            <Typography>{user?.email}</Typography>
        </Box>
        <Divider sx={{mb:3}}/>
        <Box sx={{display: 'flex', justifyContent:'space-between'}}>
            <Typography>Gender</Typography>
            <Typography>{user?.gender}</Typography>
        </Box>
        <Divider sx={{mb:3}}/>
        <Box sx={{display: 'flex', justifyContent:'space-between'}}>
            <Typography>DateOfBirth</Typography>
            <Typography>{user?.dateOfBirth}</Typography>
        </Box>
        <Divider/>

    </Box>
  </>
}
