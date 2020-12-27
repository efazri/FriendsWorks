import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import axios from 'axios';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {
  post:any = {}
  likesIcon:any = "favorite_border"
  likesColor:any = "black"
  loading:boolean = true
  comments:any = []
  showBar:any = true
  constructor(
    private router: ActivatedRoute,
    private location : Location,
    private directRoute : Router
  ) { }

  backLoc() {
    this.location.back()
  }

  likePost() {
    if (this.likesColor === "black"){
      let numberLikes = this.post.likes
      Number(numberLikes)
      numberLikes++
      this.post.likes = numberLikes
      this.likesColor = "red"
      this.likesIcon = "favorite"
    } else {
      let numberLikes = this.post.likes
      Number(numberLikes)
      numberLikes--
      this.post.likes = numberLikes
      this.likesColor = "black"
      this.likesIcon = "favorite_border"
    }
  }

  fetchData() {
    const id = this.router.snapshot.params.id
    axios({
      url: `https://dummyapi.io/data/api/post/${id}`,
      method: "GET",
      headers: {
       "app-id": "5fe6b82247b5850f64944b14"
      }
    })
    .then(({ data}) => {
      this.post = data
      return axios({
        url: `https://dummyapi.io/data/api/post/${id}/comment`,
        method: "GET",
        headers: {
         "app-id": "5fe6b82247b5850f64944b14"
        }
      })
    })
    .then( response => {
      this.comments = response.data.data
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

    if(!localStorage.getItem("access_token")){
      this.directRoute.navigate(['/login'])
    } else {
      this.fetchData()
    }

    
  }

}
