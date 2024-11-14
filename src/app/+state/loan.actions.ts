import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoanHistory } from '../entities';

export const loanActions = createActionGroup({
    source: 'LoanCalculator',
    events: {
        'Set loan values': props<{ loanValues: LoanHistory }>(),
        'Reset loan values': emptyProps(),
    },
});
