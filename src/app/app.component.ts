import { Component } from '@angular/core';
import { SignalsComponent } from './signals/signals.component';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular Signals</h1>
    <app-signals></app-signals>
  `,
  styles: [],
  standalone: true,
  imports: [SignalsComponent],
})
export class AppComponent {}
