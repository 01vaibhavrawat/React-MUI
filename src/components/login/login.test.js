import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../assets/logo.png';
import { error } from '../../App';

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#db3131",
          "&$error": {
            color: "#db3131",
          },
        },
      },
    },
  },
});

export default function LogIn() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let cred = {
      email: data.get('username'),
      password: data.get('password')
    };
    const validCred = {
      email: 'username',
      password: 'password'
    }

    if (cred.username == cred.username && cred.password == validCred.password) {
      window.location.href = `http://localhost:3000/dashboard/$`;

    } else {
      error();
    }
  };

  return (
    <div className='login-body'>
      <div id="login-header">
        <img id="logo-login" src={logo} alt="TheNimantran" />
      </div>
      <Grid container>
        <Grid item xs={1} sm={3}></Grid>
        <Grid item xs={10} sm={6} mt={6} sx={{ backgroundColor: "white", pb: 5 }}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <div id="login-input-div1">
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoFocus
                    />
                  </div>
                  <div id="login-input-div1">
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </div>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid><Grid item xs>
                      <Button id="login-button"
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                  <br></br>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Grid>
        <Grid item xs={1} sm={3}></Grid>
      </Grid>
    </div>
  );
}