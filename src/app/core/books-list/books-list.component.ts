import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  public bookList: any = [];
  public payload: any;
  public libname;
  public checkOutLibName;
  public libraryList;
  public checkoutBook;
  public bookDetails;

  constructor(public sharedService: SharedService, private sanitizer: DomSanitizer, public router: ActivatedRoute) { }

  ngOnInit(): void {
    this.payload = JSON.parse(sessionStorage.getItem("payload"));
    console.log(this.router.snapshot.queryParamMap.get('libraryname'));
    this.libname = this.router.snapshot.queryParamMap.get('libraryname') ?? "";
    this.getRecords();
  }
  getRecords() {
    this.sharedService.get("book-list?libraryname=" + this.libname).subscribe(res => {
      this.bookList = res;
    })
  }
  checkIn(item) {
    console.log(item)
    let date = new Date();
    date.setDate(date.getDate() + 30);

    let obj = {
      bookId: item._id,
      name: item.name,
      image: item.image,
      author: item.author,
      publisher: item.publisher,
      department: item.department,
      price: item.price,
      quantity: item.quantity,
      availability: item.availability,
      rent: item.rent,
      libraryname: item.libraryname,
      userId: this.payload.subject,
      status: "check-in",
      startDate: (new Date()).toLocaleString('en-US'),
      endDate: date.toLocaleString('en-US')
    }
    this.sharedService.post('check-in', obj).subscribe((res) => {
      console.log(res);
      this.getRecords();
    })
  }

  public submitReserveBook(product) {
    console.log(product)
    let obj = {
      image: product.image,
      name: product.name,
      bookId: product._id,
      description: product.description,
      author: product.author,
      publisher: product.publisher,
      department: product.department,
      price: product.price,
      libraryname: this.libname,
      userId: this.payload.subject
    }
    this.sharedService.post('reserve-book', obj).subscribe(res => {
      console.log(res);
    })
  }
}
