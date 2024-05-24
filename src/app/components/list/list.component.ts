import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { EmailRequest } from 'src/app/model/EmailRequest';
import { EmailServiceService } from 'src/app/service/email-service.service';
import CustomSwal from 'src/app/util/swal';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { EditorComponent } from '@tinymce/tinymce-angular';
import editor from '@ckeditor/ckeditor5-core/src/editor/editor';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  styles: []
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
   public Editor = ClassicEditor;

  // onChange({ editor }: any) {
  //   // Safely access the editor's data with optional chaining
  //   const data = editor?.getData();
  //   const plainText = this.stripHtml(data ?? '');
  //   this.emailRequest.message=plainText;
  //   console.log(plainText);
  //   // You can now use the plainText variable to get the plain text content
  // }

  // stripHtml(html: string): string {

  //   let tmp = document.createElement('div');
  //   tmp.innerHTML = html;
  //   return tmp.textContent || tmp.innerText || '';
  // }

setImage(event: any) {
   this.emailRequest.fileName = event.target.files[0];
  //  console.log(this.emailRequest.fileName);
}
  constructor(private emailService: EmailServiceService,private router:Router,private snack:MatSnackBar) { }
  ngOnInit(): void {
    this.getAllInboxEmail();
  }

  composeForm=new FormGroup({

  })
  removeImage(fileInput: HTMLInputElement){
    this.emailRequest.fileName = '';    
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
  ngAfterViewInit(): void {

    var optionMenu: any = document.querySelector(".select-menu"),

      selectBtn = optionMenu.querySelector(".select-btn"),

      options = optionMenu.querySelectorAll(".option"),

      sBtn_text = optionMenu.querySelector(".sBtn-text");

    selectBtn.addEventListener("click", () =>

      optionMenu.classList.toggle("active")

    );

    options.forEach((option: any) => {

      option.addEventListener("click", () => {

        let selectedOption = option.querySelector(".option-text").innerText;

        sBtn_text.innerText = selectedOption;

        optionMenu.classList.remove("active");

      });

    });
  }
  isFavoriteActive: boolean = false;
  allEmails: EmailRequest[] = [];
  emailRequest: EmailRequest = new EmailRequest();

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);

  showCcInput: boolean = false;
  showBccInput: boolean = false; 

