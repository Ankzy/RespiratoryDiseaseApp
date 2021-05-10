import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
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
import {AdminUsersComponent} from './admin.users.component';
import {AboutComponent} from './about.component';




const adminRoutes: Routes = [
  {path: 'change-data', component: AdminChangeDataComponent},
  {path: 'learn-model', component: AdminLearnModelComponent},
  {path: 'models-history', component: AdminModelsHistoryComponent},
  {path: 'set-model', component: AdminSetModelComponent},
  {path: 'users', component: AdminUsersComponent}
];

const appRoutes: Routes = [
  {path: 'admin', component: AdminComponent, children: adminRoutes},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '', component: PredictStateComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  declarations: [AppComponent, AdminComponent, AdminChangeDataComponent, AdminLearnModelComponent,
  AdminModelsHistoryComponent, AdminSetModelComponent, PredictStateComponent,
  LoginComponent, RegistrationComponent, AdminUsersComponent, AboutComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
