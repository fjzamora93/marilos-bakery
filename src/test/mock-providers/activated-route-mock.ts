import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

export const activatedRouteMock = {
  snapshot: {
    params: {},
    queryParams: {},
    data: {},
    url: [],
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue(null),
      has: jasmine.createSpy('has').and.returnValue(false),
      keys: []
    },
    queryParamMap: {
      get: jasmine.createSpy('get').and.returnValue(null),
      has: jasmine.createSpy('has').and.returnValue(false),
      keys: []
    }
  },
  params: of({}),
  queryParams: of({}),
  data: of({}),
  url: of([]),
  paramMap: of({
    get: jasmine.createSpy('get').and.returnValue(null),
    has: jasmine.createSpy('has').and.returnValue(false),
    keys: []
  }),
  queryParamMap: of({
    get: jasmine.createSpy('get').and.returnValue(null),
    has: jasmine.createSpy('has').and.returnValue(false),
    keys: []
  })
};

export const activatedRouteProvider = {
  provide: ActivatedRoute,
  useValue: activatedRouteMock
};
