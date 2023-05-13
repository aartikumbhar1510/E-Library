import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueCollectionComponent } from './due-collection.component';

describe('DueCollectionComponent', () => {
  let component: DueCollectionComponent;
  let fixture: ComponentFixture<DueCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
