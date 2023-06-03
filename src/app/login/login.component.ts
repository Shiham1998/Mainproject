import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : any =FormGroup;
  submitted = true;
  constructor(private formBuilder: FormBuilder,private http : HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({

      email:['',Validators.email],
      password:['',Validators.minLength(8)]
    
    })
  }
  login(){
    this.submitted = true
    if(this,this.loginForm.invalid){
      return
    }
    this.http.post<any>("http://localhost:3000/login",this.loginForm.value)
    .subscribe(res=>{
      alert("Login SuccessFully");
      this.loginForm.reset();
      this.router.navigate(['']);
    },err=>{
      alert("Something wrong")
    })
    }

}
