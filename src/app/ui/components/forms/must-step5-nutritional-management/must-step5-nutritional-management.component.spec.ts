import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustStep5NutritionalManagementComponent } from './must-step5-nutritional-management.component';

describe('MustStep5NutritionalManagementComponent', () => {
  let component: MustStep5NutritionalManagementComponent;
  let fixture: ComponentFixture<MustStep5NutritionalManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MustStep5NutritionalManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MustStep5NutritionalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
