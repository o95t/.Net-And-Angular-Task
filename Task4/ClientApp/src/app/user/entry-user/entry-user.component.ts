import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/users';

@Component({
  selector: 'app-entry-user',
  templateUrl: './entry-user.component.html',
  styleUrls: ['./entry-user.component.css']
})
export class EntryUserComponent implements OnInit {

  @Input() id :number = 0;

  constructor(public appService :AppService,
    private router: Router,
    private route: ActivatedRoute) { }

    userInfo={
      id:0,
      userName:'',
      name:'',
      password:'',
      confirmPassword:'',
      email:'',
      mobile:''
    }

    clickedSubmit: Boolean = false;
    notSame: Boolean = false;
    entryForm = new FormGroup({
    userName: new FormControl(this.userInfo.userName, Validators.required),
    name: new FormControl(this.userInfo.name, Validators.required),
    password: new FormControl(this.userInfo.password, Validators.required),
    confirmPassword: new FormControl(this.userInfo.password,  Validators.required),
    email: new FormControl(this.userInfo.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    mobile: new FormControl(this.userInfo.mobile, [Validators.required, Validators.pattern("[0-9]{10}")]),
  });
  
 

  ngOnInit(): void {

    if (!this.appService.isLogin){
      this.router.navigateByUrl('Login');
    }
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    

    if (this.id != 0 ){

      this.appService.getUserById(this.id).subscribe(
      
        data => {
          this.userInfo.id = data['id'];
          this.userInfo.userName = data['userName'];
          this.userInfo.name = data['fullName'];
          this.userInfo.password = data['password'];
          this.userInfo.confirmPassword = data['password']
          this.userInfo.email = data['email']
          this.userInfo.mobile = data['mobile']
          this.fillForm();
        }
      );
    }
    
  }

  fillForm(){
    this.entryForm.controls.userName.setValue(this.userInfo.userName);
    this.entryForm.controls.name.setValue(this.userInfo.name);
    this.entryForm.controls.password.setValue(this.userInfo.password);
    this.entryForm.controls.confirmPassword.setValue(this.userInfo.confirmPassword);
    this.entryForm.controls.email.setValue(this.userInfo.email);
    this.entryForm.controls.mobile.setValue(this.userInfo.mobile);

  }

  matchValidator() {
    const password: string = this.entryForm.controls.password.value; // get password from our password form control
    const passwordConfirmed: string = this.entryForm.controls.confirmPassword.value; // get password from our passwordConfirmed form control
    // compare is the password math
    if (password !== passwordConfirmed) {
        // if they don't match, set an error in our passwordConfirmed form control
        this.notSame=true;
    }else{
      this.notSame=false;
    }
  }

  Cancel(){
    this.router.navigateByUrl('List');
  }

  Save(){
    this.clickedSubmit=true;
    this.entryForm.markAllAsTouched();

    if (this.entryForm.invalid || this.notSame) {
      return;
    }
    let userObj = new User;

    if (this.id != 0 ){

        userObj.id = this.id
        userObj.userName = this.entryForm.controls.userName.value
        userObj.fullName = this.entryForm.controls.name.value
        userObj.password = this.entryForm.controls.password.value
        userObj.email = this.entryForm.controls.email.value
        userObj.mobile = this.entryForm.controls.mobile.value

    }else{

      userObj.userName = this.entryForm.controls.userName.value
      userObj.fullName = this.entryForm.controls.name.value
      userObj.password = this.entryForm.controls.password.value
      userObj.email = this.entryForm.controls.email.value
      userObj.mobile = this.entryForm.controls.mobile.value
  
    }

    this.appService.AddEditUser(userObj).subscribe(
      
      data => { 
      this.router.navigateByUrl('List');
      },
      err => console.error(err)
    );

  }

}


