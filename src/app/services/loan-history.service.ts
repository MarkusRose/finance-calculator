import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoanHistory } from '../entities';

@Injectable({ providedIn: 'root' })
export class LoanHistoryService {
    public readonly maxHistoryLength = 5;
    public loanHistory = new BehaviorSubject<LoanHistory[]>([]);

    private currentLoan: LoanHistory | undefined;

    public updateHistory(loan: LoanHistory): void {
        if (this.currentLoan) {
            const historyList = [...this.loanHistory.getValue()];
            historyList.unshift(this.currentLoan);
            historyList.length = Math.min(historyList.length, this.maxHistoryLength);
            this.loanHistory.next(historyList);
        }
        this.currentLoan = loan;
    }

    public reset(): void {
        this.currentLoan = undefined;
        this.loanHistory.next([]);
    }
}
