import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import sdk from "@crossmarkio/sdk";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Starter Template";
  signInResponse: string = "";
  sessionUserResponse: string = "";
  signTransactionTxblob: string = "";
  submitTransactionResponse: string = "";

  signIn = async () => {
    // Sign in logic here
    let address = (await sdk.async.signInAndWait()).response.data.address;
    return (this.signInResponse = address);
  };

  getUserSession = async () => {
    // Session logic here
    let id = sdk.session.user?.id;
    return (this.sessionUserResponse = id ?? "");
  };

  signTransaction = async () => {
    // Sign transaction logic here
    let resp = await sdk.async.signAndWait({
      TransactionType: "Payment",
      Account: this.signInResponse,
      Destination: "rK8jihXBZCFWZqX95SET3CCi1WdRgZQwex", // Add any destination address here
      Amount: "11000000", // XRP in drops
    });
    return (this.signTransactionTxblob = resp.response.data.txBlob);
  };

  submitTransaction = async () => {
    // Submit transaction logic here
    let resp = await sdk.async.submitAndWait(
      this.signInResponse,
      this.signTransactionTxblob
    );
    return (this.submitTransactionResponse =
      resp.response.data.resp.result.hash);
  };
}
