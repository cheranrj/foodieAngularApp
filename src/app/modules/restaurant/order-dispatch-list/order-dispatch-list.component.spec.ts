import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDispatchListComponent } from './order-dispatch-list.component';

describe('OrderDispatchListComponent', () => {
  let component: OrderDispatchListComponent;
  let fixture: ComponentFixture<OrderDispatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDispatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDispatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
