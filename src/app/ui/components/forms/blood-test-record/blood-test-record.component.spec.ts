import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestRecordComponent } from './blood-test-record.component';

describe('BloodTestRecordComponent', () => {
  let component: BloodTestRecordComponent;
  let fixture: ComponentFixture<BloodTestRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodTestRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodTestRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
