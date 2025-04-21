import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter}                                                      from '@angular/router';

import {routes}                    from './app.routes';
import {provideAnimations}         from '@angular/platform-browser/animations';
import {provideHttpClient}         from '@angular/common/http';
import {MatNativeDateModule}       from '@angular/material/core';
import {provideLocalStoragePrefix} from '@ngx-pwa/local-storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideAnimations(),

    provideLocalStoragePrefix(
      'myapp_'
    ),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule),

    provideRouter(routes)]
};
