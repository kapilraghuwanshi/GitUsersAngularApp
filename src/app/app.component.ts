import { Component } from '@angular/core';
import { GithubRestApiService } from '../providers/github-rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputName: string = "";
  userDataSet: any;
  userDataItems: any = [];
  userDetails: any = [];

  constructor(private gitRestService: GithubRestApiService) {

  }

  searchByName() {
    this.gitRestService.getGithubUsersByName(this.inputName)
      .then(responseData => {
        this.userDataSet = responseData;
        console.log(this.userDataSet);
        this.userDataItems = this.userDataSet.items;
        console.log(this.userDataItems);
      }
}

  getUserFullDetails() {
    this.gitRestService.getGithubUserDetails(this.inputName)
      .then(responseData => {
        this.userDetails = responseData;
        console.log(this.userDetails);
      }
}

}