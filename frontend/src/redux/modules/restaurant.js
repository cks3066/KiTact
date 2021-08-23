import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const initialState = {
  info: {
    large_category: "식당",
    midium_category: "양식",
    small_category: "치킨",
    name: "키택트 치킨",
    img: "https://likerdo-bucket-list.s3.ap-northeast-2.amazonaws.com/%EC%B9%98%ED%82%A8%EC%A7%91.jpg",
    address: "서울특별시 구로구 오류동 1234",
    tel: "123-1234",
    time: "15:00 ~ 23:00",
    detail:
      "치킨과 생맥주가 맛있는 키택트 치킨으로 놀러오세요!!! 방역 철저 준수",
    tags: ["데이트코스", "맛집", "먹방", "치킨은안쪄"],
    total_seat_count: 15,
    vacancy_count: 5,
    seats_rull: [
      { id: 1, icon: "🙋‍♂️", text: "1명" },
      { id: 2, icon: "👨‍❤️‍👨", text: "2명" },
      { id: 3, icon: "👨‍👩‍👧", text: "3명" },
      { id: 4, icon: "👨‍👩‍👧‍👧", text: "4명" },
      { id: "vacancy", icon: "🍴", text: "공석" },
      { id: "full", icon: "🍽", text: "이용중" },
      { id: "door", icon: "🚪", text: "출입구" },
      { id: "checkout", icon: "💰", text: "계산대" },
      { id: "kitchen", icon: "👩‍🍳", text: "주방" },
      { id: "toilet", icon: "🚽", text: "화장실" },
      { id: "window", icon: "👓", text: "창가" },
    ],
    seat_edit_toggle: false,
    seats: [
      {
        id: 1,
        people: 3,
        icon: "👨‍👩‍👧",
        vacancy: true,
        x: 500,
        y: 100,
      },
      {
        id: 2,
        people: 4,
        icon: "👨‍👩‍👧‍👧",
        vacancy: true,
        x: 500,
        y: 200,
      },
      {
        id: 3,
        people: 1,
        icon: "🙋‍♂️",
        vacancy: false,
        x: 500,
        y: 300,
      },
      {
        id: 4,
        people: 2,
        icon: "👨‍❤️‍👨",
        vacancy: false,
        x: 194,
        y: 17,
      },
      {
        id: 5,
        people: 2,
        icon: "👨‍❤️‍👨",
        vacancy: true,
        x: 203,
        y: 116,
      },
      {
        id: 6,
        people: 3,
        icon: "👨‍👩‍👧",
        vacancy: true,
        x: 212,
        y: 217,
      },
      { id: "door", icon: "🚪", x: 55, y: -156 },
      { id: "checkout", icon: "💰", x: 81, y: 259 },
      { id: "kitchen", icon: "👩‍🍳", x: 360, y: 261 },
      { id: "toilet", icon: "🚽", x: 696, y: -20 },
      { id: "window", icon: "👓", x: 350, y: -275 },
    ],
  },
  menu_list: [
    {
      id: 1,
      src: "http://www.kyochon.com/uploadFiles/TB_ITEM/%EB%B8%8C%EB%9E%9C%EB%93%9C_list_15-10-221047(3).png",
      name: "후라이드 치킨",
      price: 15000,
      active: false,
      quantity: 0,
    },
    {
      id: 2,
      src: "http://www.kyochon.com/uploadFiles/TB_ITEM/%EB%A0%88%EB%93%9C%EC%88%9C%EC%82%B4r(2).png",
      name: "양념 치킨",
      price: 16000,
      active: false,
      quantity: 0,
    },
    {
      id: 3,
      src: "http://www.kyochon.com/uploadFiles/TB_ITEM/%EB%B8%8C%EB%9E%9C%EB%93%9C_list_15-10-221025.png",
      name: "간장 치킨",
      price: 16000,
      active: false,
      quantity: 0,
    },
    {
      id: 4,
      src: "http://www.kyochon.com/uploadFiles/TB_ITEM/%EB%B8%8C%EB%9E%9C%EB%93%9C_list_15-10-221035.png",
      name: "마늘 치킨",
      price: 17000,
      active: false,
      quantity: 0,
    },
  ],
  total_price: 0,
};

