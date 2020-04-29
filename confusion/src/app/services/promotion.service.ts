import { Injectable } from '@angular/core';
import {Promotion } from '../shared/promotion';
import { PromoTions } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve => {
      // simulate server latency with 2 seconds delay
      setTimeout(() => resolve(PromoTions),2000);
  });
}
  getPromotion(id: string): Promise<Promotion> {
    return new Promise(resolve => {
      // simulate server latency with 2 seconds delay
      setTimeout(() => resolve(PromoTions.filter((promo) => (promo.id === id))[0]),2000);
  });
}
  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
      // simulate server latency with 2 seconds delay
      setTimeout(() => resolve(PromoTions.filter((promo) => promo.featured)[0]),2000);
  });
}  
}
