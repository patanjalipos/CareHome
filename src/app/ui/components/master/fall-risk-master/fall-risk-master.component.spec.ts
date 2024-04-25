import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallRiskMasterComponent } from './fall-risk-master.component';

describe('FallRiskMasterComponent', () => {
  let component: FallRiskMasterComponent;
  let fixture: ComponentFixture<FallRiskMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallRiskMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FallRiskMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
