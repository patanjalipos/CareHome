import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbertProtocolMissingPersonComponent } from './herbert-protocol-missing-person.component';

describe('HerbertProtocolMissingPersonComponent', () => {
  let component: HerbertProtocolMissingPersonComponent;
  let fixture: ComponentFixture<HerbertProtocolMissingPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerbertProtocolMissingPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerbertProtocolMissingPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
