import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OutletDetailComponent } from './outlet-detail/outlet-detail.component';
import { OutletListComponent } from './outlet-list/outlet-list.component';



const routes: Routes = [
  {
    path: 'outletList',
    component: OutletListComponent,
    // data: {
    // 	mustLogin: false,
    // 	authState: false
    // }
  },
  {
    path: 'outletDetail',
    component: OutletDetailComponent,
    // data: {
    // 	mustLogin: false,
    // 	authState: false
    // }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    // data: {
    // 	mustLogin: false,
    // 	authState: false
    // }
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // data: {
  // 	mustLogin: false,
  // 	authState: false
  // }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
