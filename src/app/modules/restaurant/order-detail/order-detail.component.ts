import { Component, OnInit } from '@angular/core';
import { GlobalFunctionService } from 'src/app/system/services/global-function.service';
import { ApiService } from '../utilities/services/api.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderList: any = [];
  action: 'OrderSummary' | 'orderDetail';
  popupRef;
  totalAmount;
  submitDisable: boolean = false;

  constructor(
    public gfService: GlobalFunctionService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    console.log(this.orderList, this.popupRef)
  }

  selectQuantity(action: string, dish: any) {
    if (action === 'add') {
      dish.quantity += 1;
      if (!this.orderList.length) {
        this.orderList.unshift({ ...dish });
      } else {
        let added = false;
        this.orderList.forEach(orderData => {
          if (orderData.id === dish.id && dish.quantity > 0) {
            orderData.quantity = dish.quantity;
            added = true;
            return;
          }
        });
        if (!added) {
          this.orderList.unshift({ ...dish });
        }
      }
    } else if (action === 'delete') {
      dish.quantity -= 1;
      if (this.orderList.length === 1 && dish.quantity === 0) {
        this.orderList = [];
      } else {
        this.orderList.forEach((orderData, orderIndex) => {
          if (orderData.id === dish.id && dish.quantity === 0) {
            this.orderList.splice(orderIndex, 1);
            return;
          } else if (orderData.id === dish.id && dish.quantity > 0) {
            orderData.quantity = dish.quantity;
            return;
          }
        });
      }
    }
    this.totalAmount = 0;
    if (this.orderList.length) {
      this.orderList.forEach((orderData, orderIndex) => {
        this.totalAmount += (orderData.finalAmount * orderData.quantity);
      });
    }

    const closeData = {
      orderList: this.orderList,
      totalAmount: this.totalAmount
    };

    this.popupRef.componentInstance.dialogCloseData = closeData;
    if (!this.orderList.length) {
      this.popupRef.close(closeData);
    }
    console.log(dish, this.orderList)


  }

  submit() {
    this.submitDisable = true;
    const headers: any = {};
    const apiValue = {
      orderList: this.orderList
    };

    // this.apiService.saveOrder(apiValue, headers).subscribe(
    //   	async (response) => {
    //   		if (response) {
    this.popupRef.close(this.gfService.JSONMerge({
      orderList: [],
      totalAmount: 0
    }, {}));
    // 			// this.gfService.openSnackBar('SUCCESS', {
    // 			// 	message: this.locale.translate(msg),
    // 			// 	icon: 'check_circle_outline',
    // 			// 	position: 'before'
    // 			// });
    // 		}
    // 	},
    // 	(error) => {
    // 		// this.gfService.formErrorHandler(error, this.formObjectData.form);
    // 	}
    // )
    // 	.add(() => {
    // 		this.submitDisable = false;			
    // 			// this.loader = false;
    // 	});
  }

}
