import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

const category = [
  {
    id: 1,
    text: '식당',
    list: [
      {
        id: 1,
        text: '한식',
        list: [
          { id: 1, text: '백반' },
          { id: 2, text: '찌개' },
          { id: 3, text: '정식' },
          { id: 4, text: '족발/보쌈' },
        ],
      },
      {
        id: 2,
        text: '양식',
        list: [
          { id: 1, text: '치킨' },
          { id: 2, text: '피자' },
          { id: 3, text: '햄버거' },
        ],
      },
      {
        id: 3,
        text: '중식',
        list: [
          { id: 1, text: '중국집' },
          { id: 2, text: '코스요리' },
          { id: 3, text: '짬뽕 전문' },
        ],
      },
      {
        id: 4,
        text: '일식',
        list: [
          { id: 1, text: '돈까스' },
          { id: 2, text: '스시' },
          { id: 3, text: '초밥' },
        ],
      },
      {
        id: 5,
        text: '분식',
        list: [
          { id: 1, text: '도시락' },
          { id: 2, text: '야식' },
          { id: 3, text: '초밥' },
        ],
      },
    ],
  },
  {
    id: 2,
    text: '주점',
    list: [
      { id: 1, text: '감성주점' },
      { id: 2, text: '바/칵테일' },
      { id: 3, text: '포차' },
    ],
  },
  {
    id: 3,
    text: '카페/디저트',
    list: [
      { id: 1, text: '케익' },
      { id: 2, text: '커피' },
      { id: 3, text: '마카롱' },
    ],
  },
]

const initialState = {
  category: category,
  info: {
    id: 'asdfqwer',
    large_category: '식당',
    midium_category: '양식',
    small_category: '치킨',
    name: '키택트 치킨',
    img: 'https://likerdo-bucket-list.s3.ap-northeast-2.amazonaws.com/%EC%B9%98%ED%82%A8%EC%A7%91.jpg',
    address: '서울특별시 구로구 오류동 1234',
    tel: '123-1234',
    time: '15:00 ~ 23:00',
    detail: '치킨과 생맥주가 맛있는 키택트 치킨으로 놀러오세요!!! 방역 철저 준수',
    tags: ['데이트코스', '맛집', '먹방', '치킨은안쪄'],
    total_seat_count: 15,
    vacancy_count: 3,
    owner: '홍길동',
    seats_rull: [
      { id: 1, type: 'seat', icon: '🙋‍♂️', text: '1명' },
      { id: 2, type: 'seat', icon: '👨‍❤️‍👨', text: '2명' },
      { id: 3, type: 'seat', icon: '👨‍👩‍👧', text: '3명' },
      { id: 4, type: 'seat', icon: '👨‍👩‍👧‍👧', text: '4명' },
      { id: 5, type: 'door', icon: '🚪', text: '출입구' },
      { id: 6, type: 'checkout', icon: '💰', text: '계산대' },
      { id: 7, type: 'kitchen', icon: '👩‍🍳', text: '주방' },
      { id: 8, type: 'toilet', icon: '🚽', text: '화장실' },
      { id: 9, type: 'window', icon: '👓', text: '창가' },
      { id: 10, type: 'vacancy', icon: '🍴', text: '공석' },
      { id: 11, type: 'full', icon: '🍽', text: '이용중' },
    ],
    seat_edit_toggle: false,
    seats: [
      {
        id: 1,
        type: 'seat',
        icon: '👨‍👩‍👧',
        x: 566,
        y: 89,
        people: 3,
        vacancy: true,
        client: '',
      },
      {
        id: 2,
        type: 'seat',
        icon: '👨‍👩‍👧‍👧',
        x: 566,
        y: 310,
        people: 4,
        vacancy: true,
        client: '',
      },
      {
        id: 3,
        type: 'seat',
        icon: '🙋‍♂️',
        x: 384,
        y: 89,
        people: 1,
        vacancy: false,
        client: 'Henrietta',
      },
      {
        id: 4,
        type: 'seat',
        icon: '👨‍❤️‍👨',
        x: 189,
        y: 95,
        people: 2,
        vacancy: false,
        client: 'Leavitt',
      },
      {
        id: 5,
        type: 'seat',
        icon: '👨‍❤️‍👨',
        x: 383,
        y: 310,
        people: 2,
        vacancy: true,
        client: '',
      },
      {
        id: 6,
        type: 'seat',
        icon: '👨‍👩‍👧',
        x: 194,
        y: 310,
        people: 3,
        vacancy: true,
        client: '',
      },
      { id: 7, type: 'door', icon: '🚪', x: 11, y: 10 },
      { id: 8, type: 'checkout', icon: '💰', x: 16, y: 150 },
      { id: 9, type: 'kitchen', icon: '👩‍🍳', x: 708, y: 395 },
      { id: 10, type: 'toilet', icon: '🚽', x: 817, y: 50 },
      { id: 11, type: 'window', icon: '👓', x: 400, y: 10 },
    ],
  },
  menu_list: [
    {
      id: 1,
      src: 'http://www.kyochon.com/uploadFiles/TB_ITEM/%EB%B8%8C%EB%9E%9C%EB%93%9C_list_15-10-221047(3).png',
      name: '후라이드 치킨',
      price: 15000,
      active: false,
      quantity: 0,
    },
    {
      id: 2,
      src: 'http://www.kyochon.com/uploadFiles/TB_ITEM/%EB%A0%88%EB%93%9C%EC%88%9C%EC%82%B4r(2).png',
      name: '양념 치킨',
      price: 16000,
      active: false,
      quantity: 0,
    },
    {
      id: 3,
      src: 'http://www.kyochon.com/uploadFiles/TB_ITEM/%EB%B8%8C%EB%9E%9C%EB%93%9C_list_15-10-221025.png',
      name: '간장 치킨',
      price: 16000,
      active: false,
      quantity: 0,
    },
    {
      id: 4,
      src: 'http://www.kyochon.com/uploadFiles/TB_ITEM/%EB%B8%8C%EB%9E%9C%EB%93%9C_list_15-10-221035.png',
      name: '마늘 치킨',
      price: 17000,
      active: false,
      quantity: 0,
    },
  ],
  total_price: 0,
}

