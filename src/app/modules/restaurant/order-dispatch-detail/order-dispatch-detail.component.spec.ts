import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDispatchDetailComponent } from './order-dispatch-detail.component';

describe('OrderDispatchDetailComponent', () => {
  let component: OrderDispatchDetailComponent;
  let fixture: ComponentFixture<OrderDispatchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDispatchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDispatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
