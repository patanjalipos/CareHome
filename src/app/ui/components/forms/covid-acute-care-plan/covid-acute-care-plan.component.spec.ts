import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidAcuteCarePlanComponent } from './covid-acute-care-plan.component';

describe('CovidAcuteCarePlanComponent', () => {
  let component: CovidAcuteCarePlanComponent;
  let fixture: ComponentFixture<CovidAcuteCarePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidAcuteCarePlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidAcuteCarePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
