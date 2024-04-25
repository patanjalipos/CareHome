import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertHeadMasterComponent } from './alert-head-master.component';

describe('AlertHeadMasterComponent', () => {
  let component: AlertHeadMasterComponent;
  let fixture: ComponentFixture<AlertHeadMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertHeadMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertHeadMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
