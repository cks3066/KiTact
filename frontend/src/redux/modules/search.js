import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

// actions
const SET_RESTAURANT = 'SET_RESTAURANT'
const SET_COORDINATES = 'SET_COORDINATES'

// action creators
const setRestaurant = createAction(SET_RESTAURANT, input_data => ({ input_data }))
const setCoordinate = createAction(SET_COORDINATES, position => ({ position }))

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
    [SET_COORDINATES]: (state, action) =>
      produce(state, draft => {
        draft.searchResult.lng = action.payload.position.x
        draft.searchResult.lat = action.payload.position.y
      }),
  },
  initialState
)

// action creator export
const actionCreators = {
  setRestaurant,
  setCoordinate,
}

export { actionCreators }
