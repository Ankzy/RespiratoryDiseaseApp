import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminChangeDataComponent} from './admin.change-data.component';
import {AdminLearnModelComponent} from './admin.learn-model.component';
import {AdminModelsHistoryComponent} from './admin.models-history.component';
import {AdminSetModelComponent} from './admin.set-model.component';
import {PredictStateComponent} from './predict-state.component';
import {RegistrationComponent} from './registration.component';
import {LoginComponent} from './login.component';
import {Observable} from 'rxjs';
import {FileTestComponent} from './file-test.component';




const adminRoutes: Routes = [
  {path: 'change-data', component: AdminChangeDataComponent},
  {path: 'learn-model', component: AdminLearnModelComponent},
  {path: 'models-history', component: AdminModelsHistoryComponent},
  {path: 'set-model', component: AdminSetModelComponent}
];

const appRoutes: Routes = [
  {path: 'admin', component: AdminComponent, children: adminRoutes},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '', component: PredictStateComponent},
  {path: 'file', component: FileTestComponent}
];

@NgModule({
  declarations: [AppComponent, AdminComponent, AdminChangeDataComponent, AdminLearnModelComponent,
  AdminModelsHistoryComponent, AdminSetModelComponent, PredictStateComponent,
  LoginComponent, RegistrationComponent, FileTestComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
