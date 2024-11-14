import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable()
export class AsynchronousService {
    public readonly responesValue = 'Delayed response value';

    public getDelayedResponse(): Observable<string> {
        return of(this.responesValue).pipe(delay(100));
    }
}
