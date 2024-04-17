import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordOfDecisionComponent } from './record-of-decision.component';

describe('RecordOfDecisionComponent', () => {
  let component: RecordOfDecisionComponent;
  let fixture: ComponentFixture<RecordOfDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordOfDecisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordOfDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
