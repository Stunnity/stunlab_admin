import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/app-data/data.service';
import { HttpHeaders } from '@angular/common/http';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { Router } from '@angular/router';
import { SharedDataService } from 'app/services/shared-data/shared-data.service';
import { openSnackBar } from '../utils/common-methods'

@Component({
  selector: 'app-push-book',
  templateUrl: './push-book.component.html',
  styleUrls: ['./push-book.component.scss'],
})

export class PushBookComponent implements OnInit {

  pdfSrc = '';
  formData = new FormData();
  isLoading = false;
  totalPages: any;
  btn_text = 'Push Book';
  page_resolved = false;
  gotCover = false;
  bookFile: any = null;
  fileUploaded = false;
  categories: any;
  levels: any;
  formGroup: FormGroup;
  currentProvider: any;
  uploadedFiles: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.formGroup = new FormGroup({
      ISBN: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/),
      ]),
      bookName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      bookPublisher: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      bookCategory: new FormControl('', Validators.required),
      bookLevel: new FormControl('', Validators.required),
      bookDesc: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  ngOnInit() {
    const categoryLevelLoaded = this.sharedDataService.isCategoryLevelSet();
    if (categoryLevelLoaded) {
      const { categories, levels } = this.sharedDataService.getCategoriesLevels();
      this.categories = categories;
      this.levels = levels
    } else { this.getAllCategories(); }
    this.sharedDataService.getLoggedUser().subscribe(data => {
      this.currentProvider = data
    });
  }

  callBackFn(pdf: PDFDocumentProxy) {
    this.totalPages = pdf.numPages;
  }

  onFileSelected(event) {
    const file: any = event.files;
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        this.page_resolved = true;
      };
      this.bookFile = file[0];
      this.fileUploaded = true;
      reader.readAsArrayBuffer(file[0]);
    }
  }
  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  getBookCover() {
    const testCanvas: any = document.querySelector('#page1');
    if (testCanvas) {
      const _bookCover = testCanvas.toDataURL();
      return _bookCover;
    } else { return null; }
  }

  pushBook() {
    this.isLoading = true;
    this.btn_text = 'Pushing book';
    const book_data: any = this.formGroup.value;
    book_data['bookProvider'] = this.currentProvider['provider_providerName'];
    book_data['bookCover'] = this.getBookCover();
    book_data['bookPages'] = this.totalPages;
    this.dataService.uploadBook(book_data).subscribe(
      (book) => {
        const myFormData = new FormData();
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        myFormData.append('bookISBN', book_data.ISBN);
        myFormData.append('bookPages', book_data.bookPages);
        myFormData.append('bookFile', this.bookFile);

        this.dataService.pushBookCredents(headers, myFormData).subscribe(
          (res) => {
            this.btn_text = 'Push Book';
            this.isLoading = false;
            this.sharedDataService.resetBookData();
            this.router.navigate(['/manage-books']);
          },
          (err) => {
            this.btn_text = 'Push Book';
            this.isLoading = false;
          }

        );
      },
      (err) => {
        this.btn_text = 'Push Book';
        this.isLoading = false;
        openSnackBar(this.snackBar, 'Upload Failed', '');
      }
    );
  }

  getAllCategories() {
    this.dataService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.dataService.getLevels().subscribe((levels) => {
        this.levels = levels;
        this.sharedDataService.setCategoriesLevels(this.categories, this.levels)
      });
    });
  }


}
