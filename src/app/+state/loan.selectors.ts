import { createFeatureSelector, createSelector } from '@ngrx/store';
import { loanFeatureName, LoanState } from './loan.reducer';

export const selectFeature = createFeatureSelector<LoanState>(loanFeatureName);

export const selectLoanCalculation = createSelector(selectFeature, (state: LoanState) => state.loanValues);
