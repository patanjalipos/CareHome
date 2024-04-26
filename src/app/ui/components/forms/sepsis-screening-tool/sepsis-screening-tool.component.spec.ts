import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepsisScreeningToolComponent } from './sepsis-screening-tool.component';

describe('SepsisScreeningToolComponent', () => {
  let component: SepsisScreeningToolComponent;
  let fixture: ComponentFixture<SepsisScreeningToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SepsisScreeningToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SepsisScreeningToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
