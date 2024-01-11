import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public constructor(private readonly _httpClient: HttpClient) {}

  public cars(): void {
    this._httpClient
      .get("/api/cars")
      .subscribe(x => {
        alert(JSON.stringify(x));
      });
  }

  public bikes(): void {
    this._httpClient
      .get("/api/bikes")
      .subscribe(x => {
        alert(JSON.stringify(x));
      });}
}
