import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMasterComponent } from './chart-master.component';

describe('ChartMasterComponent', () => {
  let component: ChartMasterComponent;
  let fixture: ComponentFixture<ChartMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
