import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpDoctorVisitCommunicationRecordComponent } from './gp-doctor-visit-communication-record.component';

describe('GpDoctorVisitCommunicationRecordComponent', () => {
  let component: GpDoctorVisitCommunicationRecordComponent;
  let fixture: ComponentFixture<GpDoctorVisitCommunicationRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpDoctorVisitCommunicationRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpDoctorVisitCommunicationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
