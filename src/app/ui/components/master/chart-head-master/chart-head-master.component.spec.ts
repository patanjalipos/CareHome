import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHeadMasterComponent } from './chart-head-master.component';

describe('ChartHeadMasterComponent', () => {
  let component: ChartHeadMasterComponent;
  let fixture: ComponentFixture<ChartHeadMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartHeadMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartHeadMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
