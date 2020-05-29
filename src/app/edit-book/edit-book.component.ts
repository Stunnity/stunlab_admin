import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../services/app-data/data.service";
import * as _ from "lodash"
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SharedDataService } from "app/services/shared-data/shared-data.service";
import { openSnackBar } from "../utils/common-methods"
@Component({
  selector: "app-edit-book",
  templateUrl: "./edit-book.component.html",
  styleUrls: ["./edit-book.component.scss"],
})
export class EditBookComponent implements OnInit {

  selectedDay: string = "";
  categories: any;
  levels: any;
  selectedCategory: string = "";
  selectedLevel: string = "";
  btn_text: string;
  book: any;
  id: any;
  data: any;
  isLoading = false;
  formGroup: FormGroup;
  currentProvider: any;


  constructor(
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private _router: Router,
  ) {
    this.formGroup = new FormGroup({
      ISBN: new FormControl({ value: "", disabled: true }, [
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
    this.id = this.route.snapshot.params.id;
    this.getBookById();
    const categoryLevelLoaded = this.sharedDataService.isCategoryLevelSet();
    if (categoryLevelLoaded) {
      const { categories, levels } = this.sharedDataService.getCategoriesLevels();
      this.categories = categories;
      this.levels = levels;
    }
    else
      this.getAllCategories();
    this.btn_text = "Update book"
  }




  getBookById() {
    this.dataService.getOneBook(this.id).subscribe((book) => {
      this.book = book
      this.formGroup.controls.ISBN.setValue(this.book["ISBN"]);
      this.formGroup.controls.bookName.setValue(this.book["bookName"]);
      this.formGroup.controls.bookPublisher.setValue(this.book["bookPublisher"]);
      this.formGroup.controls.bookCategory.setValue(
        book["bookCategory"]
      );
      this.formGroup.controls.bookLevel.setValue(this.book["bookLevel"]);
      this.formGroup.controls.bookDesc.setValue(this.book["bookDesc"]);
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
          this._router.navigate(["/manage-books"]);
        }, err => {
          openSnackBar(this.snackBar, "Book update failed !", "Retry")
        });
      });
  }

  getAllCategories() {
    this.dataService.getCategories().subscribe((res) => {
      this.categories = res;
      this.dataService.getLevels().subscribe((res) => {
        this.levels = res;
        this.sharedDataService.setCategoriesLevels(this.categories, this.levels);
      });
    });
  }


  updateBook() {
    this.isLoading = true;
    const bookData: any = this.formGroup.value;
    this.btn_text = "Updating book";
    if (_.isEqual(bookData, this.book)) {
      this.isLoading = false;
      return;
    }
    bookData["bookProvider"] = this.book["bookProvider"];

    this.dataService
      .updateBook(this.id, bookData)
      .subscribe((book) => {
        this.sharedDataService.resetBookData();
        this._router.navigate(['/manage-books'])
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        this.btn_text = "Update book";

      });

  }
}
