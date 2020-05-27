import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { MatTableDataSource, MatPaginator, MatSort, Sort } from "@angular/material";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SharedDataService } from "../services/shared-data/shared-data.service";


@Component({
  selector: "app-table-list",
  templateUrl: "./table-list.component.html",
  styleUrls: ["./table-list.component.scss"],
})
export class TableListComponent implements OnInit {
  ELEMENT_DATA: any = [];
  booksFound: boolean = false;
  menuItems: any[];
  id: number;
  _books: number;
  page_number: number;
  length: number;
  page: number = 1;
  action: any = false;
  response: any;
  pagesArray: any[] = [];
  booksArray: any[] = [];

  constructor(private dataService: DataService, private snackBar: MatSnackBar, private sharedDataService: SharedDataService) {

  }
  ngOnInit() {
    this._books = 2;
    setTimeout(() => {
      const booksNavigation: number = this.sharedDataService.getBookNavigation();
      console.log(booksNavigation)
      if (booksNavigation === 0)
        this.getBooks(this.page)
      else {
        this.ELEMENT_DATA = this.sharedDataService.getBooks();
        this.dataSource.data = this.ELEMENT_DATA;
        console.log("me")
        this._books = 1;
      }
    }, 10000)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  getBooks(page) {
    if (this.pagesArray.indexOf(page) === -1) {
      console.log("first if")
      this.pagesArray.push(page);
      setTimeout(() => {
        const { provider_providerName } = this.sharedDataService.getLoggedUser() as any;
        this.dataService.getAllBooks(provider_providerName, page).subscribe((res: any) => {
          this._books = 1;
          this.length = res.total;
          this.sharedDataService.setBooks(res.data);
          this.page_number = (res.current_page - 1);
          let array = [];
          for (const book of res.data) {
            array.push(book.book)
          }
          this.dataSource.data = array;
          this.dataSource.sort = this.sort;
          let cachhe_book = {
            page: this.page_number,
            books: array
          }
          this.booksArray.push(cachhe_book);
        });
      }, 15000)
    } else {
      var result = this.booksArray.filter(obj => {
        return obj.page === (page - 1)
      })
      const resulted_books = result[0].books;
      this.dataSource.data = resulted_books;
      this._books = 1;
    }
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
  setPage(event) {
    this.page = event.pageIndex + 1;
    this._books = 2;
    this.getBooks(this.page);

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
          this.getBooks(this.page);
          this.openSnackBar("Book Deleted Successfully", "");
        });
      });
  }
  logData(row) {
    console.log(row);
  }
  applyFilter(filterString: string) {
    this.dataSource.filter = filterString.trim().toLowerCase();
    console.log(this.dataSource)
    console.log(this.dataSource.filter)

  }
  displayedColumns: string[] = [
    "ISBN",
    "name",
    "publisher",
    "category_categoryName",
    "level_levelName",
    "bookCreated_at",
    "action",
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
}
