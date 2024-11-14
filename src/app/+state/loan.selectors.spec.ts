import { LoanState } from './loan.reducer';
import { selectLoanCalculation } from './loan.selectors';

describe('Loan Selectors', () => {
    const state: LoanState = {
        loanValues: {
            amount: 4200,
            interest: 4.2,
            repayment: 420,
            duration: 42,
            total: 4242,
        },
    };

    it('should select the loan values', () => {
        const result = selectLoanCalculation.projector(state);
        expect(result).toEqual(state.loanValues);
    });
});
