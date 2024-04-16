import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThePoolActivityLevelComponent } from './the-pool-activity-level.component';

describe('ThePoolActivityLevelComponent', () => {
  let component: ThePoolActivityLevelComponent;
  let fixture: ComponentFixture<ThePoolActivityLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThePoolActivityLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThePoolActivityLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
