import { Component, ViewChild, ElementRef } from '@angular/core';
import {EditorComponent} from '../../Editor/editor.component'
import { FormsModule } from '@angular/forms';
import { GraphQLService } from "../../../services/grapql.service"
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";   

@Component({
  selector: 'app-post-work',
  standalone: true,
  templateUrl: './post-work.html',
  styleUrl: './post-work.css',
  imports : [EditorComponent, FormsModule, HttpClientModule],
  providers: [GraphQLService] 
})

export class PostWorkComponent{

  title: string = '';
  selectedFile?: File;
  imagePreviewUrl?: string;
  titleRequired : boolean;
  bodyRequired : boolean;
  @ViewChild(EditorComponent) editorComponent!: EditorComponent;
  @ViewChild('myTextarea') textareaRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('editor') editorRef!: ElementRef<HTMLLabelElement>;

  //#region  view часть 
  onFileSelected(event: Event): void {
    console.log("зашли в метод");
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.selectedFile = file;
      console.log("зашли куда надо");
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(){
    this.titleRequired= false;
    this.bodyRequired=false;
  }

  Cheak() : boolean{
    //сделать фокус на ошибку 
    //тут есть баг 
    this.titleRequired= false;
    this.bodyRequired=false;

    if(this.title===""){
      this.titleRequired= true;
      this.textareaRef.nativeElement.focus();
      return false;
    }
    if(this.editorComponent.getData()==="" || this.editorComponent.getData()===null){
      this.bodyRequired = true;
      this.editorRef.nativeElement.focus(); //не работает фокус 
      return false;
    }
    return true;
  }
  //#endregion

  constructor(private gqlService: GraphQLService) {}

  savePost() {
    if (!this.Cheak()) return;
  
    const body = this.editorComponent.getData();
    const userId = this.gqlService.getUserId();
  
    if (!userId) {
      //редирект на страницу логина
      return;
    }
  
    const postInput = {
      title: this.title,
      body: body,
      userAuthorId: userId
    };
  
    const operations = {
      query: `
        mutation($postInput: PostInput!, $file: Upload) {
          postCreate(postInput: $postInput, file: $file)
        }
      `,
      variables: {
        postInput: postInput,
        file: null
      }
    };
  
    const map = {
      "0": ["variables.file"]
    };
  
    //if (!this.selectedFile) return;
  
    this.gqlService.RequestMultipart<{ data: string }>(operations, map, this.selectedFile)
      .subscribe({
        next: res => console.log("Пост создан:", res),
        error: err => console.error("Ошибка:", err)
      });
  }


}