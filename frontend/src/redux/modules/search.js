import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

// actions
const SET_RESTAURANT = 'SET_RESTAURANT'
const GET_RESTAURANT = 'GET_RESTAURANT'

// action creators
const setRestaurant = createAction(SET_RESTAURANT, input_data => ({ input_data }))

// initialState
const initialState = {
  input: null,
  searchResult: {
    address: '',
    closetime: null,
    detail: '',
    holiday: null,
    img: null,
    large_category: '',
    lat: 0,
    lng: 0,
    medium_category: '',
    opentime: null,
    owner: null,
    restaurant_name: ' ',
    small_category: '',
    tags: null,
    tel: '',
    total_seat_count: null,
    vacancy_count: null,
  },
}

// reducer
export default handleActions(
  {
    [SET_RESTAURANT]: (state, action) =>
      produce(state, draft => {
        draft.searchResult = action.payload.input_data
      }),
  },
  initialState
)

// action creator export
const actionCreators = {
  setRestaurant,
}

export { actionCreators }
