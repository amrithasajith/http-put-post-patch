import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { SignupserviceService } from '../signupservice.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  statusCode: number | null = null;
  responseBody: any = null;
  constructor(private signupService: SignupserviceService){}
  signUp(data:object):void{
    console.log('send to backend',data)
    this.signupService.userSignUp(data).subscribe({
      next: (res) => {
      this.statusCode = res.status;
      this.responseBody = res.body;
    },
    error: (err) => {
      console.error('Full error:', err);  // 👈 Log full error
      this.statusCode = err.status || 0;
      this.responseBody = err.error || err.message || 'Unknown error occurred';
    }
    })
  
  }
}
