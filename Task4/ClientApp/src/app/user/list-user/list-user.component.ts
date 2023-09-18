import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(public appService: AppService,
    private router: Router) { }


  userId: number = 0;
  Users: any;
  sort: number;
  pageOfUsers: Array<any>;
  page: number;
  pageSize: number;
  countPage: number = 1;

  ngOnInit(): void {
    this.sort = 0;
    this.pageSize = 3;
    this.page = 1;
    if (!this.appService.isLogin) {
      //  this.router.navigateByUrl('Login');
    }

    this.loadUsers();

  }

  calcPageSize() {
    this.countPage = this.Users.length / this.pageSize;
  }

  next() {

    if (this.countPage <= this.page)
      return;
    this.page += 1;
  }

  counter(i: number) {

    i = Math.ceil(i);
    return new Array(i);
  }
  setPage(i: number) {
    this.page = i;
  }
  back() {
    if (this.page === 1)
      return;
    this.page -= 1;
  }

  loadUsers() {

    this.appService.getUsers().subscribe(

      data => {
        this.Users = data
        this.calcPageSize();
      },
      err => console.error(err)
    );

  }

  Logout() {
    this.router.navigateByUrl('Login');
  }

  sortList() {

    if (this.sort == 0) {
      this.sort = 1;
      this.Users.sort((a, b) => (a.userName > b.userName) ? 1 : (a.userName === b.userName) ? ((a.userName > b.userName) ? 1 : -1) : -1)
    } else if (this.sort == 1) {
      this.sort = 2;
      this.Users.sort((a, b) => (a.userName < b.userName) ? 1 : (a.userName === b.userName) ? ((a.userName < b.userName) ? 1 : -1) : -1)
    } else if (this.sort == 2) {
      this.sort = 0;
      this.loadUsers();
    }

  }

  edit(id: any) {
    this.userId = id;

    this.router.navigate(['/Entry'], { queryParams: { id: id } });


  }

  delete(name: string, id: number) {
    if (confirm("Are you sure to delete " + name)) {

      this.appService.DeleteUserById(id).subscribe(

        data => {
          this.loadUsers();
        }
      );

    }
  }

}
