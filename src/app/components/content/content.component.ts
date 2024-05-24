import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EmailRequest } from 'src/app/model/EmailRequest';
import { EmailServiceService } from 'src/app/service/email-service.service';
import { ApiRoutes } from 'src/app/util/ApiRoutes';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  emailRequest: EmailRequest = new EmailRequest();
  allEmail: any[] = [];
  imageUrl = ApiRoutes.IMAGEURL;
  // cardId:any;

  constructor(private route: ActivatedRoute, private emailService: EmailServiceService, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
   this.route.params.subscribe((params:any)=>{
    console.log(params)
    if (params && params['id']) {
      this.emailRequest.id = params['id'];
      this.getEmailDetails(this.emailRequest.id)
      console.log(params);
    }
   })
  }
  getEmailDetails(id: any) {
    console.log('Fetching email details for ID:', id);
    this.emailService.getEmailById(id).subscribe(
      (response: any) => {
        this.emailRequest = response;
        console.log('Email details fetched:', this.emailRequest);
      },
      error => {
        console.error('Error fetching email details:', error);
      }
    );
  }

  calculateDropdownSize(): boolean {
    return this.emailRequest.sendTo.length > 20 || this.emailRequest.cc.length > 20 || this.emailRequest.bcc.length > 20;
  }

  
}
