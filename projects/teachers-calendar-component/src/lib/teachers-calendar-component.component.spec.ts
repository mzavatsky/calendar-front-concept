import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersCalendarComponentComponent } from './teachers-calendar-component.component';

describe('TeachersCalendarComponentComponent', () => {
  let component: TeachersCalendarComponentComponent;
  let fixture: ComponentFixture<TeachersCalendarComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersCalendarComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersCalendarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
