import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyDetailsComponent } from './occupancy-details.component';

describe('OccupancyDetailsComponent', () => {
  let component: OccupancyDetailsComponent;
  let fixture: ComponentFixture<OccupancyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupancyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
