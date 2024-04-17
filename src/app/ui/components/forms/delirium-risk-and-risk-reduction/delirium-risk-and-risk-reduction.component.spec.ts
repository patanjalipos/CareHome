import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliriumRiskAndRiskReductionComponent } from './delirium-risk-and-risk-reduction.component';

describe('DeliriumRiskAndRiskReductionComponent', () => {
  let component: DeliriumRiskAndRiskReductionComponent;
  let fixture: ComponentFixture<DeliriumRiskAndRiskReductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliriumRiskAndRiskReductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliriumRiskAndRiskReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
