import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NoFoundComponent } from './shared/utils/components/NoFound/NoFound.component';
import { interceptorProvider } from './core/interceptors/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NoFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
