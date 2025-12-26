import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, signal, effect } from '@angular/core';
import { IntersectionObserverService } from '@core/services/intersection-observer.service';
import { DeviceCapabilityService } from '@core/services/device-capability.service';
import { Subscription } from 'rxjs';

export type AnimationType = 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'scale-in' | string;

@Directive({
    selector: '[appScrollReveal]',
    standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
    @Input() animation: AnimationType = 'fade-in-up';
    @Input() delay = 0;
    @Input() duration = 600;
    @Input() threshold = 0.1;

    private el = inject(ElementRef);
    private intersectionService = inject(IntersectionObserverService);
    private deviceService = inject(DeviceCapabilityService);
    private subscription?: Subscription;
    private hasRevealed = signal(false);

    constructor() {
        effect(() => {
            // If reduced motion or low tier device, reveal immediately without animation
            if (this.deviceService.prefersReducedMotion() || this.deviceService.deviceTier() === 'low') {
                this.reveal(false);
            }
        });
    }

    ngOnInit(): void {
        // Initial style
        this.el.nativeElement.style.opacity = '0';
        this.el.nativeElement.style.transition = `opacity ${this.duration}ms cubic-bezier(0.5, 0, 0, 1), transform ${this.duration}ms cubic-bezier(0.5, 0, 0, 1)`;
        this.el.nativeElement.style.transitionDelay = `${this.delay}ms`;

        // Set initial transform based on animation type
        this.setInitialTransform();

        // Start observing
        this.intersectionService.observe(this.el.nativeElement, { threshold: this.threshold });

        this.subscription = this.intersectionService.intersection$.subscribe(({ element, entry }) => {
            if (element === this.el.nativeElement && entry.isIntersecting && !this.hasRevealed()) {
                this.reveal(true);
            }
        });
    }

    private setInitialTransform(): void {
        if (this.deviceService.prefersReducedMotion() || this.deviceService.deviceTier() === 'low') {
            return;
        }

        switch (this.animation) {
            case 'fade-in-up':
                this.el.nativeElement.style.transform = 'translateY(30px)';
                break;
            case 'fade-in-down':
                this.el.nativeElement.style.transform = 'translateY(-30px)';
                break;
            case 'slide-in-left':
                this.el.nativeElement.style.transform = 'translateX(-30px)';
                break;
            case 'slide-in-right':
                this.el.nativeElement.style.transform = 'translateX(30px)';
                break;
            case 'scale-in':
                this.el.nativeElement.style.transform = 'scale(0.95)';
                break;
            default:
                // fade-in only affects opacity
                break;
        }
    }

    private reveal(animated: boolean): void {
        this.hasRevealed.set(true);

        if (animated) {
            // Allow browser to register the initial state before changing it
            requestAnimationFrame(() => {
                this.el.nativeElement.style.opacity = '1';
                this.el.nativeElement.style.transform = 'translate(0, 0) scale(1)';
            });

            // Cleanup observer after reveal
            this.intersectionService.unobserve(this.el.nativeElement);
        } else {
            this.el.nativeElement.style.opacity = '1';
            this.el.nativeElement.style.transform = 'none';
            this.el.nativeElement.style.transition = 'none';
        }
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.intersectionService.unobserve(this.el.nativeElement);
    }
}
