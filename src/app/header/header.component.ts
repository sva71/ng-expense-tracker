import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../data/data.service';
import { TransactionEditDialogComponent } from '../transaction-edit-dialog/transaction-edit-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private dataService: DataService
  ) {}

  createTransaction() {
    const dialogRef: MatDialogRef<TransactionEditDialogComponent> =
      this.dialog.open(TransactionEditDialogComponent, {
        width: '500px',
        data: {
          id: 0,
          title: '',
          list: [],
        },
      });
    dialogRef.afterClosed().subscribe(result => {
      result && this.dataService.addTransaction(result);
    });
  }

  clearLocalStorage() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure want to clear local storage?',
        cancelButton: 'Cancel',
        submitButton: 'Clear',
        submitButtonColor: 'warn',
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(result => result && this.dataService.clearLocalStorage());
  }
}
