import { Component, OnInit, Input } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Component({
  selector: 'app-editable-image',
  templateUrl: './editable-image.component.html',
  styleUrls: ['./editable-image.component.css']
})
export class EditableImageComponent extends EditableComponent {
  @Input() entity: any;
  handleImageUpload(imageUrl: string) {
    this.entity[this.entityField] = imageUrl;
    this.updateEntity();
  }


  handleImageError() {
    this.cancelUpdate();
  }

  handleImageLoad() {
    this.isActiveInput = true;
  }
}
