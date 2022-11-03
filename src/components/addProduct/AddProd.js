import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ProdDescription from "../prodDesc/ProdDesc";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { productData } from '../../redux/productSlice';
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from '../../api/assetstore';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { getAllCategories } from '../../api/assetstore';
import { edit } from '../../redux/productSlice';
import { success, error } from '../../App';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import Loader from '../loader/loader';
import Breadcrumb from '../breadcrumbs/Breadcrumbs';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




function getStyles(categories, personName, theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium,
  };
}



export default function AddProd(current) {

  const [showLoader, setShowLoader] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const labels = [
    { id: 0, label: 'Hot' },
    { id: 1, label: 'New' },
    { id: 2, label: 'Popular' },
    { id: 3, label: 'Trending' },
    { id: 4, label: 'Sale' },
  ];

  const exclusiveCategory = [
    { id: 0, label: 'Featured' },
    { id: 1, label: 'New Arrivals' },
    { id: 2, label: 'Best Seller' },
    { id: 3, label: 'Special Offers' },
  ]

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  const [categories, setCategories] = React.useState([])

  React.useEffect(() => {
    getAllCategories().then((res) => {
      setCategories(res.result);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const theme = useTheme();

  const handleChange1 = (event) => {
    const name = event.target.name;
    dispatch(productData([name, event.target.value]));

  };

  let prodData = useSelector((state) => state.productReducer.productData);
  const reset = useSelector((state) => state.productReducer.reset);
  const dispatch = useDispatch();


  const validation = () => {
    if (!prodData.shortDesc || !prodData.mrp || !prodData.productName || !prodData.sellPrice) {
      error('Please fill the required fields.');
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    let formData = new FormData();
    formData.append('rowId', prodData.rowId);
    formData.append('SKUNumber', prodData.SKUNumber);
    for (let i = 0; i < Array.isArray(prodData.images) ? prodData.images.length : 0; i++) {
      const element = prodData.images[i];
      formData.append('files', element);
    }
    for (let i = 0; i < Array.isArray(prodData.categoryEntity) ? prodData.categoryEntity.length : 0; i++) {
      const element = prodData.categoryEntity[i];
      formData.append('categoryIdList', element.rowId);
    }
    formData.append('vendorId', prodData.vendorId);
    formData.append('exclusiveCategory', prodData.exclusiveCategory);
    formData.append('labels', prodData.labels);
    formData.append('sellPrice', prodData.sellPrice);
    formData.append('productDesc', prodData.productDesc);
    formData.append('productName', prodData.productName);
    formData.append('positionPriority', prodData.positionPriority);
    formData.append('shortDesc', prodData.shortDesc);
    formData.append('mrp', prodData.mrp);
    formData.append('videoUrl', prodData.videoUrl)
    if (validation()) {
      setShowLoader(true);
      addNewProduct(formData).then(res => {
        success('Successfully, added new product.');
        setShowLoader(false);
      }).catch((err) => {
        error();
        console.log(err);
        setShowLoader(false);
      })
    }
  }

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    dispatch(productData([name, value]));
  };

  const handleChange2 = (event) => {
    dispatch(productData([event.target.name, [...event.target.files]]));
  }


  return (
    <div>

      <Breadcrumb parent="Add product" />

      {showLoader && <Loader />}

      <Modal
        open={open}
        onClose={handleModalClose}
      >
        <div id="edit-images-modal">
          {Array.isArray(prodData.imageUrls) ? true : false &&
            prodData.imageUrls.map((arr) => {
              return (
                <div className="edit-img-div" >
                  <img src={arr.imageUrl} alt="category" />
                  <span id="image-delete">
                    <Tooltip title="Delete image">
                      <CloseIcon />
                    </Tooltip>
                  </span>
                </div>
              )
            })

          }
          <br></br>
          <br></br>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={4} sm={4} md={4}>
              <p id="add-new-image" >Add new images -</p>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Tooltip title="Upload images ( recommended ratio 1:1 )">
                <TextField
                  tooltip="upload multiple images"
                  required
                  fullWidth
                  id="images"
                  name="images"
                  type="file"
                  inputProps={{
                    multiple: true,
                    accept: "image/*"
                  }}
                  hidden
                  onChange={handleChange2}
                />
              </Tooltip>
            </Grid>
          </Grid>
          <Button id="newProdSubmit" variant='contained' onClick={() => {
            handleModalClose()
          }}>Done</Button>
        </div>

      </Modal>

      <p id="modal-heading" >Add new product</p>
      <Button id="clear-button" variant="contained" onClick={() => {
        dispatch(edit(reset));
      }}
      >Clear all fields</Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            required
            id="productName"
            name="productName"
            label="Product name"
            fullWidth
            variant="outlined"
            value={prodData.productName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            required
            id="shortDesc"
            name="shortDesc"
            label="Short description"
            fullWidth
            variant="outlined"
            value={prodData.shortDesc}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl fullWidth >
            <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
            <Select
              id="categoryEntity"
              name="categoryEntity"
              multiple
              onChange={handleChange1}
              value={prodData.categoryEntity ? prodData.categoryEntity : []}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (

                    <Chip key={value.rowId} label={value.categoryName} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.rowId}
                  value={category}
                  style={getStyles(category.categoryName, prodData.categoryEntity, theme)}
                >
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6} lg={2} >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Position Priority</InputLabel>
            <Select
              labelId="positionPriority"
              id="positionPriority"
              label="Position Priority"
              onChange={handleChange}
              value={prodData.positionPriority}
              name="positionPriority"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6} lg={3} >
          <TextField
            required
            type="number"
            id="mrp"
            name="mrp"
            label="MRP"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={prodData.mrp}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={3} >
          <TextField
            required
            type="number"
            id="sellPrice"
            name="sellPrice"
            label="Sell price"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={prodData.sellPrice}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            id="videoUrl"
            name="videoUrl"
            label="Video URL"
            fullWidth
            variant="outlined"
            value={prodData.videoUrl}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={4} >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Labels</InputLabel>
            <Select
              labelId="labels"
              id="labels"
              value={prodData.labels}
              label="labels"
              onChange={handleChange}
              name="labels"
            >
              {labels.map((label) => {
                return <MenuItem value={label.label}>{label.label}</MenuItem>
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6} lg={4} >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Exclusive Category</InputLabel>
            <Select
              labelId="exclusiveCategory"
              id="exclusiveCategory"
              value={prodData.exclusiveCategory}
              label="Exclusive Category"
              onChange={handleChange}
              name="exclusiveCategory"
            >
              {exclusiveCategory.map((ec) => {
                return <MenuItem value={ec.label}>{ec.label}</MenuItem>
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6} lg={3} >
          <Button id="editImages" variant='outlined' onClick={handleModalOpen}>Upload or delete images</Button>
        </Grid>
      </Grid>
      <ProdDescription />
      <Button id="newProdSubmit" variant="contained" onClick={(e) => handleSubmit(e)}>Submit</Button>
    </div>
  );
}