import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { ManageDishComponent } from './manage-dish/manage-dish.component';
import { ManageOutletComponent } from './manage-outlet/manage-outlet.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { OutletListComponent } from './outlet-list/outlet-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDispatchListComponent } from './order-dispatch-list/order-dispatch-list.component';
import { OrderDispatchDetailComponent } from './order-dispatch-detail/order-dispatch-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OutletDetailComponent } from './outlet-detail/outlet-detail.component';
import { PipeModule } from 'src/app/system/pipes/pipe.module';
import { OrdersComponent } from './orders/orders.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [ManageDishComponent, ManageOutletComponent, DishListComponent, OutletListComponent, OrderListComponent, OrderDetailComponent, OrderDispatchListComponent, OrderDispatchDetailComponent, OutletDetailComponent, OrdersComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTabsModule,
    MatDividerModule,
    PipeModule
  ]
})
export class RestaurantModule { }
