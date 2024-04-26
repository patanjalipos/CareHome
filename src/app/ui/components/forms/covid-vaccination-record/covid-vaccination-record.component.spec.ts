import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidVaccinationRecordComponent } from './covid-vaccination-record.component';

describe('CovidVaccinationRecordComponent', () => {
  let component: CovidVaccinationRecordComponent;
  let fixture: ComponentFixture<CovidVaccinationRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidVaccinationRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidVaccinationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
