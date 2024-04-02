import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsDashboardComponent } from './forms-dashboard.component';

describe('FormsDashboardComponent', () => {
  let component: FormsDashboardComponent;
  let fixture: ComponentFixture<FormsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
