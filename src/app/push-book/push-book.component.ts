import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from "../services/data.service";
import { HttpHeaders } from "@angular/common/http";
import { PDFDocumentProxy } from "ng2-pdf-viewer";
import { Router } from "@angular/router";
import { SharedDataService } from "app/services/shared-data/shared-data.service";
import { start, counter } from "../utils/timer";

@Component({
  selector: "app-push-book",
  templateUrl: "./push-book.component.html",
  styleUrls: ["./push-book.component.scss"],
})
export class PushBookComponent implements OnInit {
  pdfSrc: string = "";
  formData = new FormData();
  isLoading = false;
  totalPages: any;
  btn_text: string = "Push Book";
  page_resolved = false;
  gotCover: boolean = false;
  bookFile: any = null;
  fileUploaded: boolean = false;
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
      ISBN: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/),
      ]),
      bookName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      bookPublisher: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      bookCategory: new FormControl("", Validators.required),
      bookLevel: new FormControl("", Validators.required),
      bookDesc: new FormControl("", [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  ngOnInit() {

    setTimeout(() => {
      const categoryLevelLoaded = this.sharedDataService.isCategoryLevelSet();
      if (categoryLevelLoaded) {
        const { categories, levels } = this.sharedDataService.getCategoriesLevels();
        this.categories = categories;
        this.levels = levels
      }
      else this.getAllCategories();

    }, 10000)
    setTimeout(() => {
      this.currentProvider = this.sharedDataService.getLoggedUser();
      console.log(this.currentProvider);
    }, 13000);
  }

  callBackFn(pdf: PDFDocumentProxy) {
    this.totalPages = pdf.numPages;
  }

  onFileSelected(event) {
    let file: any = event.files;
    if (typeof FileReader !== "undefined") {
      let reader = new FileReader();
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
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  getBookCover() {
    let testCanvas: any = document.querySelector("#page1");
    if (testCanvas) {
      let _bookCover = testCanvas.toDataURL();
      return _bookCover;
    } else return null;
  }

  pushBook() {
    const start_at = start();

    this.isLoading = true;
    this.btn_text = "Pushing book";
    const book_data: any = this.formGroup.value;
    book_data.bookProvider = this.currentProvider.provider_providerName;
    book_data.bookCover = this.getBookCover();
    book_data.bookPages = this.totalPages;
    console.log(book_data);
    this.dataService.uploadBook(book_data).subscribe(
      (res) => {
        setTimeout(() => {
          this.dataService.pushBookCredents(headers, myFormData).subscribe(
            (res) => {
              this.btn_text = "Push Book";
              this.isLoading = false;
              this.sharedDataService.setDashboardNavigation(0);
              this.sharedDataService.setBookNavigation(0);
              this.router.navigate(["/manage-books"]);
            },
            (err) => {
              this.btn_text = "Push Book";
              this.isLoading = false;
            }
          );
        }, 2000);
        var myFormData = new FormData();
        const headers = new HttpHeaders();
        headers.append("Content-Type", "multipart/form-data");
        headers.append("Accept", "application/json");
        myFormData.append("bookISBN", book_data.ISBN);
        myFormData.append("bookPages", book_data.bookPages);
        myFormData.append("bookFile", this.bookFile);
      },
      (err) => {
        this.btn_text = "Push Book";
        this.isLoading = false;
        this.openSnackBar("Upload Failed", "");
      }
    );
  }

  getAllCategories() {
    this.dataService.getCategories().subscribe((res) => {
      this.categories = res;
      this.dataService.getLevels().subscribe((res) => {
        this.levels = res;
        this.sharedDataService.setCategoriesLevels(this.categories, this.levels)

      });
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: "top",
      panelClass: ["mat-toolbar", "mat-accent"],
    });
  }
}
