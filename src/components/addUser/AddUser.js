import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useSelector } from "react-redux";

const handleSubmit = (data) => {
  console.log(data);
}

export default function AddProd() {
  
  const data = useSelector((state) => state.html.data);

  const handleSubmit = () => console.log(data);

  return (
    <div>
      <div id="addNewUserForm">
      <p id="modal-heading">Add new user</p>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="firstName" 
            name="firstName"
            label="First name"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="username" 
            name="username"
            label="Username"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
        <TextField
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              fullWidth
            />
            </Grid>
        <Grid item xs={6} sm={6}>
        <TextField
            required
            id="mobileNumber"
            name="mobileNumber"
            label="Mobile number"
            fullWidth
            variant="outlined"
          />
        </Grid>
            <Grid item xs={6} sm={6}>
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="files"
            name="files"
            fullWidth
            variant="outlined"
            type="file"
            inputProps={{accept: "image/*"}}
          />
        </Grid>
      </Grid>
      <Button id="newUserSubmit" variant="contained" onClick={()=> handleSubmit()}>Submit</Button>
      </div>
    </div>
  );
}