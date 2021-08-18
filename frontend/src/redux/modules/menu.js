const LOAD = "menu/LOAD";
const CREATE = "menu/CREATE";
const CALCULATE = "menu/CALCULATE";
const INCREMENT = "menu/INCREMENT";
const DECREMENT = "menu/DECREMENT";

const initialState = {
  list: [
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

export const loadMenu = (menu) => {
  return { type: LOAD };
};

export const createMenu = (menu) => {
  return { type: CREATE, menu };
};

export const calculate = (menu_flag) => {
  return { type: CALCULATE, menu_flag };
};

export const increment = (index) => ({
  type: INCREMENT,
  index,
});

export const decrement = (index) => ({
  type: DECREMENT,
  index,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "menu/LOAD": {
      return state;
    }
    case "menu/CREATE": {
      const new_menu_list = [...state.list, action.menu];
      return { list: new_menu_list };
    }
    case "menu/CALCULATE": {
      state.list.find((l) => l.id === action.menu_flag.id).active =
        !action.menu_flag.active;
      const price = state.list
        .filter((m) => m.active)
        .map((m) => m.price * m.quantity)
        .reduce((a, b) => a + b, 0);
      return { ...state, total_price: price };
    }
    case "menu/INCREMENT":
      console.log(action);
      action.index--;
      return {
        ...state,
        list: [
          ...state.list.slice(0, action.index),
          {
            ...state.list[action.index],
            quantity: state.list[action.index].quantity + 1,
          },
          ...state.list.slice(action.index + 1, state.list.length),
        ],
      };

    case "menu/DECREMENT":
      console.log(action);
      action.index--;
      return {
        ...state,
        list: [
          ...state.list.slice(0, action.index),
          {
            ...state.list[action.index],
            quantity:
              state.list[action.index].quantity === 0
                ? 0
                : state.list[action.index].quantity - 1,
          },
          ...state.list.slice(action.index + 1, state.list.length),
        ],
      };
    default:
      return state;
  }
}
