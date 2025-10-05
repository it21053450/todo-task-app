import { ApplicationConfig, NgZone } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NgZone, useValue: new NgZone({ enableLongStackTrace: false }) },
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch())
  ]
};