const DIALOG_SHOWED = 'DIALOG_SHOWED';
const HARDWARE_ITEM_DIALOG = 'HARDWARE_ITEM_DIALOG';
const NEW_CONFIG_DIALOG = 'NEW_CONFIG_DIALOG';
const EDIT_CONFIG_DIALOG = 'EDIT_CONFIG_DIALOG';
const PICKER_DIALOG = 'PICKER_DIALOG';

const initialState = {
  hardwareDialogIsShowed: false,
  hardwareItemDialogIsShowed: false,
  newConfigDialogIsShowed: false,
  editConfigDialogIsShowed: false,
  pickerDialogIsShowed: false,
};

//-------------------------DIALOG-------------------------//
export const dialogShowed = () => ({
  type: DIALOG_SHOWED,
});
//Not Used Yet
export const hardwareItemDialogShowed = (state) => ({
  type: HARDWARE_ITEM_DIALOG,
  state: state,
});

export const newConfigDialogShowed = (state) => ({
  type: NEW_CONFIG_DIALOG,
  state: state,
});

export const editConfigDialogShowed = (state) => ({
  type: EDIT_CONFIG_DIALOG,
  state: state,
});

export const pickerShowed = (state) => ({
  type: PICKER_DIALOG,
  state: state,
});

const DialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case DIALOG_SHOWED: {
      return {...state, hardwareDialogIsShowed: !state.hardwareDialogIsShowed};
    }
    case HARDWARE_ITEM_DIALOG: {
      return {...state, hardwareItemDialogIsShowed: action.state};
    }
    case NEW_CONFIG_DIALOG: {
      return {...state, newConfigDialogIsShowed: action.state};
    }
    case EDIT_CONFIG_DIALOG: {
      return {...state, editConfigDialogIsShowed: action.state};
    }
    case PICKER_DIALOG: {
      return {...state, pickerDialogIsShowed: action.state};
    }
    default:
      return state;
  }
};

export default DialogReducer;
