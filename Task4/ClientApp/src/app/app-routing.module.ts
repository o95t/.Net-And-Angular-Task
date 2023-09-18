import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login/login-user/login-user.component';
import { RegisterUserComponent } from './login/register-user/register-user.component';
import { EntryUserComponent } from './user/entry-user/entry-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';

const routes: Routes = [
  { path: 'Login', component: LoginUserComponent },
  { path: 'Register', component: RegisterUserComponent },
  { path: 'List', component: ListUserComponent },
  { path: 'Entry', component: EntryUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
