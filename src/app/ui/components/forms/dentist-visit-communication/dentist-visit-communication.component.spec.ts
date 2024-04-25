import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistVisitCommunicationComponent } from './dentist-visit-communication.component';

describe('DentistVisitCommunicationComponent', () => {
  let component: DentistVisitCommunicationComponent;
  let fixture: ComponentFixture<DentistVisitCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistVisitCommunicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentistVisitCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
