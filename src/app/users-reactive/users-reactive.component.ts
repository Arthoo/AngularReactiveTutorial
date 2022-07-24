import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { User } from 'src/model/user.model';

interface UsersStateOptional {
  searchText?: string;
  selectedPageSize?: number;
  pages?: number[];
  selectedPage?: number;
  users?: User[];
  loading?: boolean;
}

interface UsersState extends UsersStateOptional {
  searchText: string;
  selectedPageSize: number;
  pages: number[];
  selectedPage: number;
  users: User[];
  loading: boolean;
}

@Component({
  selector: 'app-users-reactive',
  templateUrl: './users-reactive.component.html',
  styleUrls: ['./users-reactive.component.css']
})
export class UsersReactiveComponent {

  readonly pageSizes = [5, 10, 20, 50];

  readonly initialState: UsersState = {
    searchText: '',
    selectedPageSize: this.pageSizes[1],
    pages: [0],
    selectedPage: 0,
    users: [],
    loading: false
  }

  state$ = new BehaviorSubject<UsersState>(this.initialState);

  searchTextChange$ = new Subject<string>();
  pageSizeChange$ = new Subject();
  pageChange$ = new Subject();

  constructor(private httpClient: HttpClient) {
    const loadUsersActions$ = merge(
      this.searchTextChange$.pipe(map(searchText => this.setState({ searchText })), map(() => false)),
      this.pageSizeChange$.pipe(map(val => Number(val)), map(selectedPageSize => this.setState({ selectedPageSize })), map(() => true)),
      this.pageChange$.pipe(map(val => Number(val)), map(selectedPage => this.setState({ selectedPage })), map(() => true))
    );
    loadUsersActions$.pipe(switchMap((resetPage) => this.loadUsers(resetPage))).subscribe(results => this.handleUsersResults(results as any));
  }

  setState(newValues: UsersStateOptional) {
    const newState = { ...this.state$.value, ...newValues };
    this.state$.next(newState);
  }

  loadUsers(resetPage: boolean) {
    const newState: UsersStateOptional = { loading: true };
    if (resetPage) {
      newState.selectedPage = 0;
    }
    this.setState(newState);
    const state = this.state$.value;
    const params = new HttpParams()
      .append('searchText', state.searchText)
      .append('pageSize', state.selectedPageSize)
      .append('page', state.selectedPage);
    return this.httpClient
    .get('/users', { params })

  }

  handleUsersResults({ users, pages }) {
    pages = Array.from(Array(pages).keys());
    this.setState({ loading: false, users, pages });
  }
}
