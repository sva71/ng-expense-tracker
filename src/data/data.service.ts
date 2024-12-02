import { Injectable } from '@angular/core';
import { Filters, Transaction, Transactions } from './interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  transactions: Transactions = [];
  maxId = 0;
  balance = 0;
  appliedFilters: Filters = {};

  public transactionsSubj$ = new Subject<Transaction[]>();
  public balanceSubj$ = new Subject<number>();

  constructor() {
    const keyRegex = /^transaction-\d+$/;
    const keys = Object.keys(localStorage).filter(key => keyRegex.test(key));
    for (const key of keys) {
      const transactionStr = localStorage.getItem(key) || '';
      if (transactionStr !== '') {
        const transaction = JSON.parse(transactionStr);
        if (transaction.id > this.maxId) {
          this.maxId = transaction.id;
        }
        this.pushTransaction(transaction);
      }
    }
    this.transactionsSubj$.next(this.transactions);
    this.balanceSubj$.next(this.balance);
  }

  pushTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
    this.balance =
      transaction.type === 'Income'
        ? this.balance + transaction.amount
        : this.balance - transaction.amount;
  }

  filterTransactions() {
    let filteredTransactions = [...this.transactions];
    for (const [field, value] of Object.entries(this.appliedFilters)) {
      if (value) {
        filteredTransactions = [
          ...filteredTransactions.filter(
            transaction => transaction[field] === value
          ),
        ];
      }
    }
    this.transactionsSubj$.next(filteredTransactions);
  }

  addFilter(field: string, value: string) {
    this.appliedFilters[field] = value;
    this.filterTransactions();
  }

  addTransaction(toSave: Omit<Transaction, 'id'>) {
    const transaction = {
      id: ++this.maxId,
      ...toSave,
    };
    localStorage.setItem(
      `transaction-${this.maxId}`,
      JSON.stringify(transaction)
    );
    this.pushTransaction(transaction);
    this.filterTransactions();
    this.balanceSubj$.next(this.balance);
  }

  clearLocalStorage() {
    localStorage.clear();
    this.transactions = [];
    this.balance = 0;
    this.transactionsSubj$.next([]);
    this.balanceSubj$.next(0);
  }
}
