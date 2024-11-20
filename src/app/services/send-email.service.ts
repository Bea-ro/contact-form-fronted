import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormData } from '../models/formData.model';

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {
  public API_URL: string = 'http://urldelbackend'; // en desarrollo 'http://localhost:3000/api/send-email'
  public submittedMessage$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  public sendEmail(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(this.API_URL, formData, httpOptions).subscribe(
      (response) => {
        console.log('Email enviado con éxito, mensaje de app', response);
        this.submittedMessage$.next(
          'Gracias por tu mensaje. En breve nos pondremos en contacto contigo.'
        );
        console.log('en return de ok', formData);
      },
      (error) => {
        console.error('Error al enviar el email', error);
        this.submittedMessage$.next(
          'Se ha producido un error al enviar tu mensaje. Por favor, inténtalo más tarde.'
        );
      }
    );
  }

  public completeSubmittedMessage() {
    this.submittedMessage$.complete();
  }
}
