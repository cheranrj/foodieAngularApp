import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { GlobalFunctionService } from 'src/app/system/services/global-function.service';
import { ManageDishComponent } from '../manage-dish/manage-dish.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { ApiService } from '../utilities/services/api.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.scss']
})
export class DishListComponent implements OnInit {

  title: string = 'Dish List'
  loader: boolean = true;
  dishList: any = [{
    dishType: 'Main course',
    contentID: 'mainCourse',
    dishes: [{
      id: 1,
      dishName: 'Chicken biriyani',
      dishCategory: 'Non-veg',
      amount: 200,
      discount: 5,
      dishImage: '../../../../assets/images/food_images/chicken_biriyani.webp'
    },
    {
      id: 2,
      dishName: 'Mutton biriyani',
      dishCategory: 'Non-veg',
      amount: 300,
      discount: 15,
      dishImage: '../../../../assets/images/food_images/mutton_biriyani.webp'
    }]
  },
  {
    dishType: 'Starters',
    contentID: 'starters',
    dishes: [{
      id: 3,
      dishName: 'Chilli Chicken',
      dishCategory: 'Non-veg',
      amount: 200,
      discount: 0,
      dishImage: '../../../../assets/images/food_images/chilli_chicken.webp'
    },
    {
      id: 4,
      dishName: 'Tangdi kebab',
      dishCategory: 'Non-veg',
      amount: 100,
      discount: 5,
      dishImage: '../../../../assets/images/food_images/tangdi_kebab.webp'
    },
    {
      id: 5,
      dishName: 'Jeddipappu Panneer',
      dishCategory: 'Veg',
      amount: 100,
      discount: 5,
      dishImage: '../../../../assets/images/food_images/jeddipappu_panneer.webp'
    }]
  },
  {
    dishType: 'Desserts',
    contentID: 'desserts',
    dishes: [{
      id: 6,
      dishName: 'Bread Halwa',
      dishCategory: 'Veg',
      amount: 200,
      discount: 0,
      dishImage: null
    },
    {
      id: 7,
      dishName: 'Gajar Ka Halwa',
      dishCategory: 'Veg',
      amount: 153,
      discount: 15,
      dishImage: '../../../../assets/images/food_images/ice_cream.webp'
    },
    {
      id: 8,
      dishName: 'Thandai Lassi',
      dishCategory: 'Veg',
      amount: 100,
      discount: 50,
      dishImage: null
    }]
  },
  {
    dishType: 'Breads',
    contentID: 'breads',
    dishes: [{
      id: 9,
      dishName: 'Naan / Butter Naan',
      dishCategory: 'Veg',
      amount: 40,
      discount: 0,
      dishImage: '../../../../assets/images/food_images/naan.webp'
    },
    {
      id: 10,
      dishName: 'Chapathi / Phulka',
      dishCategory: 'Veg',
      amount: 10,
      discount: 0,
      dishImage: null
    },
    {
      id: 11,
      dishName: 'Rumali Roti',
      dishCategory: 'Veg',
      amount: 70,
      discount: 10,
      dishImage: null
    }]
  }];
  showCart: boolean = false;
  currentUser: any;
  orderList: any = [];
  totalAmount: number = 0;

  constructor(
    private popup: MatDialog,
    private el: ElementRef,
    private apiService: ApiService,
    public gfService: GlobalFunctionService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.gfService.sessionUser;
    this.getDishList();
  }

  getDishList() {
    this.loader = true;
    const apiData: any = {
    };

    // const headers: any = {};
    // this.apiService.getDishList(apiData, headers).subscribe(
    //   (response) => {
    //     this.dishList = [];
    //     if (response && response.records.length) {
    this.dataBuild(this.dishList);
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

  addDishForm(action: 'addDish' | 'editDish', additionalInfo: any = {}) {
    const componentData = [
      {
        variableName: 'action',
        value: action
      }
    ];
    console.log(additionalInfo)
    if (action === 'editDish' && additionalInfo.data) {
      additionalInfo.data.dishType = this.dishList[additionalInfo.index].dishType;
      componentData.push({
        variableName: 'dishDetail',
        value: additionalInfo.data
      });
    }
    const dialogRef = this.popup.open(PopupComponent, {
      panelClass: ['custom-panel'],
      data: {
        action: 'dynamic',
        popup: true,
        component: ManageDishComponent,
        componentData,
        triggerEl: additionalInfo.actionElement
      },
      disableClose: true,
      maxWidth: '560px'
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && typeof result === 'object') {
        console.log(result)
        if (action === 'addDish') {
          result.id = result.recordID;
          this.manageDishData(action, result);
        } else if (action === 'editDish') {
          result.id = result.recordID;
          this.manageDishData(action, result, additionalInfo);
          // this.dataBuild(action, result, additionalInfo);
        }
      }
    });
  }

