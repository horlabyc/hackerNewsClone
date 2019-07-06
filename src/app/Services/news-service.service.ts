import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  getTimeDifference(time): string {
    const postingTime = new Date(time).getTime();
    const timeNow = Date.now();
   const timeDifference = (Math.abs(timeNow - postingTime) / 36e5);
   if (timeDifference < 1) {
    return `${Math.ceil(timeDifference * 60)} minutes`
    }else if ( timeDifference >= 24 ) {
      if (Math.floor(timeDifference / 24) > 1) {
        return `${Math.floor(timeDifference / 24)} days`;
      }
      return `${Math.floor(timeDifference / 24)} day`;
    } else if ( timeDifference === 24) {
      return '1 day';
    } else {
      if (Math.floor(timeDifference) > 1) {
        return `${Math.floor(timeDifference)} hours`;
      }
      return `${Math.floor(timeDifference)} hour`;
    }
  }


  shortenUrl(): string {
    return 'bad';
  }
}
