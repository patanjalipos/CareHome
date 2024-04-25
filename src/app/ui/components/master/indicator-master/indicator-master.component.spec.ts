import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorMasterComponent } from './indicator-master.component';

describe('IndicatorMasterComponent', () => {
  let component: IndicatorMasterComponent;
  let fixture: ComponentFixture<IndicatorMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicatorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