const LOAD = 'LOAD'
const CREATE = 'CREATE'
const CALCULATE_TOTAL_PRICE = 'CALCULATE_TOTAL_PRICE'
const INCREMENT_MENU_QUANTITY = 'INCREMENT_MENU_QUANTITY'
const DECREMENT_MENU_QUANTITY = 'DECREMENT_MENU_QUANTITY'
const ADD_TAG = 'ADD_TAG'
const REMOVE_TAG = 'REMOVE_TAG'
const SEAT_EDIT_TOGGLE = 'SEAT_EDIT_TOGGLE'
const ADD_SEAT = 'ADD_SEAT'
const UPDATE_SEAT = 'UPDATE_SEAT'
const REMOVE_SEAT = 'REMOVE_SEAT'
const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
const UPDATE_CATEGORY = `UPDATE_CATEGORY`
const UPDATE_INFO = 'UPDATE_INFO'
const ADD_MENU = 'ADD_MENU'

const load = createAction(LOAD, restaurant => ({ restaurant }))
const creat = createAction(CREATE, restaurant => ({ restaurant }))
const calculateTotalPrice = createAction(CALCULATE_TOTAL_PRICE, id => ({
  id,
}))
const incrementMenuQuantity = createAction(INCREMENT_MENU_QUANTITY, id => ({
  id,
}))
const decrementMenuQuantity = createAction(DECREMENT_MENU_QUANTITY, id => ({
  id,
}))
const addTag = createAction(ADD_TAG, tag_value => ({ tag_value }))
const removeTag = createAction(REMOVE_TAG, tag_value => ({ tag_value }))
const seatEditToggle = createAction(SEAT_EDIT_TOGGLE, seat_edit_toggle => ({
  seat_edit_toggle,
}))
const updateSeat = createAction(UPDATE_SEAT, seat_info => ({ seat_info }))
const addSeat = createAction(ADD_SEAT, id => ({ id }))
const removeSeat = createAction(REMOVE_SEAT, id => ({ id }))
const updateAddress = createAction(UPDATE_ADDRESS, address => ({ address }))
const updateCategory = createAction(UPDATE_CATEGORY, category_info => ({ category_info }))
const updateInfo = createAction(UPDATE_INFO, element => ({ element }))
const addMenu = createAction(ADD_MENU, menu => ({ menu }))

const calculateSeat = draft => {
  const vacancy_count = draft.info.seats
    .filter(seat => seat.type === 'seat' && seat.vacancy === false)
    .map(seat => seat.people)

  draft.info.vacancy_count =
    vacancy_count.length === 0 ? 0 : vacancy_count.reduce((first, second) => first + second)

  const total_seat_count = draft.info.seats
    .filter(seat => seat.type === 'seat')
    .map(seat => seat.people)

  draft.info.total_seat_count =
    total_seat_count.length === 0 ? 0 : total_seat_count.reduce((first, second) => first + second)
}

