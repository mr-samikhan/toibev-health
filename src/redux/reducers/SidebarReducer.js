import produce from "immer";

const initialstate = {
  toggle: false,
};

const SidebarReducer = produce((state = initialstate, action) => {
  switch (action.type) {
    case "TOGGLESIDEBAR": {
      state.toggle = !state.toggle;
      return state;
    }

    default:
      return state;
  }
});

export default SidebarReducer;
