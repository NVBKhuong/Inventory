import { Avatar, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../service/store/store';

interface ProfileProps {
  email?: string;
  phone?: string;
  name?: string;
  avatarUrl?: string | null;
  rank?: string;
}

const ProfileComponent: React.FC<ProfileProps> = ({ email, phone, name, avatarUrl , rank }) => {
    const navigate = useNavigate()

    const { account } = useAppSelector((state) => state.auth);
    const isCustomer = account && account.userResult && account.userResult.role.includes('Customer');

  return (
    <div className={`${isCustomer ? "flex justify-center items-center min-h-screen bg-gray-100 p-4 " : "flex justify-center items-center p-4"}`}>
    <Card className="w-full max-w-4xl p-6 shadow-md">
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Avatar
              alt="Profile Picture"
              src={avatarUrl ? avatarUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf_kICgvJcn6Y3n27_wy9ho6k2w7OL0-bZZg&s"}
              className="w-24 h-24 mr-4"
            />
            <div>
              <Typography variant="h6">{name}</Typography>
              <Typography variant="body2" color="textSecondary">Rank: {rank}</Typography>
            </div>
          </div>
          <Button variant="outlined" color="primary" onClick={()=> {navigate('/change-password')}}>
            Change Password
          </Button>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              label="Name"
              value={name}
              variant="outlined"
              fullWidth
              disabled
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              variant="outlined"
              fullWidth
              disabled
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact Number"
              value={phone}
              variant="outlined"
              fullWidth
              disabled
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
      
        </Grid>
      </CardContent>
    </Card>
  </div>
  );
};

export default ProfileComponent;