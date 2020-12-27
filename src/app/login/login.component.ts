import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error:any = false
  hide = true
  showBar:any = false
  user:any = { email: 'test@mail.com', password: `qweqwe`}
  constructor(
    private router : Router
  ){}

  loginUser(data:any){
    axios({
      url: 'https://frozen-inlet-96730.herokuapp.com/login',
      method: 'POST',
      data: {
        email: data.email,
        password: data.password
      }
    })
    .then( ({ data }) => {
      localStorage.setItem('access_token', data.access_token)
      this.router.navigate(['/home'])
    })
    .catch(err => {
      this.error = true
    })
  }

  ngOnInit(): void {
  }

}
