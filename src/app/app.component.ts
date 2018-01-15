import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  income: Number = 0;
  expenses: Number = 0;
  advance_tax: Number = 0;
  advance_ins: Number = 0;
}
