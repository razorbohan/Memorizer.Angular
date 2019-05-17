import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'memo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  private isOpenMenu: boolean;

  constructor(private http: Http) { }

  public closeMenu() {
    this.isOpenMenu = false;
  }

  async submitNewMemo(newQuestion: string, newAnswer: string) {
    try {
      let body = {
        question: newQuestion,
        answer: newAnswer
      };
      //this.isLoading = true;
      let response = await this.http.post("/Home/Add", body).toPromise();     
      //this.message = response.toString();
    } catch (error) {
      //this.message = error.statusText;
    }
  }
}