import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  usuarioForm: FormGroup;
  foto: string | undefined;
  
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}
  //este es el metodo para toamr la foto, en el pc toma fotos de lso archivos y no pude hacerlo funcionar desde el celular en estos 4 dias :S
  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        direction: CameraDirection.Front,
        saveToGallery: false
      });

      this.foto = image.dataUrl;
    } catch (error) {
      console.error('Error al tomar la foto', error);
      this.presentAlert('Error', 'No se pudo tomar la foto');
    }
  }
  //se realiza un post para la bdd de json server por el momento
  async guardarUsuario() {
    if (this.usuarioForm.valid && this.foto) {
      const usuarioData = {
        ...this.usuarioForm.value,
        foto: this.foto
      };

      try {
        await this.usuarioService.agregarUsuario(usuarioData).toPromise();
        await this.presentAlert('Éxito', 'Usuario agregado correctamente');
        this.router.navigate(['/menu']);
      } catch (error) {
        console.error('Error al guardar usuario', error);
        this.presentAlert('Error', 'No se pudo guardar el usuario');
      }
    } else {
      this.presentAlert('Error', 'Por favor complete todos los campos y tome una foto');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}