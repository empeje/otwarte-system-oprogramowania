import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import sdk from '@crossmarkio/sdk'


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
    console.log('Signing in...');
    let { request, response, createdAt, resolvedAt } = await sdk.async.signInAndWait();
    this.signInResponse = JSON.stringify(response);
  }

  getUserSession = async () =>  {
    const response = sdk.session;
    this.sessionUserResponse = JSON.stringify(response.user);
  }

  signTransaction = async () =>  {
    let { request, response, createdAt, resolvedAt } = await sdk.async.signAndWait({
      TransactionType: 'Payment',
      Account: sdk.session.address,
      Destination: 'rB4iz44nvW2yGDBYTkspVfyR2NMsR3NtfF',
      Amount: '1000000', // XRP in drops
    });
    this.signTransactionTxblob = JSON.stringify(response.data.txBlob);
  }

  submitTransaction = async () =>  {
    let { request, response, createdAt, resolvedAt } = await sdk.async.submitAndWait(
      'rB4iz44nvW2yGDBYTkspVfyR2NMsR3NtfF',
      this.signTransactionTxblob, // XRP in drops
    );
    this.submitTransactionResponse = JSON.stringify(response);
  }

}