  manageDishData(action: 'addDish' | 'editDish', record: any, additionalInfo: any = {}) {
    const data: any = {
      dishes: []
    };
    data.dishType = record.dishType;
    console.log(typeof data.dishType)
    delete record.dishType;
    data.dishes = [record];
    this.dataBuild([data])

    if (action === 'addDish') {
      let dishAdded = false;
      this.dishList.forEach(dishTypeData => {
        if (dishTypeData.dishType.toLowerCase() === data.dishType.toLowerCase()) {
          console.log(dishTypeData)
          dishTypeData.dishes.unshift(data.dishes[0]);
          dishAdded = true;
        }
      });
      if (!this.dishList.length || !dishAdded) {
        // data.dishes.push(data);
        this.dishList.unshift(data);
      }
    } else if (action === 'editDish') {
      console.log(data)
      let dishAdded = false;
      this.dishList.forEach(dishTypeData => {
        if (dishTypeData.dishType.toLowerCase() === data.dishType.toLowerCase()) {
          this.dishList[additionalInfo.index].dishType = data.dishType;
          this.dishList[additionalInfo.index].dishes.splice(additionalInfo.dishIndex, 1, data.dishes[0]);
          dishAdded = true;
        }
      });
      if (!this.dishList.length || !dishAdded) {
        if (this.dishList[additionalInfo.index].dishes.length === 1) {
          this.dishList.splice(additionalInfo.index, 1);
        } else {
          this.dishList[additionalInfo.index].dishes.splice(additionalInfo.dishIndex, 1);
        }
        this.dishList.unshift(data);
      }
    }
  }

  alertPopup(additionalInfo: any = {}) {
    let buttons = [
      {
        type: 'main-action',
        caption: 'Yes',
        key: 'yes'
      },
      {
        type: 'main-action-cancel',
        caption: 'No',
        key: 'no',
        autoFocus: true
      }
    ];
    const dialogRef = this.popup.open(PopupComponent, {
      panelClass: ['custom-panel'],
      autoFocus: false,
      data: {
        action: 'alert',
        classes: 'warning',
        popup: true,
        icon: 'warning',
        title: 'Delete Dish',
        content: 'Are you sure want to delete Dish?',
        buttons,
        triggerEl: additionalInfo.actionElement
      },
      disableClose: true,
      maxWidth: '560px'
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        if (resp.key === 'yes') {
          if (this.dishList[additionalInfo.index].dishes.length === 1) {
            this.dishList.splice(additionalInfo.index, 1);
          } else {
            this.dishList[additionalInfo.index].dishes.splice(additionalInfo.dishIndex, 1);
          }
        }
      }
    });
  }

  selectCategory(index: number) {
    this.dishList.forEach(dishType => {
      dishType.active = false;
    });
    this.dishList[index].active = true;
    const target = this.el.nativeElement.querySelector(`#${this.dishList[index].contentID}`);
    if (target != null) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        // inline: 'center'
      });
    }
  }

  dataBuild(records: any) {
    for (const dishType of records) {
      dishType.active = false;
      for (const dish of dishType.dishes) {
        dish.quantity = 0;
        if (dish.discount) {
          const discountAmount = (dish.amount * dish.discount / 100);
          dish.finalAmount = dish.amount - discountAmount;
        } else {
          dish.finalAmount = dish.amount;
        }
      }
    }
    this.dishList[0].active = true;
    console.log(this.dishList)
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
      this.showCart = true;
    } else {
      this.showCart = false;
    }
    console.log(dish, this.orderList)


  }

  orderDetail() {

    const dialogRef = this.popup.open(PopupComponent, {
      panelClass: ['custom-panel'],
      data: {
        action: 'dynamic',
        popup: true,
        component: OrderDetailComponent,
        componentData: [{
          variableName: 'action',
          value: 'orderSummary'
        },
        {
          variableName: 'orderList',
          value: this.orderList
        },
        {
          variableName: 'totalAmount',
          value: this.totalAmount
        },],
        // triggerEl: additionalInfo.actionElement
      },
      disableClose: true,
      autoFocus: false,
      maxWidth: '860px'
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(result)
      if (result && typeof result === 'object') {
        this.totalAmount = result.totalAmount;
        this.orderList = result.orderList;
      }
      this.dishList.forEach(dishList => {
        if (dishList.dishes.length) {
          dishList.dishes.forEach(dish => {
            if (this.orderList.length) {
              let isUpdated = false;
              this.orderList.forEach(order => {
                if (order.id === dish.id) {
                  dish.quantity = order.quantity;
                  isUpdated = true;
                }
              });
              if (!isUpdated && dish.quantity) {
                dish.quantity = 0;
              }
            } else {
              dish.quantity = 0;
            }
          });
        }
      });

      if (!result.orderList.length) {
        this.showCart = false;
      }
    });
  }

}
