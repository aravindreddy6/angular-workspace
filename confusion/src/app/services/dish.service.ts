import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Dishes } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      // simulate server latency with 2 seconds delay
      setTimeout(() => resolve(Dishes), 2000)
    });
  }

  getDish(id: string): Promise<Dish> {
    return new Promise(resolve => {
      // simulate server latency with 2 seconds delay
      setTimeout(() => resolve(Dishes.filter((dish) => (dish.id === id))[0]),2000);
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      // simulate server latency with 2 seconds delay
      setTimeout(() => resolve(Dishes.filter((dish) => dish.featured)[0]),2000);
    });
  }
}
