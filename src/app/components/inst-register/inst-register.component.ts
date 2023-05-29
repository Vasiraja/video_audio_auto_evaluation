import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyService } from 'src/app/new.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-inst-register',
  templateUrl: './inst-register.component.html',
  styleUrls: ['./inst-register.component.css'],
})
export class InstRegisterComponent {
  email: string = '';
  Inst_name: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private service: MyService, private router: Router) {}

  insert() {
    if (!this.email || !this.Inst_name ||!this.password ) {
      alert(`Required field`);
      return;
    }
    if(this.password !== this.confirmPassword){
      alert(`Password doesn't match`);
      return;
    }
    if(!this.email.includes('@')){
      alert(`Invalid email address. Please include '@' in your email.`);
      return;
    }

    this.service
      .createdata({
        email: this.email,
        Inst_name: this.Inst_name,
        password: this.password,
        confirmPassword: this.confirmPassword,
      })
      .pipe(
        tap(() => {
          alert(`Hi ${this.Inst_name} .....!\nRegistration successful!`);
          const Inst_name=this.Inst_name;

          this.router.navigate(['/login'],{ queryParams:{Inst_name}});
          // this.router.navigate(['/tasks'], { queryParams: { userId } });
        }),
        catchError((error) => {
          console.error(error);
          alert('Registration failed!');
          return of(null);
        })
      ).subscribe();
  }
}
