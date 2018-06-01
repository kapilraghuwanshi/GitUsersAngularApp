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
  selectedSort: string = "NameAlphabeticallyAZ";

  filteredItems: any = [];
  pages: number;
  pageSize: number = 3;
  pageNumber: number = 0;
  currentIndex: number = 1;
  pagesIndex: Array<number>;
  pageStart: number = 1;

  constructor(private gitRestService: GithubRestApiService) {
    //default call for Shantanu on initialization
    this.gitRestService.getGithubUsersByName("Shantanu")
      .then(responseData => {
        this.userDataSet = responseData;
        this.totalUserCount = this.userDataSet.total_count;
        this.userDataItems = this.userDataSet.items;
        this.filteredItems = this.userDataItems;
        this.initPagination();
      });
    console.log(this.userDataItems);
  }

  // Search by name method - if name empty then default otherwise by name
  searchByName() {
    if (this.inputName != "") {
      this.gitRestService.getGithubUsersByName(this.inputName)
        .then(responseData => {
          this.userDataSet = responseData;
          this.totalUserCount = this.userDataSet.total_count;
          this.userDataItems = this.userDataSet.items;
          this.filteredItems = this.userDataItems;
          this.initPagination();
        });
    }
    else {
      //default search by shantanu
      this.gitRestService.getGithubUsersByName("Shantanu")
        .then(responseData => {
          this.userDataSet = responseData;
          this.totalUserCount = this.userDataSet.total_count;
          this.userDataItems = this.userDataSet.items;
          this.filteredItems = this.userDataItems;
          this.initPagination();
        });
    }

  }

  // Get full details method
  getUserFullDetails(userTrueName) {

    this.gitRestService.getGithubUserDetails(userTrueName)
      .then(responseData => {
        this.userDetails = responseData;
        console.log(this.userDetails);
      });
  }

  //Sorting method
  SortingResult() {
    if (this.selectedSort === "NameAlphabeticallyAZ") {
      this.userDataItems.sort();
    }
    else if (this.selectedSort === "NameReverseAlphabeticallyZA") {
      this.userDataItems.reverse();
    }
    else if (this.selectedSort === "RankUp") {
      console.log("Inside RankUp");
      this.userDataItems.sort((a,b)=>{
        return a.score < b.score;
      });
    }
    else if (this.selectedSort === "RankDown") {
      console.log("Inside RankDown");
      this.userDataItems.sort((a, b) => {
        return a.score > b.score;
      });
    }

  }


  //Pagination methods
  initPagination() {
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = this.filteredItems.length / this.pageSize;

    this.pageNumber = parseInt("" + (this.filteredItems.length / this.pageSize));

    if (this.filteredItems.length % this.pageSize != 0) {
      this.pageNumber++;
    }

    if (this.pageNumber < this.pages) {
      this.pages = this.pageNumber;
    }

    this.refreshItems();
    console.log("this.pageNumber :  " + this.pageNumber);
  }

  fillArray(): any {
    var obj = new Array();
    for (var index = this.pageStart; index < this.pageStart + this.pages; index++) {
      obj.push(index);
    }
    return obj;
  }

  refreshItems() {
    this.userDataItems = this.filteredItems.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex = this.fillArray();
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