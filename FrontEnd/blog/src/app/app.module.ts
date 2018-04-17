import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './/app-routing.module';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ApiComponent } from './api/api.component';
import { ConnectionComponent } from './connection/connection.component';
import { RegistrationComponent } from './registration/registration.component';
import { BloggerComponent } from './blogger/blogger.component';




@NgModule({
  declarations: [
    AppComponent,
    KnowledgeComponent,
    AboutComponent,
    HomeComponent,
    ApiComponent,
    ConnectionComponent,
    RegistrationComponent,
    BloggerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
