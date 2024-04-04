import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskWaterlowPressureUlcerComponent } from './risk-waterlow-pressure-ulcer.component';

describe('RiskWaterlowPressureUlcerComponent', () => {
  let component: RiskWaterlowPressureUlcerComponent;
  let fixture: ComponentFixture<RiskWaterlowPressureUlcerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskWaterlowPressureUlcerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskWaterlowPressureUlcerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
