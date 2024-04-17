import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskToolBedRailsPackComponent } from './risk-tool-bed-rails-pack.component';

describe('RiskToolBedRailsPackComponent', () => {
  let component: RiskToolBedRailsPackComponent;
  let fixture: ComponentFixture<RiskToolBedRailsPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskToolBedRailsPackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskToolBedRailsPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
