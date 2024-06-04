<template>
  <div>
    <img
      alt="Crossmark logo"
      class="logo"
      src="./assets/titleblock.png"
      height="50"
      style="position: absolute; top: 0; left: 0;"
    />
    <div class="wrapper">
      <h1>Developer's Quest</h1>
    </div>

    <main class="main">
      <div>
        <div class="content">
          <button @click="signIn" class="rounded-button">Sign In and Wait</button>
          <div style="padding-left: 10rem; padding-top: 5rem;"></div>
          <textarea style="width: 75%; height: 10rem;" id="response1" readonly :value="signInResponse"></textarea>
        </div>
        <div class="divider"></div>
        <div class="content">
          <button @click="getUserSession" class="rounded-button">Get Session</button>
          <div style="padding-left: 11rem; padding-top: 5rem;"></div>
          <textarea style="width: 75%; height: 10rem;" id="response2" readonly :value="'Current User: ' + sessionUserResponse"></textarea>
        </div>
        <div class="divider"></div>
        <div class="content">
          <button @click="signTransaction" class="rounded-button">Sign Transaction</button>
          <div style="padding-left: 10rem; padding-top: 5rem;"></div>
          <textarea style="width: 75%; height: 10rem;" id="response3" v-model="signTransactionTxblob"></textarea>
        </div>
        <div class="divider"></div>
        <div class="content">
          <button @click="submitTransaction" class="rounded-button">Submit Transaction</button>
          <div style="padding-left: 10rem; padding-top: 5rem;"></div>
          <textarea style="width: 75%; height: 10rem;" id="response4" v-model="txBlob"></textarea>
        </div>
        <div class="divider"></div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signInResponse: '',
      sessionUserResponse: '',
      signTransactionTxblob: '',
      submitTransactionResponse: '',
      txBlob: ''
    };
  },
  methods: {
    signIn() {
      // Sign in logic here
      this.signInResponse = 'Signed in response';
    },
    getUserSession() {
      // Session logic here
      this.sessionUserResponse = 'User session response';
    },
    signTransaction() {
      // Sign transaction logic here
      this.signTransactionTxblob = 'Transaction blob response';
    },
    submitTransaction() {
      // Submit transaction logic here
      this.submitTransactionResponse = 'Transaction submitted response';
    }
  }
};
</script>

<style>
h1 {
  font-size: 3.125rem;
  color: var(--gray-900);
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.125rem;
  margin-top: 50px;
  margin-bottom: 25px;
}
p {
  margin: 0;
  color: var(--gray-700);
}

main {
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: inherit;
  position: relative;
}

.logo {
  position: absolute;
  top: 0;
  left: 0;
}
.wrapper {
  text-align: center;
}
.main {
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: inherit;
  position: relative;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 3rem;
}
.content h1 {
  margin-top: 1.75rem;
}
.content p {
  margin-top: 1.5rem;
}
.divider {
  height: 1px;
  width: 100%;
  background: white;
  margin-block: 1.5rem;
}
.rounded-button {
  border-radius: 50px;
  text-align: center;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.rounded-button:hover {
  background-color: #0056b3;
}
@media screen and (max-width: 650px) {
  .content {
    flex-direction: column;
    width: max-content;
  }
}
</style>
