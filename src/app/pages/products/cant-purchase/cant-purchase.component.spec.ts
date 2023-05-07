import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantPurchaseComponent } from './cant-purchase.component';

describe('CantPurchaseComponent', () => {
  let component: CantPurchaseComponent;
  let fixture: ComponentFixture<CantPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CantPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
