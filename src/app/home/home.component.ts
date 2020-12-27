import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import axios from 'axios'
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users:any = []
  @Input() pictures:any
  postsId:any = []
  id:any = ''
  comments:any = []
  likeStyle:any = "favorite_border"
  showBar:any = true
  constructor(
    private router : Router
  ) {}

  getPictures() {
    axios({
      url: "https://dummyapi.io/data/api/post",
      method: "GET",
      headers: {
       "app-id": "5fe6b82247b5850f64944b14"
      }
    })
    .then(({ data }) => {
      this.pictures = data.data
    })
    .catch(err => {
      this.router.navigate(['/error'])
    })
  }
  
  likePost(id:any) {
    if (this.likeStyle === 'favorite_border') {
      this.likeStyle = 'favorite'
      for(let i = 0; i < this.pictures.length; i++) {
        if (this.pictures[i].id === id) {
          console.log(id)
          console.log(this.pictures[i].id)
          Number(this.pictures[i].likes) 
          this.pictures[i].likes += 1
        }
      }
    } else {
      this.likeStyle = 'favorite_border'
      for(let i = 0; i < this.pictures.length; i++) {
        if (this.pictures[i].id === id) {
          Number(this.pictures[i].likes) 
          this.pictures[i].likes -= 1
        }
      }
    }
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/dashboard'])
  }

  ngOnInit() :void {
    if(!localStorage.getItem("access_token")){
      this.router.navigate(['/login'])
    } else {
      this.getPictures()
    }
  }


}
