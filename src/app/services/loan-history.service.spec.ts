import { TestBed } from '@angular/core/testing';
import { LoanHistoryService } from './loan-history.service';

describe('LoanHistoryService', () => {
    let loanHistoryService: LoanHistoryService;
    const historyItems = [...Array(20).keys()].map((key) => ({
        amount: 1200,
        interest: key + 1,
        repayment: 102,
        duration: 12,
        total: 1210,
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoanHistoryService],
        });

        loanHistoryService = TestBed.inject(LoanHistoryService);
    });

    it('Service should be available', () => {
        expect(loanHistoryService).toBeTruthy();
    });

    describe('updateHistory', () => {
        it('Default history state should be empty', () => {
            expect(loanHistoryService.loanHistory.getValue()).toEqual([]);
        });

        it('History should have length 0 after adding a single history item.', () => {
            loanHistoryService.updateHistory(historyItems[0]);
            expect(loanHistoryService.loanHistory.getValue()).toEqual([]);
        });
        it('History should have length 1 after adding two items single history item.', () => {
            loanHistoryService.updateHistory(historyItems[0]);
            expect(loanHistoryService.loanHistory.getValue()).toEqual([]);
            loanHistoryService.updateHistory(historyItems[1]);
            expect(loanHistoryService.loanHistory.getValue()).toEqual([historyItems[0]]);
        });

        it('History length should not exceed 5.', () => {
            loanHistoryService.updateHistory(historyItems[0]);
            for (let i = 1; i < historyItems.length; i++) {
                loanHistoryService.updateHistory(historyItems[i]);
                if (i < loanHistoryService.maxHistoryLength) {
                    expect(loanHistoryService.loanHistory.getValue().length).toEqual(i);
                    expect(loanHistoryService.loanHistory.getValue()[0]).toEqual(historyItems[i - 1]);
                } else {
                    expect(loanHistoryService.loanHistory.getValue().length).toEqual(
                        loanHistoryService.maxHistoryLength
                    );
                    expect(loanHistoryService.loanHistory.getValue()[0]).toEqual(historyItems[i - 1]);
                }
            }
        });
    });
    describe('resetHistory', () => {
        it('Should clear the history', () => {
            loanHistoryService.updateHistory(historyItems[0]);
            loanHistoryService.reset();
            expect(loanHistoryService.loanHistory.getValue()).toEqual([]);
        });
    });
});
