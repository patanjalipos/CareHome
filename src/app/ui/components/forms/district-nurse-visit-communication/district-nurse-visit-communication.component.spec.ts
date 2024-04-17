import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictNurseVisitCommunicationComponent } from './district-nurse-visit-communication.component';

describe('DistrictNurseVisitCommunicationComponent', () => {
  let component: DistrictNurseVisitCommunicationComponent;
  let fixture: ComponentFixture<DistrictNurseVisitCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictNurseVisitCommunicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictNurseVisitCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
