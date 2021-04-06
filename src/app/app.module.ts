import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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


const adminRoutes: Routes = [
  {path: 'change-data', component: AdminChangeDataComponent},
  {path: 'learn-model', component: AdminLearnModelComponent},
  {path: 'models-history', component: AdminModelsHistoryComponent},
  {path: 'set-model', component: AdminSetModelComponent}
];

const appRoutes: Routes = [
  {path: 'admin', component: AdminComponent, children: adminRoutes},
  {path: 'predict-state', component: PredictStateComponent}
];

@NgModule({
  declarations: [AppComponent, AdminComponent, AdminChangeDataComponent, AdminLearnModelComponent,
  AdminModelsHistoryComponent, AdminSetModelComponent, PredictStateComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
