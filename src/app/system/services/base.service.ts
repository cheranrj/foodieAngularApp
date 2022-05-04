import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }


  referenceType(type: ReferenceType, value: number | string) {
    const data: any = this.getReference(type);
    return data.find((items) => items.value === value);
  }

  getReference(type: ReferenceType) {
    if (type === 'orderStatus') {
      return this.orderStatus;
    } else if (type === 'paymentStatus') {
      return this.paymentStatus;
    } else if (type === 'roleStatus') {
      return this.roleStatus;
    }
  }

  get orderStatus() {
    return [
      {
        key: 'ordered',
        caption: 'Ordered',
        value: 1
      },
      {
        key: 'placed',
        caption: 'Placed',
        value: 2
      },
      {
        key: 'ready',
        caption: 'Ready',
        value: 3
      },
      {
        key: 'outForDelivery',
        caption: 'Out for delivery',
        value: 4
      },
      {
        key: 'delivered',
        caption: 'Delivered',
        value: 5
      },
      {
        key: 'cancelled',
        caption: 'Cancelled',
        value: 6
      }
    ];
  }

  get paymentStatus() {
    return [
      {
        key: 'notPaid',
        caption: 'Not paid',
        value: 1
      },
      {
        key: 'paid',
        caption: 'Paid',
        value: 2
      },
      {
        key: 'refundInitiated',
        caption: 'Refunded Initiated',
        value: 3
      },
      {
        key: 'refund',
        caption: 'Refunded',
        value: 4
      }
    ];
  }

  get roleStatus() {
    return [
      {
        key: 'restaurant',
        caption: 'Restaurant',
        value: 1
      },
      {
        key: 'customer',
        caption: 'Customer',
        value: 2
      },
      {
        key: 'delivery',
        caption: 'Delivery',
        value: 3
      }
    ];
  }
}

type ReferenceType = 'orderStatus' | 'paymentStatus' | 'roleStatus';
