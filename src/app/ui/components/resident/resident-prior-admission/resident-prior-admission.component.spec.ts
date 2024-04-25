import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentPriorAdmissionComponent } from './resident-prior-admission.component';

describe('ResidentPriorAdmissionComponent', () => {
  let component: ResidentPriorAdmissionComponent;
  let fixture: ComponentFixture<ResidentPriorAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentPriorAdmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentPriorAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
