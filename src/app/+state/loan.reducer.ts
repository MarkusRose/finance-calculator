import { createReducer, on } from '@ngrx/store';
import { LoanHistory } from '../entities';
import { loanActions } from './loan.actions';

export const loanFeatureName = 'LOAN_FEATURE';

export interface LoanState {
    loanValues: LoanHistory;
}

export const initialState = {
    loanValues: { amount: 0, interest: 0, repayment: 0, duration: 0, total: 0 },
};

export const loanReducer = createReducer<LoanState>(
    initialState,
    on(loanActions.setLoanValues, (state, { loanValues }) => ({ ...state, loanValues })),
    on(loanActions.resetLoanValues, (state) => ({
        ...state,
        loanValues: { amount: 0, interest: 0, repayment: 0, duration: 0, total: 0 },
    }))
);
