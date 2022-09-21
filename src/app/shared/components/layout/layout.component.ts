import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public showMinimized: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  public showMinimizedMenu(value: any): void {
    this.showMinimized = value;
  }
  public minimizeMenu(): void {
    this.showMinimized = !this.showMinimized;
  }
}
