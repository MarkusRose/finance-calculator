import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoanCalculatorComponent } from './components/navbar/navbar.component';
import { NavItem } from './entities';

@Component({
    selector: 'fincal-root',
    standalone: true,
    imports: [RouterOutlet, LoanCalculatorComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    public title = 'finance-calculator';
    public appName = 'Finance Calculator';
    public navItems: NavItem[] = [
        { url: '/loan-calculator', label: 'Loan Calculator' },
        { url: '/about', label: 'About' },
    ];
}
