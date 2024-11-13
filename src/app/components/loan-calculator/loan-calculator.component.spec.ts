import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanCalculatorComponent } from './loan-calculator.component';
import { By } from '@angular/platform-browser';
import { LoanHistoryService } from '../../services/loan-history.service';
import { BehaviorSubject } from 'rxjs';
import { LoanHistory } from '../../entities';

describe('LoanCalculatorComponent', () => {
    let fixture: ComponentFixture<LoanCalculatorComponent>;
    let component: LoanCalculatorComponent;

    const mockLoanHistoryService = {
        reset: jest.fn,
        loanHistory: new BehaviorSubject<LoanHistory[]>([]),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LoanCalculatorComponent],
            providers: [{ provide: LoanHistoryService, useValue: mockLoanHistoryService }],
        }).compileComponents();

        fixture = TestBed.createComponent(LoanCalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create a component', () => {
        expect(component).toBeTruthy();
    });

    describe('form and validation', () => {
        const amounts = [
            [-13, 1, 3, 'INVALID'],
            [13, -1, 3, 'INVALID'],
            [13, 1, -3, 'INVALID'],
            [0, 0, 0, 'VALID'],
            [500000.0, 0, 1, 'VALID'],
            [500000.0, 0, 1, 'VALID'],
            [500000.0, 0, 0, 'INVALID'],
            [500000.0, 10, 1, 'INVALID'],
        ];
        it.each(amounts)(
            'validators set correclty for Loan Amount: loan: %d, interest: %d, pay: %d -> %s',
            (amount, interest, payment, status) => {
                const inputList = fixture.debugElement.queryAll(By.css('input'));
                expect(inputList.length).toEqual(3);
                (inputList[0].nativeElement as HTMLInputElement).value = `${amount}`;
                (inputList[0].nativeElement as HTMLInputElement).dispatchEvent(new Event('input'));
                (inputList[1].nativeElement as HTMLInputElement).value = `${interest}`;
                (inputList[1].nativeElement as HTMLInputElement).dispatchEvent(new Event('input'));
                (inputList[2].nativeElement as HTMLInputElement).value = `${payment}`;
                (inputList[2].nativeElement as HTMLInputElement).dispatchEvent(new Event('input'));
                fixture.detectChanges();
                expect(component.loanConditionsForm.status).toEqual(status);
            }
        );

        it('Should disable submit button on invalid input', () => {
            component.loanConditionsForm.setErrors({ error: 'Error message' });
            expect(component.loanConditionsForm.status).toEqual('INVALID');
            const button = fixture.debugElement.query(By.css('button[type="submit"]'))
                ?.nativeElement as HTMLButtonElement;
            fixture.detectChanges();
            expect(button).toBeTruthy();
            expect(button.disabled).toEqual(true);
        });
        it('Should enable submit button on valid input', () => {
            component.loanConditionsForm.setErrors(null);
            expect(component.loanConditionsForm.status).toEqual('VALID');
            const button = fixture.debugElement.query(By.css('button[type="submit"]'))
                ?.nativeElement as HTMLButtonElement;
            fixture.detectChanges();
            expect(button).toBeTruthy();
            expect(button.disabled).toEqual(false);
        });
    });

    describe('History List', () => {
        it('History items should be displayed', () => {
            mockLoanHistoryService.loanHistory.next([
                {
                    amount: 300,
                    duration: 12,
                    interest: 5,
                    repayment: 10,
                    total: 500,
                },
                {
                    amount: 300,
                    duration: 12,
                    interest: 5,
                    repayment: 10,
                    total: 500,
                },
            ]);
            fixture.detectChanges();
            const historyCards = fixture.debugElement.queryAll(By.css('[test-id="historyCard"]'));
            expect(historyCards.length).toBeGreaterThan(0);
        });

        it('Reset should reset the history service', () => {
            const resetButton = fixture.debugElement.query(By.css('[test-id="LoanCalculatorReset"]'));
            jest.spyOn(mockLoanHistoryService, 'reset');
            resetButton.triggerEventHandler('click');
            expect(mockLoanHistoryService.reset).toHaveBeenCalled();
        });
    });
});
