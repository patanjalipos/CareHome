import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsChartComponent } from './news-chart.component';

describe('NewsChartComponent', () => {
  let component: NewsChartComponent;
  let fixture: ComponentFixture<NewsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
