import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { finalize, map } from 'rxjs/operators';

export interface SearchResults {
  login: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements OnInit {
  searchExecuted = false;
  searchField = new FormControl('', [Validators.required]);
  searchResult$: BehaviorSubject<SearchResults[]> = new BehaviorSubject<
    SearchResults[]
  >([]);
  searching$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  error$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  totalResults = 0;
  itemPerPages = 5;
  page = 1;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

  performSearch(page: number): void {
    this.searchExecuted = true;
    this.searchResult$.next([]);

    this._http
      .get<any>('https://api.github.com/search/users', {
        params: {
          q: `${this.searchField.value} in:email OR ${this.searchField.value} in:login`,
          per_page: this.itemPerPages,
          page,
        },
      })
      .pipe(
        finalize(() => this.searching$.next(false)),
        map((results: any) => {
          this.totalResults = results.total_count;
          return results.items.map((result: any) => this.adapt(result));
        })
      )
      .subscribe(
        (items: any[]) => {
          items.forEach((item) => {
            this.fetchUserDetails(item).subscribe((v) =>
              this.searchResult$.next([...this.searchResult$.value, v])
            );
          });
        },
        (error: any) => {
          alert(error);
        }
      );
  }

  fetchUserDetails(result: any): Observable<any> {
    return this._http.get<any>(result.url).pipe(map((res) => res));
  }

  onPaginationChanged(evt: any): void {
    this.itemPerPages = evt.pageSize;
    this.performSearch(evt.pageIndex);
  }

  adapt(result: any): SearchResults {
    return ['login', 'id', 'avatar_url', 'url'].reduce(
      (prev: any, next: string) => {
        prev[next] = result[next];
        return prev;
      },
      {}
    ) as SearchResults;
  }
}
