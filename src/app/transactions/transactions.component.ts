import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../data/data.service';
import {
  CATEGORIES,
  Transaction,
  TransactionType,
} from '../../data/interfaces';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  MatOption,
  MatSelect,
  MatSelectChange,
} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    CurrencyPipe,
    DatePipe,
    MatSelect,
    MatOption,
    FormsModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements OnInit, AfterViewInit {
  protected readonly CATEGORIES = CATEGORIES;

  balance = 0;
  typeFilter: TransactionType | null;
  categoryFilter: (typeof CATEGORIES)[keyof typeof CATEGORIES] | null;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) {
    this.dataService.transactionsSubj$.subscribe(
      transactions => (this.dataSource.data = transactions)
    );
    this.dataService.balanceSubj$.subscribe(
      balance => (this.balance = balance)
    );
  }

  displayedColumns: string[] = ['date', 'type', 'category', 'name', 'amount'];
  dataSource = new MatTableDataSource<Transaction>();

  ngOnInit(): void {
    this.dataSource.data = this.dataService.transactions;
    this.balance = this.dataService.balance;
  }

  typeFilterChange(selection: MatSelectChange) {
    this.dataService.addFilter('type', selection.value);
  }

  categoryFilterChange(selection: MatSelectChange) {
    this.dataService.addFilter('category', selection.value);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
