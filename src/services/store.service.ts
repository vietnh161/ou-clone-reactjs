import axios from "axios";

class StoreService {
  getStores() {
    return axios.get("api/stores/getStores");
  }

  getMenu(storeId: number, method?: number) {
    const url = method ? `${String(storeId)}/${method}` : String(storeId);
    return axios.get('menu/:store_id/get-menu?'.replace(":store_id", url));
  }

  isStoreOpen(body: any) {
    return axios.post("api/stores/isstoreopen", body);
  }
}

export default new StoreService();
