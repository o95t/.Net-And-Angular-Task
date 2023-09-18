import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(public appService :AppService,
              private router: Router ) { }
              
  clickedSubmit: Boolean = false;
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  ngOnInit() {

  }

  Login(){
    this.clickedSubmit = true;

    this.loginForm.markAllAsTouched();
    
    if (this.loginForm.invalid) {
      return;
    }

    
    this.appService.loginUser(this.loginForm.controls.userName.value,this.loginForm.controls.password.value).subscribe(
      
      data => {
        if (data == true){
          this.appService.isLogin = true;
          this.router.navigateByUrl('List');
        }else{
          alert("incorrect User Name or Password ");
        }
      }
    );

    // this.appService.Users.forEach(element => {
    //   if (element.userName == this.loginForm.controls.userName.value && element.password == this.loginForm.controls.password.value){
    //     this.appService.isLogin = true;
    //     this.router.navigateByUrl('List');
    //   }
    // });

    // if (!this.appService.isLogin){
    //   alert("incorrect User Name or Password ");
    // }
  }

}
