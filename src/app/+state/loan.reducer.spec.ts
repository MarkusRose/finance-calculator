import { LoanHistory } from '../entities';
import { loanActions } from './loan.actions';
import { initialState, loanReducer } from './loan.reducer';

describe('LoanReducer', () => {
    const valuesCollection: LoanHistory[] = [{ amount: 300, interest: 3.4, repayment: 20, duration: 12, total: 400 }];
    it('should return default state', () => {
        const state = loanReducer(initialState, { type: '' });
        expect(state).toEqual(initialState);
    });

    it('set loan values', () => {
        const action = loanActions.setLoanValues({ loanValues: valuesCollection[0] });
        const state = loanReducer(initialState, action);
        expect(state).toEqual({ loanValues: { ...valuesCollection[0] } });
    });

    it('should reset loan values', () => {
        const action = loanActions.resetLoanValues();
        const currentState = { loanValues: valuesCollection[0] };
        const state = loanReducer(currentState, action);
        expect(state).toEqual(initialState);
    });
});
