import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../../servicios/usuario.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.usuarioService.login(email, password).subscribe(
        (user) => {
          if (user) {
            this.presentToast('Login exitoso', 'success');
            
            // Crear NavigationExtras con los datos del usuario
            const navigationExtras: NavigationExtras = {
              state: {
                usuario: {
                  id: user.id,
                  nombre: user.nombre,
                  apellido: user.apellido,
                  email: user.email
                }
              }
            };
            
            // Navegar al menú con los datos del usuario
            this.router.navigate(['/menu'], navigationExtras);
          } else {
            this.presentToast('Credenciales inválidas', 'danger');
          }
        },
        (error) => {
          console.error('Error en el login', error);
          this.presentToast('Error en el login', 'danger');
        }
      );
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}