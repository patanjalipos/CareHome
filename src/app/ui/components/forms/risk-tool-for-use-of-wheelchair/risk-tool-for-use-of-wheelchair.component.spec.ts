import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskToolForUseOfWheelchairComponent } from './risk-tool-for-use-of-wheelchair.component';

describe('RiskToolForUseOfWheelchairComponent', () => {
  let component: RiskToolForUseOfWheelchairComponent;
  let fixture: ComponentFixture<RiskToolForUseOfWheelchairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskToolForUseOfWheelchairComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskToolForUseOfWheelchairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
