import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-reactive',
  templateUrl: './users-reactive.component.html',
  styleUrls: ['./users-reactive.component.css']
})
export class UsersReactiveComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get('/users').subscribe((res) => console.log(res));
  }
}
