import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private router:Router, private authService:AuthService) { }

  login(){
    //Go to backend
    //User
    this.authService.login()
        .subscribe(resp => {
          if(resp.id){
            //Navigate
            this.router.navigate(['./sf']);
          }
        })
  }
}
