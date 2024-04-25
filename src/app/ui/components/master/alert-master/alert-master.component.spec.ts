import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMasterComponent } from './alert-master.component';

describe('AlertMasterComponent', () => {
  let component: AlertMasterComponent;
  let fixture: ComponentFixture<AlertMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
