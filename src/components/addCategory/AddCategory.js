import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { categoryData } from '../../redux/categorySlice';
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory } from '../../api/assetstore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAllCategories } from '../../api/assetstore';
import { error, success } from '../../App';
import Loader from '../loader/loader';

export default function AddProd({ close }) {

  const data = useSelector((state) => state.categoryReducer.categoryData);
  const switcher = useSelector((state) => state.categoryReducer.switch)
  const dispatch = useDispatch();


  const [apiData, setApiData] = React.useState([]);


  const [showLoader, setShowLoader] = React.useState(false);

  React.useEffect(() => {
    getAllCategories().then(function (res) {

      setApiData(res.result);

    })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const handleSubmit = (data) => {
    // console.log('data >', data); 
    let formData = new FormData();
    formData.append('rowId', data.rowId);
    formData.append('vendorId', data.vendorId);
    formData.append('categoryName', data.categoryName);
    // formData.append('file', data.categoryData.file);
    formData.append('parentId', data.parentId);
    formData.append('positionPriority', data.positionPriority);
    formData.append('products', data.products);
    formData.append('file', data.file);
    if (validation()) {
      setShowLoader(true);
      addNewCategory(formData).then(res => {
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
    if (!data.categoryName) {
      error('Please fill the required fields.');
      return false;
    }
    return true;
  }

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    dispatch(categoryData([name, value]));
  };

  const handleChange1 = (event) => {
    dispatch(categoryData([event.target.name, event.target.files[0]]));
  }

  let grid = 5;
  if (!switcher.showImage) {
    grid = 6;
  }

  console.log("trueor false", switcher.showImage)

  return (
    <div>

      {showLoader && <Loader />}

      <div id="addNewUserForm">
        <p id="modal-heading">{switcher.header}</p>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              required
              id="cantegoryName"
              name="categoryName"
              label="Category name"
              fullWidth
              variant="outlined"
              value={data.categoryName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Parent Id</InputLabel>
              <Select
                id="parentId"
                name="parentId"
                label="Parent Id"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                value={data.parentId}
              >
                {apiData.map((item) => {
                  return (

                    <MenuItem key={item.rowId} value={item.parentId}>{item.categoryName}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              id="positionPriority"
              name="positionPriority"
              label="Position Priority"
              type="number"
              fullWidth
              variant="outlined"
              value={data.positionPriority}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={grid} sm={grid}>
            <TextField
              name="file"
              type="file"
              inputProps={{ accept: "image/*" }}
              fullWidth
              onChange={handleChange1}
              value={data.image}
            >
            </TextField>
          </Grid>
          {switcher.showImage && <Grid item xs={1} sm={1}>
            <img src={data.categoryImageUrl} height={50} width={50} alt="category" />
          </Grid>}
        </Grid>
        <br />
        <Button id="newCategorySubmit" variant="contained" type="submit" onClick={() => handleSubmit(data)}>Submit</Button>
        <Button id="modalCancel" variant="contained" onClick={() => close()}>Cancel</Button>
      </div>
    </div >
  );
}