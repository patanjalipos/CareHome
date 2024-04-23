import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareWishesForFutureComponent } from './care-wishes-for-future.component';

describe('CareWishesForFutureComponent', () => {
  let component: CareWishesForFutureComponent;
  let fixture: ComponentFixture<CareWishesForFutureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareWishesForFutureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareWishesForFutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
