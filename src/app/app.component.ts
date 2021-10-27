import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'd2-Search';
  isLightTheme: boolean = false;

  ngOnInit() {}

  themeHandler() {
    this.isLightTheme = !this.isLightTheme;
  }
}
