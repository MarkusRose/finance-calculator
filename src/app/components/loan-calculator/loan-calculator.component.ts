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

    public ngOnInit(): void {
        this.loanConditionsForm = this.formBuilder.group(
            {
                loanAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
                interestRate: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
                monthlyRepayment: new FormControl(0, [Validators.required, Validators.min(0)]),
            },
            { validator: [this.validateRepayment] }
        );
    }

    public onSubmit(): void {
        const initialAmount: number = this.loanConditionsForm.controls['loanAmount'].value;
        const interestRate: number = this.loanConditionsForm.controls['interestRate'].value / 100;
        const repayment: number = this.loanConditionsForm.controls['monthlyRepayment'].value;

        let amount = initialAmount;
        let month = 0;
        let total = 0;
        let netRepayment = 0;

        while (amount > 0) {
            month = month + 1;
            netRepayment = repayment - (amount * interestRate) / 12;
            if (amount > netRepayment) {
                total = total + repayment;
                amount = amount - netRepayment;
            } else {
                total = total + amount * (1 + interestRate / 12);
                amount = 0;
            }
        }

        this.duration = month;
        this.totalAmount = total;
        this.totalInterest = total - initialAmount;
    }

    public onReset(): void {
        this.duration = undefined;
        this.totalAmount = undefined;
        this.totalInterest = undefined;
    }

    private validateRepayment: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if (!control || !control.value) {
            return null;
        }
        const values = control.value;
        const minRepayment = (values.loanAmount * values.interestRate) / 12 / 100;
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
