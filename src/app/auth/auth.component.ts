import { Component, OnInit } from '@angular/core';
import { routeAnimations } from '../shared/animations/route.animation';

@Component({
  selector: 'memo-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [routeAnimations]
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  handleRouteAnimation(outlet) {
	return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
