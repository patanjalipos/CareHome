import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMasterComponent } from './form-master.component';

describe('FormMasterComponent', () => {
  let component: FormMasterComponent;
  let fixture: ComponentFixture<FormMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
