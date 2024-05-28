import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentProgressnotesComponent } from './resident-progressnotes.component';

describe('ResidentProgressnotesComponent', () => {
  let component: ResidentProgressnotesComponent;
  let fixture: ComponentFixture<ResidentProgressnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentProgressnotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentProgressnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
