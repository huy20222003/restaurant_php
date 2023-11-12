import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initCategoryState,
  reducer,
} from '../Reducers/CategoryReducer/reducer';
import {
  getAll,
  getOne,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../Reducers/CategoryReducer/action';
//api
import categoryApi from '../Service/categoryApi';
//context
import { useProduct } from '../hooks/context';
//---------------------------------------------------------------

export const CategoryContext = createContext();

export const CategoryProvider = (prop) => {
  const [categoryState, dispatch] = useReducer(reducer, initCategoryState);
  const { handleGetAllProducts } = useProduct();

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handleGetAllCategory = useCallback(async () => {
    try {
      const response = await categoryApi.getAll();
      if (response.data.success) {
        dispatch(getAll(response.data.categories));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleGetOneCategory = useCallback(async (categoryId) => {
    try {
      const response = await categoryApi.getOne(categoryId);
      if (response.data.success) {
        dispatch(getOne(response.data.category));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleCreateCategory = useCallback(async (category) => {
    try {
      const response = await categoryApi.createCategory(category);
      if (response.data.success) {
        dispatch(createCategory(response.data.category));
      }
      await handleGetAllCategory();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, [handleGetAllCategory]);

  const handleUpdateCategory = useCallback(async (categoryId, data) => {
    try {
      const response = await categoryApi.updateCategory(categoryId, data);
      if (response.data.success) {
        dispatch(updateCategory(response.data.category));
      }
      await handleGetAllCategory();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, [handleGetAllCategory]);

  const handleDeleteCategory = useCallback(async (categoryId) => {
    try {
      const response = await categoryApi.deleteCategory(categoryId);
      if (response.data.success) {
        dispatch(deleteCategory(categoryId));
      }
      await handleGetAllCategory();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, [handleGetAllCategory]);

  const handleAddProductToCategory = useCallback(
    async (data) => {
      try {
        const response = await categoryApi.addProductToCategory(data);
        if (response.data.success) {
          await handleGetAllProducts();
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleGetAllProducts]
  );

  const CategoryData = {
    categoryState,
    handleGetAllCategory,
    handleGetOneCategory,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleAddProductToCategory,
  };

  return (
    <CategoryContext.Provider value={CategoryData}>
      {prop.children}
    </CategoryContext.Provider>
  );
};
