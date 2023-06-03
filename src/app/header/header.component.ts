import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount: any;
 

  constructor(private auth : AuthService) {
    this.auth.cartSubject.subscribe((data)=>{
     this.cartItem = data;
    });
   }

  ngOnInit(): void {
    this.cartItemFunc()
  }
 cartItem:number = 0;
 cartItemFunc(){
if(localStorage.getItem('localCart') !=null){
  this.cartCount = localStorage.getItem('localCart');
  this.cartCount = JSON.parse(this.cartCount);
 this.cartItem = this.cartCount.length;

}
 }
}
