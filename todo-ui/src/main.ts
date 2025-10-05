import 'zone.js';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/components/app.component';

(window as any).__Zone_disable_requestAnimationFrame = true;
(window as any).__Zone_disable_on_property = true;
(window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove'];

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
