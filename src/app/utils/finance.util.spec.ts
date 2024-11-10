import { calculateLoanDuration, convertYearlyToMonthlyInterest, minimumMonthlyPayment } from './finance.util';

describe('financeUtils', () => {
    describe('convert yearly to monthly interest', () => {
        const values = [
            { yearly: 0, monthly: 0 },
            { yearly: 0.1, monthly: Math.pow(1.1, 1 / 12) - 1 }, // boring happy cases
            { yearly: 1, monthly: Math.pow(2, 1 / 12) - 1 }, // boring happy cases
            { yearly: -1, monthly: undefined },
        ];
        it.each(values)('yearly interst $yearly should be monthly interest $monthly', ({ yearly, monthly }) => {
            if (yearly >= 0) {
                expect(convertYearlyToMonthlyInterest(yearly)).toEqual(monthly);
            } else {
                expect(() => convertYearlyToMonthlyInterest(yearly)).toThrow(/value/);
            }
        });
    });

    describe('calculate minium monthly payments', () => {
        const values = [
            { loan: 0, interest: 0, payment: 0 },
            { loan: 1000, interest: 0, payment: 0 }, // boring happy cases
            { loan: 1000, interest: 0.12, payment: 9.488792934583046 }, // boring happy cases
            { loan: -1, interest: 0.03, payment: undefined },
            { loan: 1000, interest: -0.03, payment: undefined },
        ];
        it.each(values)(
            'minimum monthly payment: loan $loan, interest $interest => should be $payment',
            ({ loan, interest, payment }) => {
                if (loan >= 0 && interest >= 0) {
                    expect(minimumMonthlyPayment(loan, interest)).toEqual(payment);
                } else {
                    expect(() => minimumMonthlyPayment(loan, interest)).toThrow(/value/);
                }
            }
        );
    });
    describe('calculate load duration', () => {
        const values = [
            { loan: 0, interest: 0, payment: 0, duration: 0 },
            { loan: 1200, interest: 0.01, payment: 101, duration: 12 },
            { loan: -1200, interest: 0.01, payment: 101, duration: 12 },
            { loan: 1200, interest: -0.01, payment: 101, duration: 12 },
            { loan: 1200, interest: 0.01, payment: -101, duration: 12 },
        ];
        it.each(values)(
            'duration should be: loan $loan, interest $interest, payment $payment => should be $duration',
            ({ loan, interest, payment, duration }) => {
                if (loan >= 0 && interest >= 0 && payment > 0) {
                    expect(calculateLoanDuration(loan, interest, payment).duration).toEqual(duration);
                } else if (loan === 0 && payment === 0) {
                    expect(calculateLoanDuration(loan, interest, payment).duration).toEqual(duration);
                } else {
                    expect(() => calculateLoanDuration(loan, interest, payment)).toThrow();
                }
            }
        );
    });
});
