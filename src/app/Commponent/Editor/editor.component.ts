import { Component, AfterViewInit, Input } from '@angular/core';

declare var CKEDITOR: any;

@Component({
  selector: 'app-editor',
  standalone: true,
  templateUrl: "./editor.component.html" ,
  styleUrl: "./editor.component.css"
})
export class EditorComponent implements AfterViewInit {

  @Input() initialContent: string = ''; // <-- передаваемый HTML
  ngAfterViewInit(): void {
    const editor = CKEDITOR.replace('editor1', {
      extraPlugins: 'uploadimage,image',
      height: 400,
      filebrowserImageUploadUrl: '/api/image/upload',
      removePlugins: 'elementspath',
      contentsCss: "/assets/ckeditor-style.css",
      bodyClass: 'editor-dark-body',
      colorButton_enableAutomatic: false,
      colorButton_foreStyle: {
        element: 'span',
        styles: { color: '#ffffff' } // цвет текста по умолчанию
      },
      colorButton_backStyle: {
        element: 'span',
        styles: { 'background-color': '#000000' } // фон маркера (можно #333 для контраста)
      },
      toolbar: [
        { name: 'document', items: ['Source', '-', 'Preview'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'Undo', 'Redo'] },
        { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll'] },
        { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
        { name: 'links', items: ['Link', 'Unlink'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
      ]
    });

    // Устанавливаем данные после инициализации
    editor.on('instanceReady', () => {
      editor.setData(this.initialContent);
    });

    
  }

  getData(): string {
    return CKEDITOR.instances['editor1'].getData();
  }
}
