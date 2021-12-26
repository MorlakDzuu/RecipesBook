import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private uploadFileUrl: string = 'file/upload';

  constructor(private http: HttpClient) { }

  upload(file): Observable<string> {
    const formData = new FormData();
    formData.append('uploadedFile', file, file.name);
    return this.http.post(this.uploadFileUrl, formData, { responseType: 'text' });
  }
}
