import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ActionAlerts({hideSuccess}) {
  return (
    <Stack sx={{ width: '75%' }} spacing={2}>
      <Alert onClose={() => {hideSuccess()}}>Successfully added product.</Alert>
      {/* <Alert
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        This is a success alert — check it out!
      </Alert> */}
    </Stack>
  );
}