export default handleActions(
  {
    [LOAD]: (state, action) => produce(state, draft => {}),
    [CREATE]: (state, action) =>
      produce(state, draft => {
        draft.push(action.payload)
      }),
    [CALCULATE_TOTAL_PRICE]: (state, action) =>
      produce(state, draft => {
        draft.total_price = state.menu_list
          .map(m => m.price * m.quantity)
          .reduce((a, b) => a + b, 0)
      }),
    [INCREMENT_MENU_QUANTITY]: (state, action) =>
      produce(state, draft => {
        const id = action.payload.id--
        const menu = draft.menu_list.find(menu => menu.id === id)
        console.log(menu)
        menu.quantity++
        menu.active = true
      }),
    [DECREMENT_MENU_QUANTITY]: (state, action) =>
      produce(state, draft => {
        const id = action.payload.id--
        const menu = draft.menu_list.find(menu => menu.id === id)
        if (menu.quantity > 0) menu.quantity--
        if (menu.quantity === 0) menu.active = false
      }),
    [ADD_TAG]: (state, action) =>
      produce(state, draft => {
        draft.info.tags.push(action.payload.tag_value)
      }),
    [REMOVE_TAG]: (state, action) =>
      produce(state, draft => {
        draft.info.tags.splice(-1)
      }),
    [SEAT_EDIT_TOGGLE]: (state, action) =>
      produce(state, draft => {
        draft.info.seat_edit_toggle = !draft.info.seat_edit_toggle
      }),
    [UPDATE_SEAT]: (state, action) =>
      produce(state, draft => {
        const seat_info = action.payload.seat_info
        const seat = draft.info.seats.find(seat => seat.id === seat_info.id)
        seat.vacancy = seat_info.vacancy
        seat.x = seat_info.x
        seat.y = seat_info.y
        calculateSeat(draft)
      }),
    [ADD_SEAT]: (state, action) =>
      produce(state, draft => {
        const seat_rull = draft.info.seats_rull.find(seat => seat.id === action.payload.id)
        let seat = {
          id: draft.info.seats.length + 1,
          type: seat_rull.type,
          icon: seat_rull.icon,
          x: 100,
          y: 100,
        }
        seat_rull.type === 'seat'
          ? (seat = { ...seat, vacancy: true, people: seat_rull.id })
          : (seat = { ...seat })

        draft.info.seats.push(seat)
        calculateSeat(draft)
      }),
    [REMOVE_SEAT]: (state, action) =>
      produce(state, draft => {
        const index = draft.info.seats.findIndex(seat => seat.id === action.payload.id)
        if (index !== -1) draft.info.seats.splice(index, 1)
        calculateSeat(draft)
      }),
    [UPDATE_ADDRESS]: (state, action) =>
      produce(state, draft => {
        draft.info.address = action.payload.address
      }),
    [UPDATE_CATEGORY]: (state, action) =>
      produce(state, draft => {
        const text = action.payload.category_info.text
        switch (action.payload.category_info.category) {
          case 'large':
            draft.info.large_category = text
            break

          case 'midium':
            draft.info.midium_category = text
            break

          case 'small':
            draft.info.small_category = text
            break

          default:
            break
        }
      }),
    [UPDATE_INFO]: (state, action) =>
      produce(state, draft => {
        const value = action.payload.element.value
        switch (action.payload.element.target) {
          case 'name':
            draft.info.name = value
            break
          case 'img':
            draft.info.img = value
            break
          case 'tel':
            draft.info.tel = value
            break
          case 'time':
            draft.info.time = value
            break
          case 'detail':
            draft.info.detail = value
            break
          case 'owner':
            draft.info.owner = value
            break

          default:
            break
        }
      }),
    [ADD_MENU]: (state, action) =>
      produce(state, draft => {
        draft.menu_list.push({
          id: draft.menu_list.length + 1,
          src: 'http://www.kyochon.com/uploadFiles/TB_ITEM/%EB%B8%8C%EB%9E%9C%EB%93%9C_list_15-10-221047(3).png',
          name: action.menu.name,
          price: action.menu.price,
          active: false,
          quantity: 0,
        })
      }),
  },
  initialState
)

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
  addSeat,
  removeSeat,
  updateAddress,
  updateCategory,
  updateInfo,
  addMenu,
}

export { actionCreators }
