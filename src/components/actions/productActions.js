import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CHANGE_FILTER,
  ON_INIT_FUNCTION,
  ACTIVATE_DEACTIVATE,
  ACTIVATE_DEACTIVATE_FILTER,
} from "./action-types/product-actions";

//add cart action
export const initFunction = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: ON_INIT_FUNCTION,
    });
  };
};
export const changeFilter = (value, selectedValue) => {
  return async (dispatch, getState) => {
    const state = getState();
    let filteredProducts = [];

    if (value.length > 0 || selectedValue.length > 0) {
      filteredProducts = state.items.filter((each) => {
        if (selectedValue !== "select_activation") {
          return (
            (each.nameEng.includes(value) || each.nameArb.includes(value)) &&
            each.activation === selectedValue
          );
        } else {
          return each.nameEng.includes(value) || each.nameArb.includes(value);
        }
      });
    } else {
      filteredProducts = state.items;
    }

    dispatch({
      type: CHANGE_FILTER,
      filteredProducts,
    });
  };
};
/////////////delete item (product)///////
export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const state = getState();

    let filtered_newItems = [];
    if (
      state.fitlteredItems.length > 0 &&
      state.fitlteredItems !== state.items
    ) {
      filtered_newItems = state.fitlteredItems.filter((item) => id !== item.id);
    }
    let new_items = state.items.filter((item) => id !== item.id);

    dispatch({
      type: DELETE_PRODUCT,
      items: new_items,
      fitlteredItems: filtered_newItems,
    });
  };
};

//// activate deactivate function ////
export const activateDeactivate = (id, status) => {
  return async (dispatch, getState) => {
    const state = getState();

    if (
      state.fitlteredItems.length > 0 &&
      state.fitlteredItems !== state.items
    ) {
      const index = state.items.findIndex((item) => item.id === parseInt(id));
      const filterIndex = state.fitlteredItems.findIndex(
        (item) => item.id === parseInt(id)
      );
      let statusValue = null;
      if (status === "true") {
        statusValue = "false";
      } else {
        statusValue = "true";
      }

      let items = [...state.items]; // important to create a copy, otherwise you'll modify state outside of setState call
      items[index] = {
        ...items[index],
        activation: statusValue,
      };
      let fitlteredItems = [...state.fitlteredItems]; // important to create a copy, otherwise you'll modify state outside of setState call
      fitlteredItems[filterIndex] = {
        ...fitlteredItems[filterIndex],
        activation: statusValue,
      };

      dispatch({
        type: ACTIVATE_DEACTIVATE_FILTER,
        fitlteredItems: fitlteredItems,
        items: items,
      });
    } else {
      const index = state.items.findIndex((item) => item.id === parseInt(id));
      let statusValue = null;
      if (status === "true") {
        statusValue = "false";
      } else {
        statusValue = "true";
      }

      let items = [...state.items]; // important to create a copy, otherwise you'll modify state outside of setState call
      items[index] = {
        ...items[index],
        activation: statusValue,
      };
      dispatch({
        type: ACTIVATE_DEACTIVATE,
        items: items,
      });
    }
  };
};
////// edit product /////

export const editProduct = (formValues) => {
  return async (dispatch, getState) => {
    const state = getState();

    const index = state.items.findIndex(
      (item) => item.id === parseInt(formValues.id)
    );

    let items = [...state.items]; // important to create a copy, otherwise you'll modify state outside of setState call
    items[index] = {
      ...items[index],
      nameEng: formValues.nameEng,
      nameArb: formValues.nameArb,
      activation: formValues.activation,
      img: formValues.img,
    };
    dispatch({
      type: EDIT_PRODUCT,
      items: items,
    });
  };
};
////// ADD PRODUCT /////
export const addProduct = (formValues) => {
  return async (dispatch, getState) => {
    const state = getState();
    let updatedItems = state.items;
    let addedItem = [
      {
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        nameEng: formValues["nameEng"],
        nameArb: formValues["nameArb"],
        activation: formValues["activation"],
        img: formValues["img"],
      },
    ];
    //check if the action id exists in the addedItems
    // updatedItems = state.items.concat(addedItem);
    updatedItems = addedItem.concat(state.items);
    dispatch({
      type: ADD_PRODUCT,
      items: updatedItems,
    });
  };
};
