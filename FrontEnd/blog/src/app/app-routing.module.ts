import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ApiComponent } from './api/api.component';
import { ConnectionComponent } from './connection/connection.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'knowledge', component: KnowledgeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'api', component: ApiComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'registration', component: RegistrationComponent },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    CommonModule,
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
