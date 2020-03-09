import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICategory, defaultValue } from 'app/shared/model/category.model';
import categories from './categories';

export const ACTION_TYPES = {
  FETCH_CATEGORIES: 'categories/FETCH_CATEGORIES',
  FETCH_CATEGORY: 'categories/FETCH_CATEGORY',
  CREATE_CATEGORY: 'categories/CREATE_CATEGORY',
  UPDATE_CATEGORY: 'categories/UPDATE_CATEGORY',
  DELETE_CATEGORY: 'categories/DELETE_CATEGORY',
  RESET: 'categories/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  categories: [] as ReadonlyArray<ICategory>,
  category: defaultValue,
  parent: defaultValue.parent,
  updating: false,
  updateSuccess: false,
  totalItems: 0
};

export type CategoriesState = Readonly<typeof initialState>;

// Reducer
export default (state: CategoriesState = initialState, action): CategoriesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIES):
    case REQUEST(ACTION_TYPES.FETCH_CATEGORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CATEGORY):
    case REQUEST(ACTION_TYPES.UPDATE_CATEGORY):
    case REQUEST(ACTION_TYPES.DELETE_CATEGORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIES):
    case FAILURE(ACTION_TYPES.FETCH_CATEGORY):
    case FAILURE(ACTION_TYPES.CREATE_CATEGORY):
    case FAILURE(ACTION_TYPES.UPDATE_CATEGORY):
    case FAILURE(ACTION_TYPES.DELETE_CATEGORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORIES):
      return {
        ...state,
        loading: false,
        categories: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORY):
      return {
        ...state,
        loading: false,
        category: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CATEGORY):
    case SUCCESS(ACTION_TYPES.UPDATE_CATEGORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        category: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CATEGORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        category: defaultValue
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'category';
// Actions
export const getCategories: ICrudGetAllAction<ICategory> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/list/${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  /* eslint-disable no-console */
  console.log(requestUrl);
  return {
    type: ACTION_TYPES.FETCH_CATEGORIES,
    payload: axios.get<ICategory>(requestUrl)
  };
};

export const getCategory: ICrudGetAction<ICategory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  /* eslint-disable no-console */
  console.log(requestUrl);
  return {
    type: ACTION_TYPES.FETCH_CATEGORY,
    payload: axios.get<ICategory>(requestUrl)
  };
};

export const createCategory: ICrudPutAction<ICategory> = category => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CATEGORY,
    payload: axios.post(apiUrl, category)
  });
  dispatch(getCategories());
  return result;
};

export const updateCategory: ICrudPutAction<ICategory> = category => async dispatch => {
  /* eslint-disable no-console */
  console.log(category);
  const requestUrl = `${apiUrl}/${category._id}`;
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CATEGORY,
    payload: axios.put(requestUrl, category)
  });
  dispatch(getCategories());
  return result;
};

export const deleteCategory: ICrudDeleteAction<ICategory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CATEGORY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getCategories());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
