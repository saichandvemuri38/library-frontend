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
  public checkOutLibName;
  public libraryList;
  public checkoutBook;
  public bookDetails;
  public showCheckOutDialog(item) {
    this.checkoutBook = true;
    this.bookDetails= item;
    this.sharedService.get('library-list').subscribe(res => {
      this.libraryList = res.filter(x=> x.name != this.libname)
    })
  }
  public close() {
    this.checkoutBook = false;
    this.checkOutLibName= "";
    this.bookDetails = "";
  }
  public submitReserveBook(){
    let obj = {
      name: this.bookDetails.name,
      description: this.bookDetails.description,
      author: this.bookDetails.author,
      publisher: this.bookDetails.publisher,
      department: this.bookDetails.department,
      price: this.bookDetails.price,
      fromlibraryname: this.libname,
      tolibraryname:this.checkOutLibName.name,
      userId: this.payload.subject
    }
    this.sharedService.post('reserve-book',obj).subscribe(res=>{
      console.log(res);
    })
  }
}
