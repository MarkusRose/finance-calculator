import { Routes } from '@angular/router';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'loan-calculator',
    },
    {
        path: 'loan-calculator',
        component: LoanCalculatorComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: '**',
        redirectTo: 'loan-calculator',
    },
];
