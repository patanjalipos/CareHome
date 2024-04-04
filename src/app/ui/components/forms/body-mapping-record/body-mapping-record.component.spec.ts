import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMappingRecordComponent } from './body-mapping-record.component';

describe('BodyMappingRecordComponent', () => {
  let component: BodyMappingRecordComponent;
  let fixture: ComponentFixture<BodyMappingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyMappingRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyMappingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
