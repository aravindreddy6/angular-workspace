import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Leaders } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  
  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => {
      //simulate server latency within 2 second delay
      setTimeout(() => resolve(Leaders),2000);
  });
}

  getLeader(id: string): Promise<Leader> {
    return new Promise(resolve => {
      // simulate server latency with 2 seconds delay
      setTimeout(() => resolve(Leaders.filter((leader) => (leader.id === id))[0]),2000);
  });
}  

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve => {
      // simulate server latency with 2 seconds delay
      setTimeout(() => resolve(Leaders.filter((leader) => leader.featured)[0]),2000);
  });
}  
}
