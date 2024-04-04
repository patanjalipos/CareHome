import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareEatsAndTreatsComponent } from './care-eats-and-treats.component';

describe('CareEatsAndTreatsComponent', () => {
  let component: CareEatsAndTreatsComponent;
  let fixture: ComponentFixture<CareEatsAndTreatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareEatsAndTreatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareEatsAndTreatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
