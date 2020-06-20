import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/app-data/data.service';
@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.scss'],
})
export class ReadBookComponent implements OnInit {
  ISBN: any;
  data: any;
  bookReady: boolean;
  validParam: boolean;
  fileNotFound: boolean;
  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }
  ngOnInit() {
    this.bookReady = false;
    this.route.queryParams.subscribe((params) => {
      if (!params.ISBN) {
        this.validParam = false;
        this.bookReady = true;
        return;
      }
      this.validParam = true;
      const ISBN = params.ISBN;
      this.getBook(ISBN);
    });


  }

  getBook(ISBN: string) {
    this.dataService.getOneBook(ISBN).subscribe((res: any) => {

      this.bookReady = true;
      window.open(res.bookFile, '_self');
      this.fileNotFound = false;
    }, (err: HttpErrorResponse) => {
      this.bookReady = true;
      this.fileNotFound = true;
    });
  }
}
