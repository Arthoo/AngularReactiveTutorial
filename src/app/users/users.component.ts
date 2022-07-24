import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  readonly pageSizes = [5, 10, 20, 50];
  selectedPageSize = 10;
  pages = [0];
  selectedPage = 0;

  loading = false;
  searchText = '';
  users: User[] | null = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers(false);
  }

  loadUsers(resetPage: boolean) {
    if (resetPage) {
      this.selectedPage = 0;
    }
    this.loading = true;
    const params = new HttpParams()
      .append('searchText', this.searchText)
      .append('pageSize', this.selectedPageSize)
      .append('page', this.selectedPage);
    this.httpClient
    .get('/users', { params })
    .subscribe(results => this.handleUsersResults(results as any));
  }

  handleUsersResults({ users, pages }) {
    this.users = users as User[];
    this.pages = Array.from(Array(pages).keys());
    this.loading = false;
  }
}
