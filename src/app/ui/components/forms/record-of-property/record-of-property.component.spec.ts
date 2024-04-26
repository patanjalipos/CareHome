import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordOfPropertyComponent } from './record-of-property.component';

describe('RecordOfPropertyComponent', () => {
  let component: RecordOfPropertyComponent;
  let fixture: ComponentFixture<RecordOfPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordOfPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordOfPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
