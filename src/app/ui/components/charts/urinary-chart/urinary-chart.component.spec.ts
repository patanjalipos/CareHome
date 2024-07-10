import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrinaryChartComponent } from './urinary-chart.component';

describe('UrinaryChartComponent', () => {
  let component: UrinaryChartComponent;
  let fixture: ComponentFixture<UrinaryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrinaryChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrinaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
