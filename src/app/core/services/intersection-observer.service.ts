import { Injectable, OnDestroy, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';

export interface IntersectionConfig {
    threshold?: number | number[];
    rootMargin?: string;
    root?: HTMLElement | null;
}

@Injectable({
    providedIn: 'root'
})
export class IntersectionObserverService implements OnDestroy {
    private observers = new Map<Element, IntersectionObserver>();
    private subject = new Subject<{ element: Element; entry: IntersectionObserverEntry }>();

    intersection$ = this.subject.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    observe(element: Element, config: IntersectionConfig = {}): void {
        if (!isPlatformBrowser(this.platformId)) return;

        const { threshold = 0.1, rootMargin = '0px', root = null } = config;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.subject.next({ element, entry });
                    }
                });
            },
            { threshold, rootMargin, root }
        );

        observer.observe(element);
        this.observers.set(element, observer);
    }

    unobserve(element: Element): void {
        const observer = this.observers.get(element);
        if (observer) {
            observer.unobserve(element);
            observer.disconnect();
            this.observers.delete(element);
        }
    }

    ngOnDestroy(): void {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}
