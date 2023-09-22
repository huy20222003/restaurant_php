import { createContext, useCallback, useEffect, useReducer } from 'react';
import { initCategoryState, reducer } from '../Reducers/CategoryReducer/reducer';
import { getAll, getOne, createCategory, updateCategory, deleteCategory } from '../Reducers/CategoryReducer/action';
import categoryApi from '../Service/categoryApi';

export const CategoryContext = createContext();

export const CategoryProvider = (prop) => {
  const [categoryState, dispatch] = useReducer(reducer, initCategoryState);

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

  useEffect(() => {
    if(window.location.href.includes('admin')) {
      handleGetAllCategory();
    }
  }, [handleGetAllCategory]);

  const handleGetOneCategory = useCallback(async(categoryId)=> {
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

  const handleCreateCategory = useCallback(async (category)=> {
    try {
      const response = await categoryApi.createCategory(category);
      if (response.data.success) {
        dispatch(createCategory(response.data.category));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleUpdateCategory = useCallback(async (categoryId, data)=> {
    try {
      const response = await categoryApi.updateCategory(categoryId, data);
      if (response.data.success) {
        dispatch(updateCategory(response.data.category));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleDeleteCategory = useCallback(async(categoryId)=> {
      try {
        const response = await categoryApi.deleteCategory(categoryId);
        if (response.data.success) {
          dispatch(deleteCategory(categoryId));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
  }, []);


  const CategoryData = {
    categoryState,
    handleGetAllCategory,
    handleGetOneCategory,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  };

  return (
    <CategoryContext.Provider value={CategoryData}>
      {prop.children}
    </CategoryContext.Provider>
  );
};
