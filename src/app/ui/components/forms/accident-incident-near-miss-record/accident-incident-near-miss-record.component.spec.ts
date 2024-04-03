import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentIncidentNearMissRecordComponent } from './accident-incident-near-miss-record.component';

describe('AccidentIncidentNearMissRecordComponent', () => {
  let component: AccidentIncidentNearMissRecordComponent;
  let fixture: ComponentFixture<AccidentIncidentNearMissRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccidentIncidentNearMissRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentIncidentNearMissRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
