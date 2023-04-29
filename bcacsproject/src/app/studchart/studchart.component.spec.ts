import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudchartComponent } from './studchart.component';

describe('StudchartComponent', () => {
  let component: StudchartComponent;
  let fixture: ComponentFixture<StudchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
