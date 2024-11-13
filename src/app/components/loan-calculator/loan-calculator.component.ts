import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { calculateLoanDuration, minimumMonthlyPayment } from '../../utils/finance.util';
import { LoanHistoryService } from '../../services/loan-history.service';

@Component({
    selector: 'fincal-loan-calculator',
    templateUrl: './loan-calculator.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
})
export class LoanCalculatorComponent implements OnInit {
    public loanConditionsForm: FormGroup;
    public duration?: number;
    public totalAmount?: number;
    public totalInterest?: number;

    private readonly formBuilder = inject(FormBuilder);
    protected readonly loanHistory = inject(LoanHistoryService);

    public ngOnInit(): void {
        this.loanConditionsForm = this.formBuilder.group(
            {
                loanAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
                interestRate: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
                monthlyRepayment: new FormControl(0, [Validators.required, Validators.min(0)]),
            },
            { validators: [this.validateRepayment] }
        );
    }

    public onSubmit(): void {
        const initialAmount: number = this.loanConditionsForm.controls['loanAmount'].value;
        const interestRate: number = this.loanConditionsForm.controls['interestRate'].value / 100;
        const repayment: number = this.loanConditionsForm.controls['monthlyRepayment'].value;

        ({ duration: this.duration, total: this.totalAmount } = calculateLoanDuration(
            initialAmount,
            interestRate,
            repayment
        ));

        this.totalInterest = this.totalAmount - initialAmount;
        this.loanHistory.updateHistory({
            amount: initialAmount,
            interest: interestRate * 100,
            repayment: repayment,
            duration: this.duration,
            total: this.totalAmount,
        });
    }

    public onReset(): void {
        this.duration = undefined;
        this.totalAmount = undefined;
        this.totalInterest = undefined;
        this.loanHistory.reset();
    }

    private validateRepayment: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if (!control || !control.value) {
            return null;
        }
        const values = control.value;
        const minRepayment = minimumMonthlyPayment(values.loanAmount, values.interestRate / 100);
        if (values.monthlyRepayment <= minRepayment && values.loanAmount > 0) {
            const error = {
                paymentTooLow: `Monthly payment must be larger than ${Math.floor(100 * minRepayment) / 100} €.`,
            };
            control.get('monthlyRepayment')?.setErrors(error);
            return error;
        } else {
            return null;
        }
    };
}
