import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { HttpClientModule }    from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';


// services
import { APIUtilService } from '../services/apiUtils';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    APIUtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
