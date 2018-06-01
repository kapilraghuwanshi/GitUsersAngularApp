import { Component } from '@angular/core';
import { GithubRestApiService } from '../providers/github-rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputName: string = "";
  totalUserCount: number;
  userDataSet: any;
  userDataItems: any = [];
  userDetails: any = [];

  pages: number = 5;
  pageSize: number = 3;
  pageNumber: number = 0;
  currentIndex: number = 1;
  pagesIndex: Array<number>;
  pageStart: number = 1;

  constructor(private gitRestService: GithubRestApiService) {
    
  }

  // Search by name method
  searchByName() {
    this.gitRestService.getGithubUsersByName(this.inputName)
      .then(responseData => {
        this.userDataSet = responseData;
        this.totalUserCount = this.userDataSet.total_count;
        // console.log(this.totalUserCount);
        //  console.log(this.userDataSet);
        this.userDataItems = this.userDataSet.items;
        this.initPagination();
        //  console.log(this.userDataItems);
      });
  }

   // Get full details method
  getUserFullDetails(userTrueName) {
    this.gitRestService.getGithubUserDetails(userTrueName)
      .then(responseData => {
        this.userDetails = responseData;
        //console.log(this.userDetails);
        // this.userName = this.userDetails[1].owner.login;
        // console.log(this.userName);
      });
  }

  //Pagination method
  initPagination() {
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = 5;

    this.pageNumber = parseInt("" + (this.userDataItems.length / this.pageSize));

    if (this.userDataItems.length % this.pageSize != 0) {
      this.pageNumber++;
    }

    if (this.pageNumber < this.pages) {
      this.pages = this.pageNumber;
    }

    this.refreshItems();
    console.log("this.pageNumber :  " + this.pageNumber);
  }

  refreshItems() {
    this.userDataItems = this.userDataItems.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
  }

  prevPage() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
    }
    if (this.currentIndex < this.pageStart) {
      this.pageStart = this.currentIndex;
    }
    this.refreshItems();
  }
  nextPage() {
    if (this.currentIndex < this.pageNumber) {
      this.currentIndex++;
    }
    if (this.currentIndex >= (this.pageStart + this.pages)) {
      this.pageStart = this.currentIndex - this.pages + 1;
    }

    this.refreshItems();
  }

  setPage(index: number) {
    this.currentIndex = index;
    this.refreshItems();
  }

}