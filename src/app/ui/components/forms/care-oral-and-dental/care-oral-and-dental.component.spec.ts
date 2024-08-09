import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareOralAndDentalComponent } from './care-oral-and-dental.component';

describe('CareOralAndDentalComponent', () => {
  let component: CareOralAndDentalComponent;
  let fixture: ComponentFixture<CareOralAndDentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareOralAndDentalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareOralAndDentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
