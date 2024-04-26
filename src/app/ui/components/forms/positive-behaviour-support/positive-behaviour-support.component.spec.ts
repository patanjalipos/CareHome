import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveBehaviourSupportComponent } from './positive-behaviour-support.component';

describe('PositiveBehaviourSupportComponent', () => {
  let component: PositiveBehaviourSupportComponent;
  let fixture: ComponentFixture<PositiveBehaviourSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositiveBehaviourSupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositiveBehaviourSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
