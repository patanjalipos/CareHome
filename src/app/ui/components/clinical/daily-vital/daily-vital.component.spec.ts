import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyVitalComponent } from './daily-vital.component';

describe('DailyVitalComponent', () => {
  let component: DailyVitalComponent;
  let fixture: ComponentFixture<DailyVitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyVitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyVitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
