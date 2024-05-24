export class EmailRequest {
    id: number=0;
    sendTo: string[]=[];
    cc: string[]=[];
    bcc: string[]=[];
    emailSubject: string='';
    emailFrom:string='';
    message: string='';
    fileName: string='';
  status:boolean=false;
  dateTime: any=''; 
  recipientUsername: string='';
  }