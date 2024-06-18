import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMappingComponent } from './body-mapping.component';

describe('BodyMappingComponent', () => {
  let component: BodyMappingComponent;
  let fixture: ComponentFixture<BodyMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
