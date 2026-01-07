import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { SeasonalEffectsService } from '../../services/seasonal-effects.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent"
      [ngClass]="{
        'bg-white/90 backdrop-blur-md shadow-sm border-gray-100 py-3': isScrolled(),
        'bg-transparent py-5': !isScrolled()
      }">
      <div class="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2 z-50 group">
          <div class="bg-primary-500 rounded-lg p-1.5 transition-transform duration-300 group-hover:scale-105 shadow-sm group-hover:shadow-md">
            <img src="/logo.png" alt="Aeriez" class="h-8 w-auto object-contain brightness-0 invert">
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <a *ngFor="let link of links" 
             [routerLink]="link.path" 
             [fragment]="link.fragment" 
             (click)="scrollToSection(link.fragment)"
             class="text-sm font-medium text-navy-600 hover:text-primary-600 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right hover:after:origin-left">
            {{ link.label }}
          </a>
        </nav>

        <!-- CTA & Mobile Toggle -->
        <div class="flex items-center gap-4">
          <!-- Season Switcher -->
          <div class="hidden md:flex items-center bg-gray-100/50 backdrop-blur-sm rounded-full p-1 border border-gray-200">
            <button 
              (click)="setSeason('christmas')" 
              class="p-1.5 rounded-full transition-all duration-300 hover:bg-white hover:shadow-sm"
              [ngClass]="{'bg-white shadow-md text-blue-500': currentSeason() === 'christmas', 'text-gray-400': currentSeason() !== 'christmas'}"
              title="Christmas Mode">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M8 7l8 0"/><path d="m8 17 8 0"/><path d="m5 12 14 0"/><path d="m15.5 15.5-7-7"/><path d="m8.5 15.5 7-7"/></svg>
            </button>
            <button 
              (click)="setSeason('easter')" 
              class="p-1.5 rounded-full transition-all duration-300 hover:bg-white hover:shadow-sm"
              [ngClass]="{'bg-white shadow-md text-pink-500': currentSeason() === 'easter', 'text-gray-400': currentSeason() !== 'easter'}"
              title="Easter Mode">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a8 8 0 0 0 8-8c0-3.1-3-7-8-12-5 5-8 8.9-8 12a8 8 0 0 0 8 8Z"/><path d="M9.6 15a3.5 3.5 0 0 0 4.8 0"/></svg>
            </button>
            <button 
              (click)="setSeason('none')" 
              class="p-1.5 rounded-full transition-all duration-300 hover:bg-white hover:shadow-sm"
              [ngClass]="{'bg-white shadow-md text-gray-700': currentSeason() === 'none', 'text-gray-400': currentSeason() !== 'none'}"
              title="Disable Effects">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <app-button 
            variant="primary" 
            size="sm" 
            className="hidden md:inline-flex"
            (onClick)="scrollToSection('contact')">
            Get Started
          </app-button>

          <!-- Mobile Menu Button -->
          <button 
            class="md:hidden z-50 p-2 text-navy-800 focus:outline-none"
            (click)="toggleMenu()">
            <div class="relative w-6 h-5">
              <span class="absolute w-6 h-0.5 bg-current transform transition-all duration-300"
                    [ngClass]="{'rotate-45 top-2.5': isMenuOpen(), 'top-0': !isMenuOpen()}"></span>
              <span class="absolute w-6 h-0.5 bg-current top-2.5 transition-opacity duration-300"
                    [ngClass]="{'opacity-0': isMenuOpen(), 'opacity-100': !isMenuOpen()}"></span>
              <span class="absolute w-6 h-0.5 bg-current transform transition-all duration-300"
                    [ngClass]="{'-rotate-45 top-2.5': isMenuOpen(), 'top-5': !isMenuOpen()}"></span>
            </div>
          </button>
        </div>

        <!-- Mobile Menu Overlay -->
        <div class="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden"
             [ngClass]="{'opacity-100 pointer-events-auto': isMenuOpen(), 'opacity-0 pointer-events-none': !isMenuOpen()}">
          
          <nav class="flex flex-col items-center gap-6">
            <!-- Mobile Season Switcher -->
            <div class="flex items-center gap-4 bg-gray-100 rounded-full p-1 mb-4">
               <button 
                (click)="setSeason('christmas')" 
                class="p-2 rounded-full transition-all"
                [ngClass]="{'bg-white shadow-md text-blue-500': currentSeason() === 'christmas', 'text-gray-400': currentSeason() !== 'christmas'}">
                ❄️
              </button>
              <button 
                (click)="setSeason('easter')" 
                class="p-2 rounded-full transition-all"
                [ngClass]="{'bg-white shadow-md text-pink-500': currentSeason() === 'easter', 'text-gray-400': currentSeason() !== 'easter'}">
                🥚
              </button>
              <button 
                (click)="setSeason('none')" 
                class="p-2 rounded-full transition-all"
                [ngClass]="{'bg-white shadow-md text-gray-700': currentSeason() === 'none', 'text-gray-400': currentSeason() !== 'none'}">
                🚫
              </button>
            </div>
            <a *ngFor="let link of links" 
               [routerLink]="link.path" 
               [fragment]="link.fragment"
               (click)="closeMenu(); scrollToSection(link.fragment)"
               class="text-2xl font-bold text-navy-900 hover:text-primary-500 transition-colors">
              {{ link.label }}
            </a>
          </nav>
          
          <app-button 
            variant="primary" 
            size="lg" 
            (onClick)="closeMenu(); scrollToSection('contact')">
            Get Started
          </app-button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  private seasonalEffects = inject(SeasonalEffectsService);
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  currentSeason = signal<'christmas' | 'easter' | 'none'>('none');

  links = [
    { label: 'Features', path: '/', fragment: 'features' },
    { label: 'Benefits', path: '/', fragment: 'benefits' },
    { label: 'Team', path: '/team', fragment: '' },
    { label: 'Tasks', path: '/tasks', fragment: '' },
    { label: 'Dashboard', path: '/production-dashboard', fragment: '' },
    { label: 'Contact', path: '/', fragment: 'contact' },
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
    if (this.isMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  scrollToSection(fragment?: string) {
    if (!fragment) return;

    setTimeout(() => {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  setSeason(season: 'christmas' | 'easter' | 'none') {
    this.currentSeason.set(season);
    this.seasonalEffects.setSeason(season);
  }
}
