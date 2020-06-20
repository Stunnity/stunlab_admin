import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd, NavigationStart } from '@angular/router';
import { DataService } from '../services/app-data/data.service';
import { MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedDataService } from 'app/services/shared-data/shared-data.service';
import * as _ from 'lodash'
import { openSnackBar, sortedData, filter } from '../utils/common-methods'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  anyResults: boolean;
  search: any;
  found_books: number;
  _books: number;
  searchResult: any;
  ELEMENT_DATA: any;
  booksFound = false;
  menuItems: any[];
  id: number;
  books: any;
  action: any = false;
  response: any;

  displayedColumns: string[] = [
    'ISBN',
    'bookName',
    'bookPublisher',
    'bookCategory',
    'bookLevel',
    'Action',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private sharedData: SharedDataService,
    private snackBar: MatSnackBar,

  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.search = this.activatedRoute.snapshot.paramMap.get('search');
        this.searchBooks(this.search);
        this._books = 2;
      }
    })
  }

  ngOnInit() {
    this._books = 2;
    this.dataSource.sort = this.sort;
  }

  deleteBook(id) {
    this.openDeleteSnackBar('Are you sure to delete the book ', 'Confirm', id);
  }

  readBook(book) {
    this.router.navigate(['/view/book'], { queryParams: { ISBN: book } });
  }

  openDeleteSnackBar(message: string, action: string, id: any) {
    this.snackBar
      .open(message, action, {
        duration: 3000,
        verticalPosition: 'top',
      })
      .onAction()
      .subscribe(() => {
        this.dataService.deleteBook(id).subscribe((res) => {
          openSnackBar(this.snackBar, 'Book Deleted Successfully', '');
        });
      });
  }

  searchBooks(search) {
    this.sharedData.getLoggedUser().subscribe(user => {
      if (_.isEmpty(user)) {
        return;
      }
      this.dataService
        .searchBook(search, user['provider_providerName'])
        .subscribe((books: any) => {
          this._books = 1;
          this.found_books = books.length;
          if (this.found_books === 0) {
            this._books = 0;
            return;
          }
          for (const book of books) {
            this.ELEMENT_DATA.push(book.book)
          }
          this.dataSource.data = this.ELEMENT_DATA;
          this._books = 1;
        }, err => {
          this._books = -1;
        });
      this.dataSource.paginator = this.paginator;
    });
  }


  sortData(sort: Sort) {
    sortedData(this.dataSource, sort);
  }

  applyFilter(filterString: string) {
    filter(this.dataSource, filterString);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
