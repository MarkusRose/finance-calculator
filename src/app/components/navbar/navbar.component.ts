import { Component, Input } from '@angular/core';
import { NavItem } from '../../entities';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
    selector: 'fincal-navbar',
    templateUrl: './navbar.component.html',
    standalone: true,
    imports: [CommonModule, RouterLinkActive, RouterLinkWithHref],
})
export class LoanCalculatorComponent {
    @Input() public appName = 'MyApp';
    @Input() public navItems: NavItem[] = [];
}
