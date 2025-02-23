import axios from "axios";

export const BaseUrl = "";

export const storage_key__admin_token = "admin_access_token";

export const Client = {
      admin: () => intClient(storage_key__admin_token),
      noAuth: axios.create({ baseURL: BaseUrl }),
};

function intClient(tokenKey: string) {
      let token = localStorage.getItem(tokenKey);
      if (!token) token = localStorage.getItem(tokenKey);
      return axios.create({
            baseURL: BaseUrl,
            headers: {
                  Authorization: "Bearer " + token,
            },
      });
}
