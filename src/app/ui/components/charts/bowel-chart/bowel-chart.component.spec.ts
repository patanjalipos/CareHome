import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowelChartComponent } from './bowel-chart.component';

describe('BowelChartComponent', () => {
  let component: BowelChartComponent;
  let fixture: ComponentFixture<BowelChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BowelChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BowelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
