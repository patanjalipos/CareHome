import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentMasterComponent } from './resident-master.component';

describe('ResidentMasterComponent', () => {
  let component: ResidentMasterComponent;
  let fixture: ComponentFixture<ResidentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
