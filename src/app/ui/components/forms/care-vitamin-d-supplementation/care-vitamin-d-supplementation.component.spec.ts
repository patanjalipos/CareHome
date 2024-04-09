import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareVitaminDSupplementationComponent } from './care-vitamin-d-supplementation.component';

describe('CareVitaminDSupplementationComponent', () => {
  let component: CareVitaminDSupplementationComponent;
  let fixture: ComponentFixture<CareVitaminDSupplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareVitaminDSupplementationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareVitaminDSupplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
