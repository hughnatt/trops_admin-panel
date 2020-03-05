import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IAdvert, defaultValue } from 'app/shared/model/advert.model';

export const ACTION_TYPES = {
  FETCH_ADVERTS: 'adverts/FETCH_ADVERTS',
  FETCH_ADVERT: 'adverts/FETCH_ADVERT',
  CREATE_ADVERT: 'adverts/CREATE_ADVERT',
  UPDATE_ADVERT: 'adverts/UPDATE_ADVERT',
  DELETE_ADVERT: 'adverts/DELETE_ADVERT',
  RESET: 'adverts/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  adverts: [] as ReadonlyArray<IAdvert>,
  advert: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0
};

export type AdvertsState = Readonly<typeof initialState>;

// Reducer
export default (state: AdvertsState = initialState, action): AdvertsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ADVERTS):
    case REQUEST(ACTION_TYPES.FETCH_ADVERT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ADVERT):
    case REQUEST(ACTION_TYPES.UPDATE_ADVERT):
    case REQUEST(ACTION_TYPES.DELETE_ADVERT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ADVERTS):
    case FAILURE(ACTION_TYPES.FETCH_ADVERT):
    case FAILURE(ACTION_TYPES.CREATE_ADVERT):
    case FAILURE(ACTION_TYPES.UPDATE_ADVERT):
    case FAILURE(ACTION_TYPES.DELETE_ADVERT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ADVERTS):
      return {
        ...state,
        loading: false,
        adverts: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ADVERT):
      return {
        ...state,
        loading: false,
        advert: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ADVERT):
    case SUCCESS(ACTION_TYPES.UPDATE_ADVERT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        advert: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ADVERT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        advert: defaultValue
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'advert';
// Actions
export const getAdverts: ICrudGetAllAction<IAdvert> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  /* eslint-disable no-console */
  console.log(requestUrl);
  return {
    type: ACTION_TYPES.FETCH_ADVERTS,
    payload: axios.get<IAdvert>(requestUrl)
  };
};

export const getAdvert: ICrudGetAction<IAdvert> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  /* eslint-disable no-console */
  console.log(requestUrl);
  return {
    type: ACTION_TYPES.FETCH_ADVERT,
    payload: axios.get<IAdvert>(requestUrl)
  };
};

export const createAdvert: ICrudPutAction<IAdvert> = advert => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ADVERT,
    payload: axios.post(apiUrl, advert)
  });
  dispatch(getAdverts());
  return result;
};

export const updateAdvert: ICrudPutAction<IAdvert> = advert => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ADVERT,
    payload: axios.put(apiUrl, advert)
  });
  dispatch(getAdverts());
  return result;
};

export const deleteAdvert: ICrudDeleteAction<IAdvert> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ADVERT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getAdverts());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
