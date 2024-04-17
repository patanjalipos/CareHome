import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareSignsOfIllBeingComponent } from './care-signs-of-ill-being.component';

describe('CareSignsOfIllBeingComponent', () => {
  let component: CareSignsOfIllBeingComponent;
  let fixture: ComponentFixture<CareSignsOfIllBeingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareSignsOfIllBeingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareSignsOfIllBeingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
