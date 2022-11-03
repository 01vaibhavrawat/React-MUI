import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { bannerData } from '../../redux/bannerSlice';
import { useDispatch, useSelector } from "react-redux";
import { addNewBanner } from '../../api/assetstore';
import { error, success } from '../../App';
import Loader from '../loader/loader';

export default function AddProd({ close }) {


  const [showLoader, setShowLoader] = React.useState(false);

  const data = useSelector((state) => state.bannerReducer.bannerData);
  const switcher = useSelector((state) => state.bannerReducer.switch)
  const dispatch = useDispatch();

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append('rowId', data.rowId);
    formData.append('linkUrl', data.linkUrl);
    formData.append('positionPriority', data.positionPriority);
    formData.append('view', data.view);
    formData.append('file', data.imageUrl);
    if (validation()) {
      setShowLoader(true);
      addNewBanner(formData).then(res => {
        console.log(res, ">>")
        success(`Successfully, ${switcher.added ? 'added' : 'updated'} new banner.`);
        setShowLoader(false);
        close();
      }).catch((err) => {
        error();
        console.log(err);
        setShowLoader(false);
      })
    }
  }

  const validation = () => {
    if (!data.linkUrl) {
      error('Please fill the required fields.');
      return false;
    }
    return true;
  }

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    dispatch(bannerData([name, value]));
  };

  const handleChange1 = (event) => {
    dispatch(bannerData([event.target.name, event.target.files[0]]));
  }

  return (
    <div>

      {showLoader && <Loader />}

      <div id="addNewUserForm">
        <p id="modal-heading">{switcher.header}</p>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <TextField
              id="imageUrl"
              name="imageUrl"
              required
              fullWidth
              type="file"
              inputProps={{ accept: "image/*" }}
              // value={data.imageUrl}
              hidden
              onChange={handleChange1}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              required
              id="linkUrl"
              name="linkUrl"
              label="URL"
              fullWidth
              variant="outlined"
              value={data.linkUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              id="view"
              name="view"
              label="View"
              fullWidth
              variant="outlined"
              value={data.view}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              required
              id="positionPriority"
              label="Position Priority"
              name="positionPriority"
              fullWidth
              variant="outlined"
              value={data.positionPriority}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button id="newCategorySubmit" variant="contained" onClick={() => handleSubmit()}>Submit</Button>
        <Button id="modalCancel" variant="contained" onClick={() => close()}>Cancel</Button>
      </div>
    </div>
  );
}