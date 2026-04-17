import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, PreloadAllModules, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { correlationIdInterceptor } from './core/interceptors/correlation-id.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation(), withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor, correlationIdInterceptor])),
    provideAnimations(),
  ],
};
