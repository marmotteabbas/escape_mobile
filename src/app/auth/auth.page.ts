import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpResponse } from '@angular/common/http';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  user:{username:string,password:string} = {username:"", password:""};
  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router : Router) { }

  ngOnInit() {
  }

  authForm() {
    this.authService.login(this.user).subscribe((res) => {

      if (res.hasOwnProperty("error")) {
        let alertOptions: AlertOptions = {
          header: 'Erreur',
          buttons: ['Ok']
        }
        alertOptions.message = "Erreur de Login//Mot de passe"
        this.alertController.create(alertOptions).then(alertFire => alertFire.present());
      } else {
        this.router.navigate(['/gameselect'])
      }
      
      console.log(res);
    }, ( async (error: HttpResponse<Object>) => {
        let alertOptions: AlertOptions = {
          header: 'Erreur',
          message: error.statusText,
          buttons: ['Ok']
        }
          alertOptions.message = "Erreur Web avec service Authentification"
        
          let alertFire = await this.alertController.create(alertOptions);
          alertFire.present();
      })
    )
  }

}
