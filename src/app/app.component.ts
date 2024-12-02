import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TransactionsComponent } from './transactions/transactions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, TransactionsComponent],
})
export class AppComponent {
  title = 'ng-expense-tracker';
}
