import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespiteCareSupportPlanComponent } from './respite-care-support-plan.component';

describe('RespiteCareSupportPlanComponent', () => {
  let component: RespiteCareSupportPlanComponent;
  let fixture: ComponentFixture<RespiteCareSupportPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespiteCareSupportPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespiteCareSupportPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
