import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="spinner-wrapper">
      <div class="sb-ui-spinner"></div>
    </div>
  `,
  styles: [`
    .spinner-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--sb-ui-spacing-xl, 32px);
      width: 100%;
    }
  `],
})
export class LoadingSpinnerComponent {}
