import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss'],
})
export class GlobalLoaderComponent implements OnInit {
  @Input() showLoader$!: Observable<boolean>;
  @Input() type: 'regular' | 'withBackdrop' = 'regular';
  @Input() diameter = 40;
  @Input() inline = false;
  @Input() text!: string;

  constructor() {}

  ngOnInit(): void {}
  isRegular(): boolean {
    return this.type === 'regular';
  }
}
