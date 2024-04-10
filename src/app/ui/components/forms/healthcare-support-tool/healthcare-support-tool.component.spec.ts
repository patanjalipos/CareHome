import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareSupportToolComponent } from './healthcare-support-tool.component';

describe('HealthcareSupportToolComponent', () => {
  let component: HealthcareSupportToolComponent;
  let fixture: ComponentFixture<HealthcareSupportToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthcareSupportToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthcareSupportToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
