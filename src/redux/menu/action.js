import actionType from './actionType';

export const toggleMenu = (menu) => ({
  type: actionType.TOGGLE_MENU,
  data: menu,
});
