import { TestBed } from '@angular/core/testing';

import { TeachersCalendarComponentService } from './teachers-calendar-component.service';

describe('TeachersCalendarComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeachersCalendarComponentService = TestBed.get(TeachersCalendarComponentService);
    expect(service).toBeTruthy();
  });
});
