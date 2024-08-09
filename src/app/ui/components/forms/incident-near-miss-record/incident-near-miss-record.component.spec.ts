import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentNearMissRecordComponent } from './incident-near-miss-record.component';

describe('IncidentNearMissRecordComponent', () => {
  let component: IncidentNearMissRecordComponent;
  let fixture: ComponentFixture<IncidentNearMissRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentNearMissRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentNearMissRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
