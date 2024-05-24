import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../util/helper';
import { ApiRoutes } from '../util/ApiRoutes';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {
  constructor(private http:HttpClient) { }

  public getAllInboxEmail()
  {
    return this.http.get(`${baseUrl}${ApiRoutes.FINDALLINBOXMAILS}`);
  }


  public getAllSentEmail()
  {
    return this.http.get(`${baseUrl}${ApiRoutes.FINDALLSENTMAILS}`);
  }

  public sendEmail(data:any)
  {
    return this.http.post(`${baseUrl}${ApiRoutes.SENDEMAIL}`,data);
  }

  public updateFavorite(id:any,status:any)
  {
     return this.http.get(`${baseUrl}${ApiRoutes.UPDATEFAVORITE}/${id}/${status}`) 
  }
  public getFavorite()
  {
    return this.http.get(`${baseUrl}${ApiRoutes.GETFAVORITEEmail}`);
  }
  public getEmailById(id:any)
  {
     return this.http.get(`${baseUrl}${ApiRoutes.GETEMAILBYID}/${id}`)
  }
  sendEmailWithFile(formData: FormData): Observable<any> {
 
    return this.http.post(`${baseUrl}${ApiRoutes.SENDEMAILWITHFILE}`, formData);
  }
  searchMail(value:any)
  {
     return this.http.get(`${baseUrl}${ApiRoutes.SEARCHMAIL}/${value}/${"dancecreation03@gmail.com"}`)
  }
  
  public getFile(id:any)
  {
     return this.http.get(`${baseUrl}${ApiRoutes.GETFILE}/${id}`);
  }

  public getAllStarStatus()
  {
    return this.http.get(`${baseUrl}${ApiRoutes.GETALLSTATUS}`);
  }
}