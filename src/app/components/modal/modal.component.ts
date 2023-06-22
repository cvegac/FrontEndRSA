import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Result } from 'src/app/interfaces/formulario';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() result: Result = {
    exitoso: false,
    mensaje: ''
  };

  @Output() aceptarClicked: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
  }

  constructor() { }

  onAceptarClick(): void {
    this.aceptarClicked.emit();
  }

}

