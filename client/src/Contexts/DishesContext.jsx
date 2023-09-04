import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { initDishesState, reducer } from '../Reducers/DishesReducer/reducer';
import {
  createDish,
  deleteDish,
  getAll,
  getOne,
  setPage,
} from '../Reducers/DishesReducer/action';
import dishApi from '../Service/dishApi';

export const DishesContext = createContext();

export const DishesProvider = (prop) => {
  const [dishesState, dispatch] = useReducer(reducer, initDishesState);
  const [currentPage, setCurrentPage] = useState(1);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleGetAllDishes = useCallback(async () => {
    const pageSize = 30;
    try {
      const response = await dishApi.getAll(currentPage, pageSize);
      if (response.data.success) {
        dispatch(getAll(response.data.dishes));
        const pageData = {
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
        };
        dispatch(setPage(pageData));
      }
    } catch (error) {
      return handleError(error);
    }
  }, [currentPage]);

  useEffect(() => {
    handleGetAllDishes();
  }, [handleGetAllDishes]);

  const handleGetOneDish = useCallback(async (dishId) => {
    try {
      const response = await dishApi.getOne(dishId);
      if (response.data.success) {
        dispatch(getOne(response.data.dish));
        sessionStorage.setItem('dish', JSON.stringify(response.data.dish));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleCreateDish = useCallback(async (dish) => {
    try {
      const response = await dishApi.createDish(dish);
      if (response.data.success) {
        dispatch(createDish(response.data.dish));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleDeleteDish = useCallback(async (dishId) => {
    try {
      const response = await dishApi.deleteDish(dishId);
      if (response.data.success) {
        dispatch(deleteDish(dishId));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const DishesData = {
    dishesState,
    handleGetAllDishes,
    handlePageChange,
    currentPage,
    handleGetOneDish,
    handleCreateDish,
    handleDeleteDish,
  };

  return (
    <DishesContext.Provider value={DishesData}>
      {prop.children}
    </DishesContext.Provider>
  );
};
