export function convertYearlyToMonthlyInterest(yearlyInterest: number): number {
    if (yearlyInterest < 0) {
        throw new Error('Negative value not allowed.');
    }
    return Math.pow(1 + yearlyInterest, 1 / 12) - 1;
}

export function minimumMonthlyPayment(amount: number, interestRate: number) {
    if (interestRate < 0 || amount < 0) {
        throw new Error('Negative value not allowed');
    }
    return amount * convertYearlyToMonthlyInterest(interestRate);
}

export function calculateLoanDuration(
    initialAmount: number,
    interestRate: number,
    repayment: number
): { duration: number; total: number } {
    if ((initialAmount === 0 && repayment < 0) || initialAmount < 0 || (initialAmount > 0 && repayment <= 0)) {
        throw new Error('Values must be positive and repayment must be > 0.');
    }
    const monthlyInterestRate = convertYearlyToMonthlyInterest(interestRate);
    let amount = initialAmount;
    let total = 0;
    let duration = 0;
    let netRepayment = 0;

    while (amount > 0) {
        duration = duration + 1;
        netRepayment = repayment - amount * monthlyInterestRate;
        if (amount > netRepayment) {
            total = total + repayment;
            amount = amount - netRepayment;
        } else {
            total = total + amount * (1 + monthlyInterestRate);
            amount = 0;
        }
    }
    return { duration, total };
}
