import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Elevation() {
  const numbers = [32445444, 45345, 34534, 435];

  return (
    <Grid className="dasboard-cards"container spacing={4}>
       {['Products', 'Users', 'Banners', 'Categories'].map((item, index) => (
        
    <React.Fragment>
        <Grid key={item} item xs={12} md={6} lg={3} >
          <Paper key={item} elevation={4} sx={{backgroundColor: "#2c1762", color: "white"}}>
            <p className="card-text">{item}</p>
            <p className="card-number">{numbers[index]}</p>
            </Paper>
          </Grid>
      </React.Fragment> 
       ))}  
   </Grid>
    )
}
