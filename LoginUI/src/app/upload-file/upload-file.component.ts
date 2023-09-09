import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      const fileData = new FormData();
      fileData.append('file', this.selectedFile);
  
      this.http.post('http://localhost:5078/api/UploadFile/Serverlist', fileData, { responseType: 'text', withCredentials: false })
        .subscribe(
          (response) => {
            console.log('Upload successful', response);
          },
          (error) => {
            console.error('Error uploading file', error);
          }
        );
    } else {
      console.warn('No file selected');
    }
  }

  //upload foe application list
  uploadFile() {
    if (this.selectedFile) {
      const fileData = new FormData();
      fileData.append('file', this.selectedFile);
  
      this.http.post('http://localhost:5078/api/UploadFile/upload', fileData, { responseType: 'text', withCredentials: false })
        .subscribe(
          (response) => {
            console.log('Upload successful', response);
          },
          (error) => {
            console.error('Error uploading file', error);
          }
        );
    } else {
      console.warn('No file selected');
    }
  }
  
  
  
}
