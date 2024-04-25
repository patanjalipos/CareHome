import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorGroupMasterComponent } from './indicator-group-master.component';

describe('IndicatorGroupMasterComponent', () => {
  let component: IndicatorGroupMasterComponent;
  let fixture: ComponentFixture<IndicatorGroupMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorGroupMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicatorGroupMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
