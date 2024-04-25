import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentHealthcareDetailsComponent } from './resident-healthcare-details.component';

describe('ResidentHealthcareDetailsComponent', () => {
  let component: ResidentHealthcareDetailsComponent;
  let fixture: ComponentFixture<ResidentHealthcareDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentHealthcareDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentHealthcareDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
