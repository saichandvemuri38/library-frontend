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
  constructor(public sharedService: SharedService, private sanitizer: DomSanitizer, public router: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.router.snapshot.queryParamMap.get('libraryname'));
    let name = this.router.snapshot.queryParamMap.get('libraryname')??"";
    this.sharedService.get("book-list?libraryname="+name).subscribe(res => {
      this.bookList = res;
    })
  }
}
