import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareResidentContactsListComponent } from './care-resident-contacts-list.component';

describe('CareResidentContactsListComponent', () => {
  let component: CareResidentContactsListComponent;
  let fixture: ComponentFixture<CareResidentContactsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareResidentContactsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareResidentContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
