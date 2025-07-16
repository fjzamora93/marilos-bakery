import { SeoService } from '@app/products/services/seo.service';

export const seoServiceMock = {
  updateMetaTags: jasmine.createSpy('updateMetaTags').and.returnValue(void 0),
  updateTitle: jasmine.createSpy('updateTitle').and.returnValue(void 0),
  updateDescription: jasmine.createSpy('updateDescription').and.returnValue(void 0),
  updateKeywords: jasmine.createSpy('updateKeywords').and.returnValue(void 0),
  updateCanonicalUrl: jasmine.createSpy('updateCanonicalUrl').and.returnValue(void 0)
};

export const seoServiceProvider = {
  provide: SeoService,
  useValue: seoServiceMock
};
