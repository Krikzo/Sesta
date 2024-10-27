import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      delete userData.confirmPassword;
      
      this.usuarioService.registrarUsuario(userData).subscribe(
        async (response) => {
          console.log('Usuario registrado exitosamente', response);
          await this.presentToast('Registro exitoso', 'success');
          this.router.navigate(['/login']);
        },
        async (error) => {
          console.error('Error al registrar usuario', error);
          await this.presentToast('Error en el registro. Por favor, intente nuevamente.', 'danger');
        }
      );
    } else {
      await this.presentToast('Por favor, complete todos los campos correctamente.', 'warning');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    await toast.present();
  }
}