import { StoreActionType } from "../actions/store.action";
import { MethodEnum } from "../data/enums/method.enum";

export type StoreState = {
  stores: any;
  currentStore: any;
  currentMethod?: MethodEnum | null;
  menu: any;
};

const initialState: StoreState = {
  stores: null,
  currentStore: null,
  currentMethod: null,
  menu: null,
};

function storeReducer(
  storeState = initialState,
  action: { type: StoreActionType; payload: StoreState }
) {
  const { type, payload } = action;

  switch (type) {
    case "SET_ALL_STORES":
      return { ...storeState, ...payload };

    case "SET_MENU":
      return { ...storeState, payload };

    case "SET_CURRENT_STORE":
      return { ...storeState, payload };

    case "SET_CURRENT_METHOD":
      return { ...storeState, payload };

    case "ISSTOREOPEN":
      return [];

    default:
      return storeState;
  }
};

export default storeReducer;
