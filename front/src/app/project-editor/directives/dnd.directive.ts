import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appDnd]',
})
export class DndDirective {
  private allowedExtensions = [".stp", ".step", ".igs", ".iges", ".gltf"]; 
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('drop', ['$event']) public ondrop(e: any) {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];

    if (file) {
      const fileExtension: string = file.name.slice(file.name.lastIndexOf('.'));
      if (this.allowedExtensions.includes(fileExtension.toLowerCase())) this.fileDropped.emit(file);
      else
        this.snackBar.open('Неподдерживаемый формат файла, доступны: .stp и .gltf файлы', '', {
          duration: 5000,
          panelClass: 'errorSnack',
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
    }
  }

  constructor(private snackBar: MatSnackBar) {}
}
