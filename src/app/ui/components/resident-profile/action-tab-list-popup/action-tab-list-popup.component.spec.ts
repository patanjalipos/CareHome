import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTabListPopupComponent } from './action-tab-list-popup.component';

describe('ActionTabListPopupComponent', () => {
  let component: ActionTabListPopupComponent;
  let fixture: ComponentFixture<ActionTabListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionTabListPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionTabListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
