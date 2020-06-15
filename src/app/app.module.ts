import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './components/app-component/app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth-component/auth.component';
import { AppService } from './services/app.service';
import { HttpService } from './services/http.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from "@angular/router";
import { routes } from './app.routing';
import { RecordsComponent } from './components/records-component/records.component';
import { CanActivateGuard } from './model/canActivate.guard';
import { LookupPipe } from './model/lookup.pipe';
import { ToDateDipe } from './model/toDate.pipe';
import { PhonePipe } from './model/phone.pipe';
import { DurationPipe } from './model/duration.pipe';
import { RecordComponent } from "./components/records-component/record.component/record.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RecordsComponent,
    LookupPipe, ToDateDipe, PhonePipe, DurationPipe,
    RecordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    AppService, HttpService,
    CanActivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
