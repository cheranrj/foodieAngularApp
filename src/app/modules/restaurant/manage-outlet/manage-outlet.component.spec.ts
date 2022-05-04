import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOutletComponent } from './manage-outlet.component';

describe('ManageOutletComponent', () => {
  let component: ManageOutletComponent;
  let fixture: ComponentFixture<ManageOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
