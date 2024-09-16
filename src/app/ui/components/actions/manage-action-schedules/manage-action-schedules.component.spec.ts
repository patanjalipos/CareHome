import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActionSchedulesComponent } from './manage-action-schedules.component';

describe('ManageActionSchedulesComponent', () => {
  let component: ManageActionSchedulesComponent;
  let fixture: ComponentFixture<ManageActionSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageActionSchedulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageActionSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
