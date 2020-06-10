import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app-component/app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth-component/auth.component';
import { AppService } from './services/app.service';
import { HttpService } from './services/http.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from "@angular/router";
import { routes } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AppService, HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
