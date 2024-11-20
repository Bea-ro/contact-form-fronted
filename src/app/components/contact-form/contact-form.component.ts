import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SendEmailService } from '../../services/send-email.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { emailValidator } from './validator';
import { FormData } from '../../models/formData.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnDestroy {
  public submittedMessage: string = '';
  public messageSubscription: Subscription;
  public formData: FormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  constructor(private SendEmailService: SendEmailService) {
    this.messageSubscription =
      this.SendEmailService.submittedMessage$.subscribe((message) => {
        if (message) {
          this.submittedMessage = message;
        }
      });
  }

  public emailValidator = emailValidator;

  public onSubmit() {
    this.SendEmailService.sendEmail(this.formData);
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
    this.submittedMessage = '';
    this.SendEmailService.completeSubmittedMessage();
  }
}
