import { makeAutoObservable } from "mobx";

export default class CounterStore {
  title = "Counter Store";
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment = (amount = 1) => {
    this.count += amount;
  };

  decrement = (amount = 1) => {
    this.count -= amount;
  };
}
