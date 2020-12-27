import { Component, OnInit } from '@angular/core';
import axios from 'axios'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users:any = []
  showBar:any = true
  constructor() { 
    
  }

  ngOnInit(): void {
  
  }

}
