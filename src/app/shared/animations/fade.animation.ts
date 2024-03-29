import { transition, style, animate, trigger } from '@angular/animations';

export const fadeAnimation = trigger('fade', [
	transition(':enter', [
		style({
			opacity: 0
		}),
		animate(500)
	]),
	transition(':leave', animate(500, style({
		opacity: 0
	})))
]);
