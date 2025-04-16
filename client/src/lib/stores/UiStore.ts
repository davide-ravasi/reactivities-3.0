import { makeAutoObservable } from "mobx";

export default class UiStore {
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  isBusy = () => {
    this.isLoading = true;
  };

  isIdle = () => {
    this.isLoading = false;
  };
}
