import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'

import User from './modules/user'

// 리덕스 모듈 등록
import Restaurant from './modules/restaurant'

// 컴포넌트 이동 경로: ex) 뒤로가기
export const history = createBrowserHistory()

// reducer에서 history 사용
const rootReducer = combineReducers({
  restaurant: Restaurant,
  user: User,
  router: connectRouter(history),
})

// axios → then → history 절차적 경로 제공
// 새로운 미들웨어 추가는 여기서
const middlewares = [thunk.withExtraArgument({ history: history })]

// 현재 환경 정의
const env = process.env.NODE_ENV

// 개발환경 한정으로 로거를 가져와서 사용
if (env === 'development') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

// 리덕스 개발자 도구 설정
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

// 미들웨어에 리덕스 개발자 도구 적용
const enhancer = composeEnhancers(applyMiddleware(...middlewares))

let store = initialStore => createStore(rootReducer, enhancer)

export default store()