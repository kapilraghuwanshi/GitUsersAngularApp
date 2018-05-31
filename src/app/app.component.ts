import { Component } from '@angular/core';
import { GithubRestApiService } from '../providers/github-rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputName: string = "";
  totalUserCount : number;
  userDataSet: any;
  userDataItems: any = [];
  userDetails: any = [];

  constructor(private gitRestService: GithubRestApiService) {

  }

  searchByName() {
    this.gitRestService.getGithubUsersByName(this.inputName)
      .then(responseData => {
        this.userDataSet = responseData;
        this.totalUserCount = this.userDataSet.total_count;
        console.log(this.totalUserCount);
        console.log(this.userDataSet);
        this.userDataItems = this.userDataSet.items;
        console.log(this.userDataItems);
      }
}

  getUserFullDetails(userTrueName) {
    this.gitRestService.getGithubUserDetails(userTrueName)
      .then(responseData => {
        this.userDetails = responseData;
        console.log(this.userDetails);
      }
}

}