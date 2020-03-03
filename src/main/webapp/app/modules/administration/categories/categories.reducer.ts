import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICategory, defaultValue } from 'app/shared/model/category.model';

export const ACTION_TYPES = {
  FETCH_CATEGORIES: 'categories/FETCH_CATEGORIES'
};

const initialState = {
  loading: false,
  errorMessage: null,
  categories: [] as ReadonlyArray<ICategory>,
  authorities: [] as any[],
  category: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0
};

export type CategoriesState = Readonly<typeof initialState>;

// Reducer
export default (state: CategoriesState = initialState, action): CategoriesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIES):
      return {
        ...state
      };
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIES):
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
    default:
      return state;
  }
};

const apiUrl = 'category';
// Actions
export const getCategories: ICrudGetAllAction<ICategory> = (page, size, sort) => {
  /* const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`; */
  return {
    type: ACTION_TYPES.FETCH_CATEGORIES,
    payload: axios.get<ICategory>(apiUrl)
  };
};
