import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Amplify } from 'aws-amplify';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core';

// @ts-ignore
import awsExports from '../aws-exports';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { InitService } from './core/services/app-state/init.service';
import { AuthGuard } from './core/services/auth-guard/auth-guard';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';

Amplify.configure(awsExports);

export function initApp(initService: InitService) {
  return () => initService.loadConfig();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    FullCalendarModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuard,
    { provide: APP_INITIALIZER, useFactory: initApp, deps: [InitService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    MessageService 
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
