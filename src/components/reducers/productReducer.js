import Item1 from "../../images/item1.jpg";
import Item2 from "../../images/item2.jpg";
import Item3 from "../../images/item3.jpg";
import Item4 from "../../images/item4.jpg";
import Item5 from "../../images/item5.jpg";
import Item6 from "../../images/item6.jpg";

import {
  CHANGE_FILTER,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  ON_INIT_FUNCTION,
  ACTIVATE_DEACTIVATE,
  ACTIVATE_DEACTIVATE_FILTER,
} from "../actions/action-types/product-actions";

const initState = {
  items: [
    {
      id: 1,
      activation: "true",
      nameEng: "havan product1",
      nameArb: "هافان 1",
      img: Item1,
    },
    {
      id: 2,
      activation: "false",
      nameEng: "margherita product2",
      nameArb: "منتج 2",
      img: Item2,
    },
    {
      id: 3,
      activation: "true",
      nameEng: "bbq chicken product3",
      nameArb: "منتج قوي 3",
      img: Item3,
    },
    {
      id: 4,
      activation: "false",
      nameEng: "hawaiian product4",
      nameArb: "منتج 4",
      img: Item4,
    },
    {
      id: 5,
      activation: "true",
      nameEng: "cheese lovers product5",
      nameArb: "جزمه5",
      img: Item5,
    },
    {
      id: 6,
      activation: "false",
      nameEng: "sweet and chilli product6",
      nameArb: "منتج 6",
      img: Item6,
    },
    {
      id: 7,
      activation: "false",
      nameEng: "stuffed crust7",
      nameArb: "جزمه7",
      img: Item1,
    },
  ],
  addedItems: [],
  fitlteredItems: [],
  total: 0,
};
const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ON_INIT_FUNCTION:
      return {
        ...state,
        items: state.items,
      };

    case CHANGE_FILTER:
      return {
        ...state,
        fitlteredItems: action.filteredProducts,
      };
    case ADD_PRODUCT: {
      return {
        ...state,
        items: action.items,
      };
    }
    case ACTIVATE_DEACTIVATE_FILTER: {
      return {
        ...state,
        fitlteredItems: action.fitlteredItems,
        items: action.items,
      };
    }
    case ACTIVATE_DEACTIVATE: {
      return {
        ...state,
        items: action.items,
      };
    }
    case EDIT_PRODUCT: {
      return {
        ...state,
        items: action.items,
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        items: action.items,
        fitlteredItems: action.fitlteredItems,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
