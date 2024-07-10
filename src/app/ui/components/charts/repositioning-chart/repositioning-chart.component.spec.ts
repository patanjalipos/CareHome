import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositioningChartComponent } from './repositioning-chart.component';

describe('RepositioningChartComponent', () => {
  let component: RepositioningChartComponent;
  let fixture: ComponentFixture<RepositioningChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositioningChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepositioningChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
