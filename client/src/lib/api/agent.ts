import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

agent.interceptors.response.use(async (response) => {
  store.uiStore.isBusy();
  return response;
});

agent.interceptors.response.use(
  async (response) => {
    store.uiStore.isIdle();

    return response;
  },
  async (error) => {
    await sleep(1000);
    store.uiStore.isIdle();

    const { status } = error.response;
    console.log(status);

    switch (status) {
      case 400:
        toast.error("Bad Request");
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 404:
        toast.error("Not Found");
        break;
      case 500:
        toast.error("Server Error");
        break;
    }

    return Promise.reject(error);
  }
);

export default agent;
