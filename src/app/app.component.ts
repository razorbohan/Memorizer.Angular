import { Component } from '@angular/core';
import { routeAnimations } from './shared/animations/route.animation';
import { fadeAnimation } from './shared/animations/fade.animation';

@Component({
  selector: 'memo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations, fadeAnimation]
})
export class AppComponent {

  title = 'memorizer';

  handleRouteAnimation(outlet) {
	return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
