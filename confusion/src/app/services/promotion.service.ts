import { Injectable } from '@angular/core';
import {Promotion } from '../shared/promotion';
import { PromoTions } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promotion[] {
    return PromoTions;
  }

  getPromotion(id: string): Promotion {
    return PromoTions.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedPromotion(): Promotion {
    return PromoTions.filter((promo) => promo.featured)[0];
  }
}
