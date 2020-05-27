import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../services/data.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-read-book",
  templateUrl: "./read-book.component.html",
  styleUrls: ["./read-book.component.scss"],
})
export class ReadBookComponent implements OnInit {
  ISBN: any;
  data: any;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}
  @ViewChild("pdfViewerOnDemand", { static: false }) pdfViewerOnDemand;
  @ViewChild("pdfViewerAutoLoad", { static: false }) pdfViewerAutoLoad;
  ngOnInit() {
    this.ISBN = this.route.snapshot.params.id;

    this.dataService.getOneBook(this.ISBN).subscribe((res) => {
      this.data = res;
      this.pdfViewerAutoLoad.pdfSrc = this.data.bookUrl;
      console.log(this.pdfViewerAutoLoad.pdfSrc);
      this.pdfViewerAutoLoad.refresh();
      console.log(this.pdfViewerAutoLoad);
      console.log(res);
    });
  }
}
