import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    name: ['test1', [Validators.required, Validators.minLength(3)]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  registro() {
    const { name, email, password } = this.miFormulario.value;

    this.authService.registro(name, email, password).subscribe((ok) => {
      if (ok === true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        console.log(ok);
        Swal.fire('Error', ok, 'error');
      }
    });

    // console.log(this.miFormulario.value);
    // this.router.navigateByUrl('/dashboard');
  }
}
