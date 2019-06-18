import { Directive, Output, ElementRef, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[click-outside]'
})
export class ClickOutsideDirective {

  @Output('click-outside') clickoutside: EventEmitter<any>;

  constructor(private elementRef: ElementRef) {
	this.clickoutside = new EventEmitter<any>();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {

	const isInsideClicked = this.elementRef.nativeElement.contains(targetElement);
	if (!isInsideClicked) {
		this.clickoutside.emit(null);
	}
  }
}
