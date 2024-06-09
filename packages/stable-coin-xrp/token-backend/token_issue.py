import xrpl
from xrpl.models.requests import AccountInfo
from xrpl.wallet import generate_faucet_wallet, Wallet
from utils.constants import TESTNET_URL, COMPANY_DOMAIN_NAME
from utils.helper import get_seed

testnet_client = xrpl.clients.JsonRpcClient(TESTNET_URL)


class AdminWallet():
    def __init__(self, seed, client):
        self.wallet = Wallet.from_seed(seed)
        self.client = client

    def get_wallet(self):
        return self.wallet

    def get_balance(self):
        account_info_request = AccountInfo(
            account=self.wallet.address,
            ledger_index="validated",
            strict=True
        )

        # Step 4: Fetch the account information
        response = self.client.request(account_info_request)

        # Step 5: Extract the balance
        if response.is_successful():
            print(response)
            account_data = response.result["account_data"]
            balance = int(account_data["Balance"]) / 1_000_000  # The balance is returned in drops
            print(f"Account balance: {balance} XRP")
            return balance
        else:
            print(f"Error fetching account info: {response.result['error_message']}")
            return None

    def configure_as_hot(self):
        # Configure hot address settings -----------------------------------------------
        hot_settings_tx = xrpl.models.transactions.AccountSet(
            account=self.wallet.address,
            set_flag=xrpl.models.transactions.AccountSetAsfFlag.ASF_REQUIRE_AUTH,
        )

        print("Sending hot address AccountSet transaction...")
        response = xrpl.transaction.submit_and_wait(hot_settings_tx, self.client, self.wallet)
        print(response)

    def configure_as_cold(self):
        # Configure issuer (cold address) settings -------------------------------------
        cold_settings_tx = xrpl.models.transactions.AccountSet(
            account=self.wallet.address,
            transfer_rate=0,
            tick_size=5,
            domain=bytes.hex(COMPANY_DOMAIN_NAME.encode("ASCII")),
            set_flag=xrpl.models.transactions.AccountSetAsfFlag.ASF_DEFAULT_RIPPLE,
        )

        print("Sending cold address AccountSet transaction...")
        response = xrpl.transaction.submit_and_wait(cold_settings_tx, self.client, self.wallet)
        print(response)


class TokenIssuer():
    def __init__(self, client, currency_code, hot_wallet, cold_wallet, supply: int):
        self.client = client
        self.currency_code = currency_code
        self.hot_wallet = hot_wallet
        self.cold_wallet = cold_wallet
        self.supply = supply

    def establish_trust_set(self):
        trust_set_tx = xrpl.models.transactions.TrustSet(
            account=self.hot_wallet.address,
            limit_amount=xrpl.models.amounts.issued_currency_amount.IssuedCurrencyAmount(
                currency=self.currency_code,
                issuer=self.cold_wallet.address,
                value=str(self.supply),  # Large limit, arbitrarily chosen
            )
        )

        print("Creating trust line from hot address to issuer...")
        response = xrpl.transaction.submit_and_wait(trust_set_tx, self.client, self.hot_wallet)
        print(response)

    def issue_tokens(self, quantity: int):
        self.establish_trust_set()
        # Send token -------------------------------------------------------------------
        issue_quantity = str(quantity)
        send_token_tx = xrpl.models.transactions.Payment(
            account=self.cold_wallet.address,
            destination=self.hot_wallet.address,
            amount=xrpl.models.amounts.issued_currency_amount.IssuedCurrencyAmount(
                currency=self.currency_code,
                issuer=self.cold_wallet.address,
                value=issue_quantity
            )
        )

        print(f"Sending {issue_quantity} {self.currency_code} to {self.hot_wallet.address}...")
        response = xrpl.transaction.submit_and_wait(send_token_tx, self.client, self.cold_wallet)
        print(response)


admin_wallet = AdminWallet(get_seed(), testnet_client)
hot_balance = admin_wallet.get_balance()
print(hot_balance)

admin_cold_wallet = AdminWallet(get_seed('cold_wallet'), testnet_client)
cold_balance = admin_cold_wallet.get_balance()
print(cold_balance)

# admin_cold_wallet.configure_as_cold()
# admin_wallet.configure_as_hot()

# idr_token_issuer = TokenIssuer(
#     testnet_client,
#     'IDR',
#     admin_wallet.get_wallet(),
#     admin_cold_wallet.get_wallet(),
#     1_000_000_000_000_000
# )
# idr_token_issuer.issue_tokens(5_000_000)
# inr_token_issuer = TokenIssuer(
#     testnet_client,
#     'INR',
#     admin_wallet.get_wallet(),
#     admin_cold_wallet.get_wallet(),
#     1_000_000_000
# )
# inr_token_issuer.issue_tokens(5_000_000)
#

