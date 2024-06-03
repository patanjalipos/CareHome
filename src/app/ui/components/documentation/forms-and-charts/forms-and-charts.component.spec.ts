import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsAndChartsComponent } from './forms-and-charts.component';

describe('FormsAndChartsComponent', () => {
  let component: FormsAndChartsComponent;
  let fixture: ComponentFixture<FormsAndChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsAndChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsAndChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
