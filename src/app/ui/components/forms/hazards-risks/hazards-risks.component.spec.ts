import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardsRisksComponent } from './hazards-risks.component';

describe('HazardsRisksComponent', () => {
  let component: HazardsRisksComponent;
  let fixture: ComponentFixture<HazardsRisksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazardsRisksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HazardsRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
