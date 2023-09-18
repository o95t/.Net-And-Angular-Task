import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/users';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})


export class RegisterUserComponent implements OnInit {

  constructor(public appService :AppService,
              private router: Router) { }
  
  notSame: Boolean = false;
  clickedSubmit: Boolean = false;

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('',  Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    mobile: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
  });
  ngOnInit(): void {

  
  }

  matchValidator() {
    const password: string = this.registerForm.controls.password.value; // get password from our password form control
    const passwordConfirmed: string = this.registerForm.controls.confirmPassword.value; // get password from our passwordConfirmed form control
    // compare is the password math
    if (password !== passwordConfirmed) {
        // if they don't match, set an error in our passwordConfirmed form control
        this.notSame=true;
    }else{
      this.notSame=false;
    }
  }

  
  Register(){
    this.clickedSubmit=true;
    this.registerForm.markAllAsTouched();
    
    if (this.registerForm.invalid || this.notSame) {
      return;
    }
    let userObj = new User;

    userObj.id = 0;
    userObj.userName = this.registerForm.controls.userName.value
    userObj.fullName = this.registerForm.controls.name.value
    userObj.password = this.registerForm.controls.password.value
    userObj.email = this.registerForm.controls.email.value
    userObj.mobile = this.registerForm.controls.mobile.value

    this.appService.AddEditUser(userObj).subscribe(
      
      data => { 
    this.router.navigateByUrl('Login');
    },
      err => console.error(err)
    );

  }



  
}
