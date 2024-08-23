import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTakenPopupComponent } from './action-taken-popup.component';

describe('ActionTakenPopupComponent', () => {
  let component: ActionTakenPopupComponent;
  let fixture: ComponentFixture<ActionTakenPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionTakenPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionTakenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
