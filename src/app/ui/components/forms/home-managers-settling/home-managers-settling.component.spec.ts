import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeManagersSettlingComponent } from './home-managers-settling.component';

describe('HomeManagersSettlingComponent', () => {
  let component: HomeManagersSettlingComponent;
  let fixture: ComponentFixture<HomeManagersSettlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeManagersSettlingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeManagersSettlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
