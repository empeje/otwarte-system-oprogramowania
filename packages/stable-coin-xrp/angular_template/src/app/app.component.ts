import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Developer's Quest";
  signInResponse: string = '';
  sessionUserResponse: string = '';
  signTransactionTxblob: string = '';
  submitTransactionResponse: string = '';


  signIn = async () => {
    // Sign in logic here
  }

  getUserSession = async () =>  {
    // Session logic here
  }

  signTransaction = async () =>  {
    // Sign transaction logic here
  }

  submitTransaction = async () =>  {
    // Submit transaction logic here
  }

}