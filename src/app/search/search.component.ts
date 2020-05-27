import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, Event, NavigationEnd } from "@angular/router";
import { DataService } from "../services/data.service";
import { MatTableDataSource, MatPaginator, MatSort, Sort } from "@angular/material";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SharedDataService } from "app/services/shared-data/shared-data.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  anyResults: boolean;
  search: any;
  found_books: number;
  _books: number;
  searchResult: any;
  ELEMENT_DATA: any;
  booksFound: boolean = false;
  menuItems: any[];
  id: number;
  books: any;
  action: any = false;
  response: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private sharedData: SharedDataService,
    private snackBar: MatSnackBar,

  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.search = this.activatedRoute.snapshot.paramMap.get("search");
        this.searchBooks(this.search);
      }
    })
  }

  ngOnInit() {
    this._books = 2;
    this.dataSource.sort = this.sort;

  }

  deleteBook(id) {
    this.openDeleteSnackBar("Are you sure to delete the book ", "Confirm", id);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ["mat-toolbar", "mat-primary"],
    });
  }

  openDeleteSnackBar(message: string, action: string, id: any) {
    this.snackBar
      .open(message, action, {
        duration: 3000,
        verticalPosition: "top",
      })
      .onAction()
      .subscribe(() => {
        this.dataService.deleteBook(id).subscribe((res) => {
          this.openSnackBar("Book Deleted Successfully", "");
        });
      });
  }

  searchBooks(search) {
    setTimeout(() => {
      const user: any = this.sharedData.getLoggedUser();
      this.dataService
        .searchBook(search, user.provider_providerName)
        .subscribe((res: any) => {
          let array = [];
          this._books = 1;
          this.ELEMENT_DATA = res;
          for (const book of res) {
            array.push(book.book)
          }
          console.log(array)
          this.found_books = this.ELEMENT_DATA.length;
          this.dataSource.data = array;

          this._books = 1;
        }, err => {
          this._books = 0;
        });
      // this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 3000);
  }
  logData(row) {
    console.log(row);
  }
  sortData(sort: Sort) {
    // Sort sorts the current list, but it wasnt updating it unless i reassigned.
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this._compare(a[sort.active], b[sort.active], isAsc);
    });
  }
  private _compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  applyFilter(filterString: string) {
    this.dataSource.filter = filterString.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  displayedColumns: string[] = [
    "ISBN",
    "bookName",
    "bookPublisher",
    "bookCategory",
    "bookLevel",
    "Action",
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
}
