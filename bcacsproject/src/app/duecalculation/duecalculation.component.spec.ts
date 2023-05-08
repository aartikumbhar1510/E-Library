import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuecalculationComponent } from './duecalculation.component';

describe('DuecalculationComponent', () => {
  let component: DuecalculationComponent;
  let fixture: ComponentFixture<DuecalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuecalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuecalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
