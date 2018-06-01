import { AppPage } from './app.po';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../src/app/app.component';

describe('angular-learn App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it(`should have selectedSort default as 'NameAlphabeticallyAZ'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('NameAlphabeticallyAZ');
  }));
});
