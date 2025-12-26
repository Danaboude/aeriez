import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type DeviceTier = 'low' | 'medium' | 'high';

@Injectable({
    providedIn: 'root'
})
export class DeviceCapabilityService {
    deviceTier = signal<DeviceTier>('high');
    prefersReducedMotion = signal<boolean>(false);
    isBrowser = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            this.detectCapabilities();
        }
    }

    private detectCapabilities(): void {
        // Check reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.prefersReducedMotion.set(mediaQuery.matches);

        // Listen for changes
        mediaQuery.addEventListener('change', (e) => this.prefersReducedMotion.set(e.matches));

        // Simple hardware concurrency check as a proxy for device capability
        // This is a basic heuristic; a more robust solution would involve GPU fingerprinting
        const concurrency = navigator.hardwareConcurrency || 4;

        if (concurrency <= 4) {
            this.deviceTier.set('low');
        } else if (concurrency <= 8) {
            this.deviceTier.set('medium');
        } else {
            this.deviceTier.set('high');
        }

        // If user prefers reduced motion, we treat it as low tier to disable animations
        if (this.prefersReducedMotion()) {
            this.deviceTier.set('low');
        }
    }

    shouldEnable3D(): boolean {
        return this.isBrowser && this.deviceTier() !== 'low' && !this.prefersReducedMotion();
    }
}
