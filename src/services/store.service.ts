import axios from "axios";
import moment from "moment";
import { MethodEnum, methodKeys } from "../data/enums/method.enum";

export const DayOfWeekMini = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
export const OrderMethodMini = ['empty', 'pick', 'del', 'dine', 'room'];
class StoreService {
  getStores() {
    return axios.get("/api/stores/getStores");
  }

  getMenu(storeId: number, method?: number) {
    const url = method ? `${String(storeId)}/${method}` : String(storeId);
    return axios.get("menu/:store_id/get-menu?".replace(":store_id", url));
  }

  isStoreOpen(body: any) {
    return axios.post("api/stores/isstoreopen", body);
  }

  isStoreAvailable(store: any) {
    let count = 0;
    for (const key in methodKeys) {
      count = this.isMethodAvailable(store, +key) ? count : count + 1;
    }
    return count === 4 ? false : true;
  }

  isMethodAvailable(store: any, method: MethodEnum | number) {
    return store[`${methodKeys[method].key}_available`];
  }

  getMethodTimeOut(method: number, day: any, store: any) {
    let hourLabel = `${DayOfWeekMini[day]}_${OrderMethodMini[method]}_prep_hours`;
    let minsLabel = `${DayOfWeekMini[day]}_${OrderMethodMini[method]}_prep_mins`;
    let time = `${
      !!store[hourLabel]
        ? `${store[hourLabel]} hr${store[hourLabel] > 1 ? "s" : ""}`
        : ""
    } ${
      !!store[minsLabel]
        ? `${store[minsLabel]} min${store[minsLabel] > 1 ? "s" : ""}`
        : ""
    }`;
    return !!time.trim() ? ` ` + time : "";
  }

  getOnlineHour(item: any) {
    if(!item){
      return '';
    }
    if (item.status === 0 ) {
      return 'Closed';
    } else {
      return `${this.getHourFormat(item.hoursSt)} — ${this.getHourFormat(item.hoursEn)}`;
    }
  };
  

  
  getHourFormat(hour: string) {
    return moment(hour, 'HH:mm:ss').format('hh:mm a');
  };
}

export default new StoreService();
