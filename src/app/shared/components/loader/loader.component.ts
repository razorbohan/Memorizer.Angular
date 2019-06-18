import { Component, Input } from '@angular/core';

@Component({
  selector: 'memo-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  constructor() { }

  @Input() isLoading: boolean;

}
