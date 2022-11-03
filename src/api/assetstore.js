import Api from './baseApi'

// products
export const getAllProducts = async () => {
   return await Api.getApi('/products');
};
export const addNewProduct = async (productDetails) => {
   const header = { 'subscription': "", 'Content-Type': 'multipart/form-data' }
   return await Api.postApi('/product', productDetails, header);
}
export const deleteProduct = async (productId) => {
   return await Api.deleteApi(`/product/${productId}`);
};



// categories
export const getAllCategories = async () => {
   return await Api.getApi('/categories');
};
export const addNewCategory = async (categoryDetails) => {
   const header = { 'subscription': "", 'Content-Type': 'multipart/form-data' }
   return await Api.postApi('/category', categoryDetails, header);
}
export const deleteCategory = async (categoryId) => {
   return await Api.deleteApi(`/category/${categoryId}`);
}


// banners
export const getAllBanners = async () => {
   return await Api.getApi('/banner');
};
export const addNewBanner = async (bannerDetails) => {
   return await Api.postApi('/banner/createAndUpdate', bannerDetails);
}
export const deleteBanner = async (bannerId) => {
   return await Api.deleteApi(`/banner/${bannerId}`);
}


// users
export const getAllUsers = async () => {
   return await Api.getApi('/products');
};
export const addNewUser = async (userDetails) => {
   return await Api.postApi('/user', userDetails);
} 