import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'outline-white';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [className]="getClasses()"
      (click)="onClick.emit($event)">
      
      <!-- Loading Spinner -->
      <svg *ngIf="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      
      <!-- Icon Left -->
      <span *ngIf="iconLeft" class="mr-2 inline-flex items-center">
        <i [class]="iconLeft"></i>
      </span>
      
      <ng-content></ng-content>
      
      <!-- Icon Right -->
      <span *ngIf="iconRight" class="ml-2 inline-flex items-center">
        <i [class]="iconRight"></i>
      </span>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Input() className = '';

  @Output() onClick = new EventEmitter<MouseEvent>();

  getClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-primary-500/30 focus:ring-primary-500',
      secondary: 'bg-navy-800 hover:bg-navy-700 text-white shadow-lg hover:shadow-navy-800/30 focus:ring-navy-500',
      outline: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
      ghost: 'bg-transparent text-navy-600 hover:bg-navy-50 hover:text-navy-900 focus:ring-navy-500',
      white: 'bg-white text-primary-600 hover:bg-gray-50 shadow-lg hover:shadow-xl focus:ring-white',
      'outline-white': 'bg-transparent border-2 border-white text-white hover:bg-white/10 focus:ring-white',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg',
    };

    const widthClass = this.fullWidth ? 'w-full' : '';

    return `${baseClasses} ${variants[this.variant]} ${sizes[this.size]} ${widthClass} ${this.className}`;
  }
}
