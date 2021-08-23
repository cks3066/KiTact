<<<<<<< HEAD
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import menu from "./modules/menu";
import User from "./modules/user";
=======
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
>>>>>>> f8fc3fe58beebecc9c1b083b9e956716429c1795

// 리덕스 모듈 등록
import Restaurant from "./modules/restaurant";

// 컴포넌트 이동 경로: ex) 뒤로가기
export const history = createBrowserHistory();

<<<<<<< HEAD
const rootReducer = combineReducers({
    menu,
    user: User,
    router: connectRouter(history),
  });

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

=======
// reducer에서 history 사용
const rootReducer = combineReducers({
  restaurant: Restaurant,
  router: connectRouter(history),
});

// axios → then → history 절차적 경로 제공
// 새로운 미들웨어 추가는 여기서
const middlewares = [thunk.withExtraArgument({ history: history })];

// 현재 환경 정의
const env = process.env.NODE_ENV;

// 개발환경 한정으로 로거를 가져와서 사용
>>>>>>> f8fc3fe58beebecc9c1b083b9e956716429c1795
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

<<<<<<< HEAD
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

=======
// 리덕스 개발자 도구 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// 미들웨어에 리덕스 개발자 도구 적용
>>>>>>> f8fc3fe58beebecc9c1b083b9e956716429c1795
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