const LOAD = "LOAD";
const CREATE = "CREATE";
const CALCULATE_TOTAL_PRICE = "CALCULATE_TOTAL_PRICE";
const INCREMENT_MENU_QUANTITY = "INCREMENT_MENU_QUANTITY";
const DECREMENT_MENU_QUANTITY = "DECREMENT_MENU_QUANTITY";
const ADD_TAG = "ADD_TAG";
const REMOVE_TAG = "REMOVE_TAG";
const SEAT_EDIT_TOGGLE = "SEAT_EDIT_TOGGLE";
const UPDATE_SEAT = "UPDATE_SEAT";

const load = createAction(LOAD, (restaurant) => ({ restaurant }));
const creat = createAction(CREATE, (restaurant) => ({ restaurant }));
const calculateTotalPrice = createAction(CALCULATE_TOTAL_PRICE, (id) => ({
  id,
}));
const incrementMenuQuantity = createAction(INCREMENT_MENU_QUANTITY, (id) => ({
  id,
}));
const decrementMenuQuantity = createAction(DECREMENT_MENU_QUANTITY, (id) => ({
  id,
}));
const addTag = createAction(ADD_TAG, (tag_value) => ({ tag_value }));
const removeTag = createAction(REMOVE_TAG, (tag_value) => ({ tag_value }));
const seatEditToggle = createAction(SEAT_EDIT_TOGGLE, (seat_edit_toggle) => ({
  seat_edit_toggle,
}));
const updateSeat = createAction(UPDATE_SEAT, (seat_info) => ({ seat_info }));

export default handleActions(
  {
    [LOAD]: (state, action) => produce(state, (draft) => {}),
    [CREATE]: (state, action) =>
      produce(state, (draft) => {
        draft.push(action.payload);
      }),
    [CALCULATE_TOTAL_PRICE]: (state, action) =>
      produce(state, (draft) => {
        draft.total_price = state.menu_list
          .map((m) => m.price * m.quantity)
          .reduce((a, b) => a + b, 0);
      }),
    [INCREMENT_MENU_QUANTITY]: (state, action) =>
      produce(state, (draft) => {
        const id = action.payload.id--;
        const menu = draft.menu_list.find((menu) => menu.id === id);
        console.log(menu);
        menu.quantity++;
        menu.active = true;
      }),
    [DECREMENT_MENU_QUANTITY]: (state, action) =>
      produce(state, (draft) => {
        const id = action.payload.id--;
        const menu = draft.menu_list.find((menu) => menu.id === id);
        if (menu.quantity > 0) menu.quantity--;
        if (menu.quantity === 0) menu.active = false;
      }),
    [ADD_TAG]: (state, action) =>
      produce(state, (draft) => {
        draft.info.tags.push(action.payload.tag_value);
      }),
    [REMOVE_TAG]: (state, action) =>
      produce(state, (draft) => {
        draft.info.tags.splice(-1);
      }),
    [SEAT_EDIT_TOGGLE]: (state, action) =>
      produce(state, (draft) => {
        draft.info.seat_edit_toggle = !draft.info.seat_edit_toggle;
      }),
    [UPDATE_SEAT]: (state, action) =>
      produce(state, (draft) => {
        const seat_info = action.payload.seat_info;
        const seat = draft.info.seats.find((seat) => seat.id === seat_info.id);
        console.log("x", seat.x, "y", seat.y, "v", seat.vacancy);
        seat.vacancy = seat_info.vacancy;
        seat.x = seat_info.x;
        seat.y = seat_info.y;
        console.log("x", seat.x, "y", seat.y, "v", seat.vacancy);
      }),
  },
  initialState
);

const actionCreators = {
  load,
  creat,
  calculateTotalPrice,
  incrementMenuQuantity,
  decrementMenuQuantity,
  addTag,
  removeTag,
  seatEditToggle,
  updateSeat,
};

export { actionCreators };
