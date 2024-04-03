import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyCommunicationComponent } from './family-communication.component';

describe('FamilyCommunicationComponent', () => {
  let component: FamilyCommunicationComponent;
  let fixture: ComponentFixture<FamilyCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyCommunicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
