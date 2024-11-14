import { Injector } from '@angular/core';
import { AsynchronousService } from './asynchronous.service';
import { lastValueFrom, take } from 'rxjs';
import { fakeAsync, tick, waitForAsync } from '@angular/core/testing';

describe('AsynchronousService', () => {
    let asyncService: AsynchronousService;
    beforeEach(() => {
        const injector = Injector.create({
            providers: [AsynchronousService],
        });
        asyncService = injector.get(AsynchronousService);
    });

    describe('Observable', () => {
        it('Just checking the value should fail', () => {
            let value = '';
            asyncService
                .getDelayedResponse()
                .pipe(take(1))
                .subscribe((res) => (value = res));

            expect(value).not.toEqual(asyncService.responesValue);
        });
        it('Checking value with "done" callback', (done) => {
            asyncService
                .getDelayedResponse()
                .pipe(take(1))
                .subscribe((res) => {
                    expect(res).toEqual(asyncService.responesValue);
                    done();
                });
        });

        it('Checking value with "done" callback - version 2', (done) => {
            asyncService
                .getDelayedResponse()
                .pipe(take(1))
                .subscribe({
                    next: (res) => {
                        // when testing multiple 'next' emissions from an observable
                        expect(res).toEqual(asyncService.responesValue);
                    },
                    complete: () => done(),
                });
        });

        it('Checking value with fakeAsync', fakeAsync(() => {
            let value = '';
            asyncService
                .getDelayedResponse()
                .pipe(take(1))
                .subscribe((res) => {
                    value = res;
                });
            tick(2000); // simulating to wait for 2 seconds.
            expect(value).toEqual(asyncService.responesValue);
        }));
    });

    describe('Promise', () => {
        let thePromise: Promise<string>;
        beforeEach(() => {
            thePromise = lastValueFrom(asyncService.getDelayedResponse());
        });
        it('Write test with return statement', () => {
            return thePromise.then((res) => expect(res).toEqual(asyncService.responesValue));
        });
        it('Checking the value in then with async/await', async () => {
            await thePromise.then((res) => expect(res).toEqual(asyncService.responesValue));
        });
        it('Checking value via await promise with async/await', async () => {
            const theString = await thePromise;
            expect(theString).toEqual(asyncService.responesValue);
        });
        it('Checking the result of the promise', async () => {
            await expect(thePromise).resolves.toEqual(asyncService.responesValue);
        });

        it('Checking the value in then with async/await', waitForAsync(() => {
            expect(thePromise).resolves.toEqual(asyncService.responesValue);
        }));
    });
});
