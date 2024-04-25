import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttorneyTypeMasterComponent } from './attorney-type-master.component';

describe('AttorneyTypeMasterComponent', () => {
  let component: AttorneyTypeMasterComponent;
  let fixture: ComponentFixture<AttorneyTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttorneyTypeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttorneyTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
