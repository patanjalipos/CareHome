import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressnotesDocumentsComponent } from './progressnotes-documents.component';

describe('ProgressnotesDocumentsComponent', () => {
  let component: ProgressnotesDocumentsComponent;
  let fixture: ComponentFixture<ProgressnotesDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressnotesDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressnotesDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
