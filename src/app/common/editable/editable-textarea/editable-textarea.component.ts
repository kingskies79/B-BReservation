import { Component, OnInit, Input } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Component({
  selector: 'app-editable-textarea',
  templateUrl: './editable-textarea.component.html',
  styleUrls: ['./editable-textarea.component.css']
})
export class EditableTextareaComponent extends EditableComponent{

  @Input() rows: string;

  @Input() cols: string;

}
