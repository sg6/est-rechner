import { Component, OnInit } from '@angular/core';
import { FeeCalc } from './helper/fee_calc';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [FeeCalc],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'app';

  income: number = 35000;
  expenses: number = 0;
  ebitsva: number = 0;
  ebit: number = 0;
  est: number = 0;
  advance_tax: number = 0;
  advance_ins: number = 0;

  full_payments: number = 0;
  advance_pamyments: number = 0;
  open_payments: number = 0;

  sva_sum: number = 0;
  profit: number = 0;
  base: number = 0;

  additional_allowance: number = 0;
  allowance: number = 0;
  flat: boolean = false;

  readonly MAX_ALLOWANCE = 4500;
  readonly ALLOWANCE_RATE = 0.15;

  constructor(
    private _calc: FeeCalc) { }

  ngOnInit() {
    registerLocaleData(localeDe);
    this.calcSum();
  }

  calcSum() {
    this.ebit = this.income - (this.expenses)
    this.advance_pamyments = this.advance_ins + this.advance_tax

    this.allowance = Math.min(this.MAX_ALLOWANCE, this.ALLOWANCE_RATE * this.ebit) + this.additional_allowance
    if (this.flat) {
      this.allowance += this.income * 0.12
    }
    this.base = this.ebit - this.allowance

    this.sva_sum = this._calc.svaCalc(this.base);
    this.est = this._calc.estCalc(this.base - this.sva_sum);

    this.full_payments = this.est + this.sva_sum;
    this.open_payments = this.full_payments - this.advance_pamyments;

    this.profit = this.ebit - this.est - this.sva_sum;
  }
}
