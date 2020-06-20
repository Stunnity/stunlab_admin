import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/app-data/data.service';
import { MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedDataService } from '../services/shared-data/shared-data.service';
import * as  _ from 'lodash';
import { openSnackBar, _compare, sortedData, filter } from '../utils/common-methods';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {

  ELEMENT_DATA: any = [];
  booksFound = false;
  menuItems: any[];
  id: number;
  _books: number;
  page_number: number;
  length: number;
  page = 1;
  action: any = false;
  response: any;
  pagesArray: any[] = [];
  booksArray: any[] = [];
  displayedColumns: string[] = [
    'ISBN',
    'name',
    'publisher',
    'category_categoryName',
    'level_levelName',
    'bookCreated_at',
    'action',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dataService: DataService, private router: Router,
    private snackBar: MatSnackBar, private sharedDataService: SharedDataService) { }
  ngOnInit() {
    this._books = 2;
    this.sharedDataService.getBookNavigation().subscribe(value => {
      const booksNavigation = value;
      if (booksNavigation === 0) {
        this.getBooks(this.page);
      } else {
        this._books = 2;
        this.sharedDataService.getBooks().subscribe(bookResponse => {
          this.sharedDataService.getBookPagination().subscribe(paginated => {
            if (_.isEmpty(paginated)) {
              return;
            }
            this.ELEMENT_DATA = paginated;
            this.ELEMENT_DATA = this.ELEMENT_DATA.filter(obj => {
              return obj.page === (this.page - 1);
            })
            if (this.ELEMENT_DATA[0] === undefined) {
              return;
            }
            this.page = this.ELEMENT_DATA[0]['page'];
            this.length = this.ELEMENT_DATA[0]['total'];
            this.dataSource.data = this.ELEMENT_DATA[0]['books'];
            this._books = 1;
          })
        });
      }
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  getBooks(page) {
    this._books = 2;
    this.sharedDataService.getPageArray().subscribe(pageArray => {
      if (this.pagesArray.indexOf(page) === -1) {
        this.pagesArray.push(page);
        this.sharedDataService.setPageArray(this.pagesArray);
        this.sharedDataService.getLoggedUser().subscribe(userData => {
          if (_.isEmpty(userData)) {
            return;
          }
          const user = userData;
          this.dataService.getAllBooks(user['provider_providerName'], page).subscribe((res: any) => {
            this._books = 1;
            this.length = res.total;
            this.sharedDataService.setBooks(res.data);
            this.page_number = (res.current_page - 1);
            const array = [];
            for (const book of res.data) {
              array.push(book.book)
            }
            this.dataSource.data = array;
            this.dataSource.sort = this.sort;
            const cache_book = {
              page: this.page_number,
              books: array,
              total: this.length
            }
            this.booksArray.push(cache_book);
            this.sharedDataService.setBookPagination(this.booksArray);
          });
        })
      } else {
        this.sharedDataService.getBookPagination().subscribe(res => {
          if (_.isEmpty(res)) {
            return
          }
          let paginated: any = {}
          paginated = res;
          paginated = paginated.filter(obj => {
            return obj.page === (page - 1)
          })
          if (paginated[0] === undefined) {
            return;
          }
          this.dataSource.data = paginated[0].books;
          this._books = 1;
        })

      }
    })
  }


  sortData(sort: Sort) {
    sortedData(this.dataSource, sort)
  }
  deleteBook(id) {
    this.openDeleteSnackBar('Are you sure to delete the book ', 'Confirm', id);
  }

  setPage(event) {
    this.page = event.pageIndex + 1;
    this._books = 2;
    this.getBooks(this.page);
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
          this.getBooks(this.page);
          openSnackBar(this.snackBar, 'Book Deleted Successfully', '');
        });
      });
  }

  readBook(book) {
    this.router.navigate(['/view/book'], { queryParams: { ISBN: book } });
  }
  applyFilter(filterString: string) {
    filter(this.dataSource, filterString);
  }
}
