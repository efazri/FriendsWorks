import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  loading:any = true
  userPosts:any = {}
  showBar:any = true
  constructor(
    private router : ActivatedRoute,
    private directRoute : Router
  ) { }

  getUserData () {
    const id = this.router.snapshot.params.id
    axios({
      url: `https://dummyapi.io/data/api/user/${id}/post`,
      method: "GET",
      headers: {
       "app-id": "5fe6b82247b5850f64944b14"
      }
    })
    .then(({ data }) => {
      this.userPosts = data.data
      this.loading = false
    })
    .catch( err => {
      this.directRoute.navigate(['/error'])
    })
  }

  logout() {
    localStorage.clear()
    this.directRoute.navigate(['/dashboard'])
  }

  ngOnInit(): void {
    if(!localStorage.getItem('access_token')){
      this.directRoute.navigate(['/login'])
    } else {
      this.getUserData()
    }
  }

}
