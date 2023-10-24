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
  public payload:any;
  constructor(public sharedService: SharedService, private sanitizer: DomSanitizer, public router: ActivatedRoute) { }

  ngOnInit(): void {
    this.payload = JSON.parse(localStorage.getItem("payload"));
    console.log(this.router.snapshot.queryParamMap.get('libraryname'));
    let name = this.router.snapshot.queryParamMap.get('libraryname')??"";
    this.sharedService.get("book-list?libraryname="+name).subscribe(res => {
      this.bookList = res;
    })
  }
  addToCart(item){
    item.userId = this.payload.subject;
    this.sharedService.post('add-cart',item).subscribe((res)=>{
      console.log(res)
    })
  }
}
