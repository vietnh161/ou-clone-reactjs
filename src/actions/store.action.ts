import { MethodEnum } from "../data/enums/method.enum";

export type StoreActionType =
  | "SET_CURRENT_STORE"
  | "SET_CURRENT_METHOD"
  | "SET_ALL_STORES"
  | "ISSTOREOPEN"
  | "SET_MENU";

const setCurrentStore = (
  currentStore: any
): { type: StoreActionType; payload?: any } => {
  return {
    type: "SET_CURRENT_STORE",
    payload: { currentStore },
  };
};

const setCurrentMethod = (
  currentMethod: MethodEnum
): { type: StoreActionType; payload?: any } => {
  return {
    type: "SET_CURRENT_METHOD",
    payload: { currentMethod },
  };
};

const isStoreOpen = (): { type: StoreActionType; payload?: any } => {
  return {
    type: "ISSTOREOPEN",
  };
};

const setMenu = (menu: any): { type: StoreActionType; payload?: any } => {
  return {
    type: "SET_MENU",
    payload: { menu },
  };
};

const setAllStores = (
  stores: any
): { type: StoreActionType; payload?: any } => {
  return {
    type: "SET_ALL_STORES",
    payload: { stores },
  };
};

export default {
  setCurrentStore,
  setAllStores,
  setCurrentMethod,
  isStoreOpen,
  setMenu,
};
