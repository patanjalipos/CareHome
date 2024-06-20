import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikeThroughEntryComponent } from './strike-through-entry.component';

describe('StrikeThroughEntryComponent', () => {
  let component: StrikeThroughEntryComponent;
  let fixture: ComponentFixture<StrikeThroughEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrikeThroughEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrikeThroughEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
