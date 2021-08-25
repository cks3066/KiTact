import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

// actions
const USER_INPUT_SEARCH = 'USER_INPUT_SEARCH'
const GET_SEARCH_RESULT = 'GET_SEARCH_RESULT'

// action creators
const setSearchInput = createAction(USER_INPUT_SEARCH, input => ({ input }))
const getSearchResult = createAction(GET_SEARCH_RESULT, searchResult => ({ searchResult }))

// initialState
const initialState = {
  input: null,
  searchResult: {
    restaurant_name:"양이네",
    address: "서울특별시 노원구 중계2.3동",
    telephone: "031-1234-5678",
    openinghours: "오전 10시-오후10시",
    big_category: "식당",
    small_category: "한식",
    lat: 120.1,
    lng: 120.2,
  },
}

// reducer
export default handleActions(
  {
    [USER_INPUT_SEARCH]: (state, action) =>
      produce(state, draft => {
        draft.input = action.payload.input;
      }),
    [GET_SEARCH_RESULT]: (state, action) =>
      produce(state, draft => {
          draft.searchResult.restaurant_name.push(action.searchResult.restaurant_name);
      }),
  },
  initialState
)

// action creator export
const actionCreators = {
    
}

export { actionCreators }