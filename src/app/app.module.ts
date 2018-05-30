import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GithubRestApiService } from '../providers/github-rest-api.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GithubRestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
