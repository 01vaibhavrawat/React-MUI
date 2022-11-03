import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "data",
  initialState: {
    productData: {
      rowId: 0,
      SKUNumber: 0,
      labels: '',
      productDesc: '',
      productName: '',
      shortDesc: '',
      positionPriority: 5,
      mrp: 0,
      sellPrice: 0,
      exclusiveCategory: '',
      imageUrls: [],
      vendorId: 0,
      categoryEntity: [],
      images: '',
    },

    reset: {
      rowId: 0,
      SKUNumber: 0,
      labels: '',
      productDesc: '',
      productName: '',
      shortDesc: '',
      positionPriority: 5,
      mrp: 0,
      sellPrice: 0,
      videoUrl: '',
      exclusiveCategory: '',
      imageUrls: [],
      vendorId: 0,
      categoryEntity: [],
      images: [],
    },
  },

  reducers: {
    productData: (state, action) => {
      state.productData = { ...state.productData, [action.payload[0]]: action.payload[1] }
    },
    edit: (state, action) => {
      state.productData = action.payload
    }
  },
});

export const { productData, edit } = slice.actions;

export default slice.reducer;