import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectingAndCommunicatingComponent } from './connecting-and-communicating.component';

describe('ConnectingAndCommunicatingComponent', () => {
  let component: ConnectingAndCommunicatingComponent;
  let fixture: ComponentFixture<ConnectingAndCommunicatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectingAndCommunicatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectingAndCommunicatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
