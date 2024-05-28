import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private AUTH:AuthService, private router :Router)
  {

  }
  SIGNIN():void
  {
    this.AUTH.doGoogleLogin().then(()=>{this.router.navigate(['/chambres'])})
  }
  tryGoogleLogin ():void
{
this.AUTH.doGoogleLogin().then
(()=>{this.succesRedirect()})
}
succesRedirect():void{
// revenir à la partie front du cloud
// redirection vers /dashboard ou membres
this.router.navigate(['/accueil'])
}

}
