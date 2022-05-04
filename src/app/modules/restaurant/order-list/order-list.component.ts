import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BaseService } from 'src/app/system/services/base.service';
import { GlobalFunctionService } from 'src/app/system/services/global-function.service';
import { ApiService } from '../utilities/services/api.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {


  @ViewChild('pagination') paginator: MatPaginator;

  loader: boolean = false;
  orderList: any = [{
    color: 'red',
    orderID: 1,
    orderUniqueID: 14534543,
    paymentStatus: 1,
    foodDetails: [{
      foodName: 'Veg Burger',
      quantity: 1,
      dishCategory: 'Veg',
      amount: 50,
      discount: 10
    },
    {
      foodName: 'Veg Burger',
      quantity: 1,
      dishCategory: 'Veg',
      amount: 50,
      discount: 10
    },
    {
      foodName: 'Veg Biriyani',
      quantity: 2,
      dishCategory: 'Veg',
      amount: 200,
      discount: 10
    }],
    customerDetails: {
      name: 'Ashok',
      address: 'No.11 v.o.c street, kandanchavadi, chennai-96',
      phoneNumber: 8056907681
    },
    riderDetails: {
      name: 'Shannu',
      phoneNumber: 1212121212
    },
    totalAmount: 450,
    noOfOrder: 1,
    statusList: [{
      status: 1,
      updatedAt: 1618407743223
    },
    {
      status: 2,
      updatedAt: 1618407666710
    },
    {
      status: 3,
      updatedAt: 1618407666710
    },
    {
      status: 4,
      updatedAt: 1618407666710
    },
    {
      status: 5,
      updatedAt: 1618407666710
    }],
    orderStatus: 5
  },
  {
    color: 'purple',
    orderID: 1,
    orderUniqueID: 14534543,
    paymentStatus: 2,
    foodDetails: [{
      foodName: 'Pizza',
      quantity: 1,
      dishCategory: 'Veg',
      amount: 50,
      discount: 10
    },
    {
      foodName: 'Chicken Biriyani',
      quantity: 2,
      dishCategory: 'Non-veg',
      amount: 200,
      discount: 10
    }],
    customerDetails: {
      name: 'Ashok',
      address: 'No.11 v.o.c street, kandanchavadi, chennai-96',
      phoneNumber: 8056907681
    },
    totalAmount: 450,
    noOfOrder: 1,
    statusList: [{
      status: 1,
      updatedAt: 1618407663222
    },
    {
      status: 2,
      updatedAt: 1618407666710
    }],
    orderStatus: 2
  },
  {
    color: 'purple',
    orderID: 1,
    orderUniqueID: 14534543,
    paymentStatus: 2,
    foodDetails: [{
      foodName: 'Pizza',
      quantity: 1,
      dishCategory: 'Veg',
      amount: 50,
      discount: 10
    },
    {
      foodName: 'Chicken Biriyani',
      quantity: 2,
      dishCategory: 'Non-veg',
      amount: 200,
      discount: 10
    }],
    customerDetails: {
      name: 'Ashok',
      address: 'No.11 v.o.c street, kandanchavadi, chennai-96',
      phoneNumber: 8056907681
    },
    totalAmount: 450,
    noOfOrder: 1,
    statusList: [{
      status: 1,
      updatedAt: 1618407663222
    },
    {
      status: 2,
      updatedAt: 1618407666710
    }, {
      status: 6,
      updatedAt: 1618407666710
    }],
    orderStatus: 6
  },
  {
    color: 'purple',
    orderID: 1,
    orderUniqueID: 14534543,
    paymentStatus: 3,
    foodDetails: [{
      foodName: 'Pizza',
      quantity: 1,
      dishCategory: 'Veg',
      amount: 50,
      discount: 10
    },
    {
      foodName: 'Chicken Biriyani',
      quantity: 2,
      dishCategory: 'Non-veg',
      amount: 200,
      discount: 10
    }],
    customerDetails: {
      name: 'Ashok',
      address: 'No.11 v.o.c street, kandanchavadi, chennai-96',
      phoneNumber: 8056907681
    },
    totalAmount: 450,
    noOfOrder: 1,
    statusList: [{
      status: 1,
      updatedAt: 1618407663222
    },
    {
      status: 2,
      updatedAt: 1618407666710
    }],
    orderStatus: 2
  },
  {
    color: 'purple',
    orderID: 1,
    orderUniqueID: 14534543,
    paymentStatus: 4,
    foodDetails: [{
      foodName: 'Pizza',
      quantity: 1,
      dishCategory: 'Veg',
      amount: 50,
      discount: 10
    },
    {
      foodName: 'Chicken Biriyani',
      quantity: 2,
      dishCategory: 'Non-veg',
      amount: 200,
      discount: 10
    }],
    customerDetails: {
      name: 'Ashok',
      address: 'No.11 v.o.c street, kandanchavadi, chennai-96',
      phoneNumber: 8056907681
    },
    totalAmount: 450,
    noOfOrder: 1,
    statusList: [{
      status: 1,
      updatedAt: 1618407663222
    },
    {
      status: 2,
      updatedAt: 1618407666710
    }, {
      status: 6,
      updatedAt: 1618407666710
    }],
    orderStatus: 6
  }];

  filterData = [{
    key: 'new',
    value: 'New orders',
    selected: true,
    status: 1,
    count: 3
  },
  {
    key: 'preparing',
    value: 'Preparing',
    selected: false,
    status: 2,
    count: 0
  },
  {
    key: 'ready',
    value: 'Ready',
    selected: false,
    status: 3,
    count: 0
  },
  {
    key: 'outForDelivery',
    value: 'Out for delivery',
    selected: false,
    status: 4,
    count: 0
  },
  {
    key: 'pastOrders',
    value: 'Past Orders',
    selected: false,
    status: 5,
    count: 0
  }];
  pageSizeOptions = [5, 10, 25, 100];
  pageSize = 10;
  count = 50;
  currentUser: any;
  selectedFilter;

  constructor(
    private apiService: ApiService,
    public gfService: GlobalFunctionService,
    public baseService: BaseService
  ) { }

  ngOnInit(): void {
    // this.statusList = this.baseService.getReference('orderStatus');
    this.getOrderList(this.filterData[0]);
    this.currentUser = this.gfService.sessionUser;
  }

  paginationInfo(pageEvent: PageEvent) {

  }

  getOrderList(filterData) {
    this.loader = true;
    this.selectedFilter = filterData
    const apiData: any = {
      status: filterData.status
    };

    // const headers: any = {};
    // this.apiService.getOrderList(apiData, headers).subscribe(
    //   (response) => {
    //     this.orderList = [];
    //     if (response && response.records.length) {
    // this.dataBuild(this.orderList);
    this.dataBuild(this.orderList);
    this.getFilter(filterData);
    //     }
    //   },
    //   (error) => {
    //     this.dishList = [];
    //   }
    // )
    //   .add(() => {
    this.loader = false;
    // });
  }

  dataBuild(records: any) {

    for (const data of records) {
      for (const statusData of data.statusList) {
        statusData.status = this.baseService.referenceType('orderStatus', statusData.status);
        statusData.updatedAt = this.gfService.dateFormat(statusData.updatedAt, 'h:mm a');
      }

      data.orderStatus = this.baseService.referenceType('orderStatus', data.orderStatus);
      data.paymentStatus = this.baseService.referenceType('paymentStatus', data.paymentStatus);
      console.log(data.paymentStatus)
      data.loader = false;
    }

  }

  getFilter(filterData) {
    this.filterData.forEach((filter, filterIndex) => {
      filter.selected = false;
    });
    filterData.selected = true;
  }

  updateOrder(orderData) {
    orderData.loader = true;
    if (orderData && !orderData.loader) {
      const headers: any = {};
      const apiData = {
        status: orderData.orderStatus.value
      };

      // 	this.apiService.updateOrder(apiData, this.dishDetail.dishID, headers).subscribe(
      // 	async (response) => {
      // 		if (response) {
      // orderData.updateOrder = this.baseService.referenceType('orderStatus', response.status);
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

    } else {
      orderData.loader = false;
    }
  }

}
