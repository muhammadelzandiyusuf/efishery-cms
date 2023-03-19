import actionType from './actionType';
import { updateObject } from '@/utils/updateObject';

const initialState = {
  showMenu: false,
};

const toggleMenu = (state, action) => {
  return updateObject(state, {
    showMenu: action.data,
  });
};

const toggleMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TOGGLE_MENU:
      return toggleMenu(state, action);
    default:
      return state;
  }
};

export default toggleMenuReducer;
