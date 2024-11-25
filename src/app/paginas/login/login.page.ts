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
            
            // Crear toma los datos del usuario pero no los muestra todos en menu, esto debe ser modificado para sqlite que no pude hacer funcionar 
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
            
            
            // Navegar al menú con los datos del usuario, no quize que se llamaran con el id ya que no es necesario para el usuario ver su id
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
  //es una alerta que se genera 
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}