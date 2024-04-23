import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskToolSafeWorkingComponent } from './risk-tool-safe-working.component';

describe('RiskToolSafeWorkingComponent', () => {
  let component: RiskToolSafeWorkingComponent;
  let fixture: ComponentFixture<RiskToolSafeWorkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskToolSafeWorkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskToolSafeWorkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
