import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './login/login-user/login-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { RegisterUserComponent } from './login/register-user/register-user.component';
import { EntryUserComponent } from './user/entry-user/entry-user.component';
import {  HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    ListUserComponent,
    RegisterUserComponent,
    EntryUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
