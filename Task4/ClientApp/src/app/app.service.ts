import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './users';

const httpOptions = {
  headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
     'Content-Type': 'application/json' })
};

var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });

@Injectable({
  providedIn: 'root'
})

export class AppService {
  isLogin : Boolean = false;
  url ="";
  
  Users: User[] = [
    { id: 1, fullName: 'omar', userName: 'omar', password: '123', email: 'omar@test.com', mobile: '0798287249' },
    { id: 2, fullName: 'tareq', userName: 'tareq', password: '123', email: 'tareq@test.com', mobile: '0775123455' }
  ];

  constructor(public http:HttpClient, @Inject('BASE_URL') baseUrl: string,
  private router: Router) {
    this.url = baseUrl;
   }

  getUsers() {
    return this.http.get(this.url + 'api/Login/GetAllUser');
  }

  loginUser(userName: string, password:string) {

    var data ="username=" + userName + "&password=" + password

    return this.http.post(this.url + 'api/Login/LoginUser?'+data,data);

  }

  getUserById(id: number) {

    var data ="id=" + id 

    return this.http.get(this.url + 'api/Login/GetUserById?'+data);

  }

  DeleteUserById(id: number) {

    var data ="id=" + id 

    return this.http.get(this.url + 'api/Login/DeleteById?'+data);

  }

  AddEditUser(user: any) {
    
    return this.http.post(this.url + 'api/Login/AddEditUser',user);

  }
}
