import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

 
  cartValue: any
  AuthService: any;
 myDate = Date.now();
  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    this.CartDetails();
    this.loadCart();
  }
  getCartDetails:any=[];
 CartDetails(){
   if(localStorage.getItem('localCart')){
     this.getCartDetails = localStorage.getItem('localCart');
     this.getCartDetails = JSON.parse(this.getCartDetails);
     console.log(this.getCartDetails);
     
   }
 }
 incQnt(prodId : any, qnt : any){
  for(let i=0; i<this.getCartDetails.length;i++){

    if(this.getCartDetails[i].prodId === prodId){
     if(qnt !=5)
       
     
      this.getCartDetails[i].qnt =  parseInt(qnt) + 1;
    }
  }
  localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
 }
 decQnt(prodId : any, qnt : any){
  for(let i=0; i<this.getCartDetails.length;i++){

    if(this.getCartDetails[i].prodId === prodId){
     if(qnt !=1)
       
     
      this.getCartDetails[i].qnt =  parseInt(qnt) - 1;
      
    }
  }
  localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
 }
 total:number = 0;
  loadCart(){
 if(localStorage.getItem('localCart')){
   this.getCartDetails = localStorage.getItem('localCart');
   this.getCartDetails = JSON.parse(this.getCartDetails);
  this.total =  this.getCartDetails.reduce(function(acc : any, val : any){
 return acc + (val.amt * val.qnt);
   }, 0);
  
 }
  }
  removeall(){
    localStorage.removeItem('localCart')
    this.getCartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    // this.loadCart();this.auth.cartSubject.next(this.cartNumber);
    this.auth.cartSubject.next(this.cartNumber);

  }
  singleDelete(getCartDetail : any){
 console.log(getCartDetail);
 if(localStorage.getItem('localCart')){
   this.getCartDetails = localStorage.getItem('localCart');
   this.getCartDetails = JSON.parse(this.getCartDetails);
   for(let i=0;i<this.getCartDetails.length;i++){
     if(this.getCartDetails[i].prodId === getCartDetail){
       this.getCartDetails.splice(i,1);
       localStorage.setItem('localCart',JSON.stringify(this.getCartDetails));
       this.loadCart();
       this.cartNumberFunc();
     }
   }
 }
  }
  cartNumber:number = 0;
cartNumberFunc(){
  this.cartValue = localStorage.getItem('localCart');
  this.cartValue = JSON.parse(this.cartValue);
this.cartNumber = this.cartValue.length;
this.auth.cartSubject.next(this.cartNumber);

}
emptycart(){
  this.AuthService.removeAllCart();
}

}