add(event: MatChipInputEvent, type: string): void {
  const value = (event.value || '').trim();
  const input = event.input;

  if (value) {
    if (this.validateEmail(value)) {
      if (type === 'sendTo') {
        this.emailRequest.sendTo.push(value);
        this.announcer.announce(`Added ${value} to To`);
      } else if (type === 'cc') {
        this.emailRequest.cc.push(value);
        this.announcer.announce(`Added ${value} to Cc`);
      } else if (type === 'bcc') {
        this.emailRequest.bcc.push(value);
        this.announcer.announce(`Added ${value} to Bcc`);
      }
    } 
    else {
      this.snack.open("Invalid Email formate !!",'',{
        duration:10000
      })
    }
  }

  if (input) {
    input.value = '';
  }
  this.checkRecipients();
}
checkRecipients(): void {
  const hasRecipients = this.emailRequest.sendTo.length > 0 || this.emailRequest.cc.length > 0 || this.emailRequest.bcc.length > 0;
  this.composeForm.get('sendTo')?.setErrors(hasRecipients ? null : { required: true });
}

  remove(email: string, type: string): void {
    if (type === 'sendTo') {
        const index = this.emailRequest.sendTo.indexOf(email);
        if (index >= 0) {
            this.emailRequest.sendTo.splice(index, 1);
            this.announcer.announce(`Removed ${email} from To`);
        }
    } else if (type === 'cc') {
        const index = this.emailRequest.cc.indexOf(email);
        if (index >= 0) {
            this.emailRequest.cc.splice(index, 1);
            this.announcer.announce(`Removed ${email} from Cc`);
        }
    } else if (type === 'bcc') {
        const index = this.emailRequest.bcc.indexOf(email);
        if (index >= 0) {
            this.emailRequest.bcc.splice(index, 1);
            this.announcer.announce(`Removed ${email} from Bcc`);
        }
    }
}
edit(email: string, event: MatChipEditedEvent, type: string): void {
  const value = event.value.trim();
    if (!value) {
    this.remove(email, type);
    return;
  }
    if (type === 'sendTo') {
      const index = this.emailRequest.sendTo.indexOf(email);
      if (index >= 0) {
          this.emailRequest.sendTo[index] = value;
          this.announcer.announce(`Edited email to ${value}`);
      }
  } else if (type === 'cc') {
      const index = this.emailRequest.cc.indexOf(email);
      if (index >= 0) {
          this.emailRequest.cc[index] = value;
          this.announcer.announce(`Edited email to ${value}`);
      }
  } else if (type === 'bcc') {
      const index = this.emailRequest.bcc.indexOf(email);
      if (index >= 0) {
          this.emailRequest.bcc[index] = value;
          this.announcer.announce(`Edited email to ${value}`);
      }
  }
}
  getAllInboxEmail() {
    this.isFavoriteActive = false;
    console.log("email");
    this.emailService.getAllInboxEmail().subscribe(
      (data: any) => {
        this.allEmails = data;
      },
      (error: any) => {
        CustomSwal.toastSuccess("id not found");
      }
    )
  }
  getAllSentEmail() {
    this.isFavoriteActive = false;
    console.log("email");
    this.emailService.getAllSentEmail().subscribe(
      (data: any) => {
        this.allEmails = data;
      },
      (error: any) => {
        CustomSwal.toastSuccess("id not found");
      }
    )
  }
  toggleInput(type: string) {
    if (type === 'cc') {
      this.showCcInput = !this.showCcInput;
    } else if (type === 'bcc') {
      this.showBccInput = !this.showBccInput;
    }
  }

  validateEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  sendEmail(): void {
    if (!this.emailRequest.sendTo.length && !this.emailRequest.cc.length && !this.emailRequest.bcc.length) {
      Swal.fire({
        title: 'Error!',
        text: 'Please specify at least one recipient.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-primary'
        }
      });
      return;
    }
    if (this.emailRequest.fileName) {
      const formData: FormData = new FormData();
      formData.append('fileName', this.emailRequest.fileName);
      formData.append('emailRequest', JSON.stringify({ ...this.emailRequest, fileName: '' }));
      alert(this.emailRequest.emailSubject)

      this.emailService.sendEmailWithFile(formData).subscribe(
        (data: any) => {
          this.closeModel('Message');
          CustomSwal.toastSuccess(data.message);
        },
        (error: any) => {
          CustomSwal.toast(error.error.msg);
        }
      );
    } else {
      alert(this.emailRequest.emailSubject)
      this.emailService.sendEmail(this.emailRequest).subscribe(
        
        (data: any) => {
          this.closeModel('Message')
          CustomSwal.toastSuccess(data.message);
        },
        (error: any) => {
          CustomSwal.toast(error.error.msg);
        }
      );
    }
  }
  toggleStatus(email: EmailRequest): void {
    email.status = !email.status;
    this.emailService.updateFavorite(email.id, email.status).subscribe(
      (data: any) => {
       CustomSwal.toastSuccess(data.msg)
      },
      (error: any) => {
        CustomSwal.toast(error.error.msg);
        email.status = !email.status;
      }
    );
  }
  getFavoriteEmail()
  {
    this.isFavoriteActive = true;
      this.emailService.getFavorite().subscribe(
        (data:any)=>{
          this.allEmails=data;
          console.log(data+"Favorite Email");
        },
        (error:any)=>{
          CustomSwal.toast(error.error.msg);
        }
      )     
  }
  redirectToContent(id: any) {
    this.router.navigate(['content/' + id]);
  }
  searchClassName: string = '';
  search(): void {
    if (this.searchClassName.trim() !== '') {
      this.emailService.searchMail(this.searchClassName).subscribe(
        (data:any) => {
          this.allEmails = data;
        },
        (error: any) => {
          console.error('Error searching emails', error);
        }
      );
    } else {
      this.getAllInboxEmail();
    }
  }
  getAllStatus()
  {
     this.emailService.getAllStarStatus().subscribe(
      (data:any)=>{
        console.log(data);
      },
    (error:any)=>{
      CustomSwal.toast(error.error.msg);
    }
     )
  }
  closeModel(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.remove('show');
      element.style.display = 'none';
     const overlay = document.querySelector('.modal-backdrop');
      if (overlay) {
        overlay.parentNode?.removeChild(overlay);
      }
    }
  }
}