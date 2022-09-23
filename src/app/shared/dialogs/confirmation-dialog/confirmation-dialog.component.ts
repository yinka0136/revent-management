import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;
  @Output() event: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public emit(): void {
    this.event.emit(true);
  }
}
