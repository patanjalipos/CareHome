import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskMultifactorialFallsRiskComponent } from './risk-multifactorial-falls-risk.component';

describe('RiskMultifactorialFallsRiskComponent', () => {
  let component: RiskMultifactorialFallsRiskComponent;
  let fixture: ComponentFixture<RiskMultifactorialFallsRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskMultifactorialFallsRiskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskMultifactorialFallsRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
