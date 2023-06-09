import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
signupForm : any =FormGroup;
submitted = true;
  constructor(private formBuilder: FormBuilder,private http : HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['',Validators.required],
      mobile:['',Validators.required],
      email:['',Validators.email],
      password:['',Validators.minLength(8)]
    })
  }
  signup(){
    this.submitted = true
    if(this,this.signupForm.invalid){
      return
    }
  this.http.post<any>("http://localhost:3000/signup",this.signupForm.value)
  .subscribe(res=>{
    alert("Successfully Registered");
    this.signupForm.reset();
    this.router.navigate(['login']);
  },err=>{
    alert("Something wrong")
  })
  }
}
