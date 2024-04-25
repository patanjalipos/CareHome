import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskOnTheMoveComponent } from './risk-on-the-move.component';

describe('RiskOnTheMoveComponent', () => {
  let component: RiskOnTheMoveComponent;
  let fixture: ComponentFixture<RiskOnTheMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskOnTheMoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskOnTheMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
