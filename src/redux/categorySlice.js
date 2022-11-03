import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "data",
  initialState: {
    categoryData: {
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
    reset: {
      rowId: 0,
      categoryName: '',
      parentId: '',
      positionPriority: 5,
      file: '',
      products: [],
      vendorId: 0
    },
  },

  reducers: {
    categoryData: (state, action) => {
      state.categoryData = { ...state.categoryData, [action.payload[0]]: action.payload[1] }
    },

    editCategory: (state, action) => {
      state.categoryData = action.payload;
      state.switch.header = 'Update category';
      state.switch.showImage = true;
      state.switch.added = false;
    },
    addCategory: (state, action) => {
      state.switch.header = 'Add new category';
      state.switch.showImage = false;
      state.switch.added = true;
    }
  },
});

export const { categoryData, editCategory, addCategory } = slice.actions;

export default slice.reducer;