import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustChartComponent } from './must-chart.component';

describe('MustChartComponent', () => {
  let component: MustChartComponent;
  let fixture: ComponentFixture<MustChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MustChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MustChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
