import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareContinencePromotionComponent } from './care-continence-promotion.component';

describe('CareContinencePromotionComponent', () => {
  let component: CareContinencePromotionComponent;
  let fixture: ComponentFixture<CareContinencePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareContinencePromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareContinencePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
