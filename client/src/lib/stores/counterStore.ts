import { makeAutoObservable } from "mobx";

export default class CounterStore {
  title = "Counter Store";
  count = 0;
  events: string[] = [`The count is initialized to ${this.count}`];

  constructor() {
    makeAutoObservable(this);
  }

  increment = (amount = 1) => {
    this.count += amount;
    this.events.push(`The count is incremented by ${amount}`);
  };

  decrement = (amount = 1) => {
    this.count -= amount;
    this.events.push(`The count is decremented by ${amount}`);
  };

  get getEvents() {
    return this.events.length;
  }
}
