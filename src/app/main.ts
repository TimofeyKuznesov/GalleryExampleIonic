import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { HomePage } from '../pages/home/home';

platformBrowserDynamic().bootstrapModule(AppModule);
