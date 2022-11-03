import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "data",
  initialState: {
    bannerData: {
      rowId: '',
      view: '',
      positionPriority: 5,
      imageUrl: '',
      linkUrl: ''
    },
    reset: {
      rowId: 0,
      categoryName: '',
      parentId: '',
      positionPriority: 5,
      file: '',
      products: [],
      vendorId: 0
    },
    switch: {
      header: 'Update category',
      showImage: true,
      added: true,
    },
  },

  reducers: {
    bannerData: (state, action) => {
      state.bannerData = { ...state.bannerData, [action.payload[0]]: action.payload[1] }
    },

    editBanner: (state, action) => {
      state.bannerData = action.payload;
      state.switch.header = 'Update banner';
      state.switch.showImage = true;
      state.switch.added = false;
    },
    addBanner: (state, action) => {
      state.switch.header = 'Add new banner';
      state.switch.showImage = false;
      state.switch.added = true;
    }
  },
});

export const { bannerData, editBanner, addBanner } = slice.actions;

export default slice.reducer;