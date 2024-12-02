import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CATEGORIES,
  Transaction,
  TransactionType,
} from '../../data/interfaces';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DATE_LOCALE,
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

interface TransactionEditForm {
  name: FormControl<string>;
  amount: FormControl<number>;
  type: FormControl<TransactionType>;
  category: FormControl<(typeof CATEGORIES)[keyof typeof CATEGORIES]>;
  date: FormControl<Date>;
}

@Component({
  selector: 'app-transaction-edit-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogActions,
    MatButtonModule,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UK' },
  ],
  templateUrl: './transaction-edit-dialog.component.html',
  styleUrl: './transaction-edit-dialog.component.scss',
})
export class TransactionEditDialogComponent implements OnInit {
  transactionForm: FormGroup<TransactionEditForm>;

  protected readonly CATEGORIES = CATEGORIES;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Transaction,
    public dialogRef: MatDialogRef<TransactionEditDialogComponent>
  ) {}

  ngOnInit() {
    this.transactionForm = new FormGroup<TransactionEditForm>({
      name: new FormControl(this.data.name, Validators.required),
      amount: new FormControl(this.data.amount, Validators.required),
      type: new FormControl(this.data.type || 'Expense', Validators.required),
      category: new FormControl(this.data.category),
      date: new FormControl(this.data.date || new Date()),
    });
  }

  onSubmit() {
    this.dialogRef.close(this.transactionForm.value);
  }
}
