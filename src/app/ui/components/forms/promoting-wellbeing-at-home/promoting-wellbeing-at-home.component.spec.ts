import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotingWellbeingAtHomeComponent } from './promoting-wellbeing-at-home.component';

describe('PromotingWellbeingAtHomeComponent', () => {
  let component: PromotingWellbeingAtHomeComponent;
  let fixture: ComponentFixture<PromotingWellbeingAtHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotingWellbeingAtHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotingWellbeingAtHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
