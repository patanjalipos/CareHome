import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalVisitCommunicationRecordComponent } from './professional-visit-communication-record.component';

describe('ProfessionalVisitCommunicationRecordComponent', () => {
  let component: ProfessionalVisitCommunicationRecordComponent;
  let fixture: ComponentFixture<ProfessionalVisitCommunicationRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalVisitCommunicationRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalVisitCommunicationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
