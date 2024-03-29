import { transition, style, animate, trigger, query, group } from '@angular/animations';

export const routeAnimations =
	trigger('routeAnimations', [
		transition('Home => *', [
			query(':enter, :leave',
				style({ position: 'fixed', width: '100%' }),
				{ optional: true }),
			group([
				query(':enter', [
					style({ transform: 'translateX(-100%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(0%)' }))
				], { optional: true }),
				query(':leave', [
					style({ transform: 'translateX(0%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(100%)' }))
				], { optional: true }),
			])
		]),
		transition('Auth => Home', [
			query(':enter, :leave',
				style({ position: 'fixed', width: '100%' }),
				{ optional: true }),
			group([
				query(':enter', [
					style({ transform: 'translateX(100%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(0%)' }))
				], { optional: true }),
				query(':leave', [
					style({ transform: 'translateX(0%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(-100%)' }))
				], { optional: true }),
			])
		]),
		transition('Login => Register', [
			query(':enter, :leave',
				style({ position: 'fixed', width: '100%' }),
				{ optional: true }),
			group([
				query(':enter', [
					style({ transform: 'translateX(100%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(0%)' }))
				], { optional: true }),
				query(':leave', [
					style({ transform: 'translateX(0%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(-100%)' }))
				], { optional: true }),
			])
		]),
		transition('Register => Login', [
			query(':enter, :leave',
				style({ position: 'fixed', width: '100%' }),
				{ optional: true }),
			group([
				query(':enter', [
					style({ transform: 'translateX(-100%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(0%)' }))
				], { optional: true }),
				query(':leave', [
					style({ transform: 'translateX(0%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(100%)' })
					)], { optional: true }),
			])
		]),
	]);
