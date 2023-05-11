<template>
 <div class="body">
  <div v-show="error">
    {{ errorMsg }}
  </div>
  <div v-show="success">
    {{ successMsg }}
  </div>
        <div class="container">
            <div class="">
                <div class="card-body">
                    <h3 class="text-white">Login</h3>

                    <div class="float-left">                          

                            <label for="emailAdress" class="text-white">Email Address:</label> <br>
                            <input v-model="emailAddress" type="email" name="" id=""><br>


                            <label for="password" class="text-white">Password:</label> <br>
                            <input v-model="password" type="password" name="" id=""> <br>

                            <button @click="login()" class="mt-3 float-right"><h5>Login</h5></button>

                    </div>

                    <div class="log_providers">
                        <div class="log_label">
                            Sign in With: 
                        </div>
                        <div class="log_buttons">
                          <button type="submit" class="provider-button provider-google" @click="signInWithGoogle()">
                            <span class="log_label">Google</span>
                          </button>

                        </div>

                    </div>
                 
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { auth } from '../firebase/index.js'


import router from '../router'

const emailAddress = ref('')
const password = ref('')

const success = ref('')
const successMsg = ref('')

const error = ref('')
const errorMsg = ref('')

const login = () => {
  signInWithEmailAndPassword(auth, emailAddress.value, password.value)
  .then((cred)=>{
    if(cred.user.emailVerified){
      router.push('/dashboard')
    }else{
      error.value = true
      errorMsg.value = "Account not verified"
      emailAddress.value = ''
      password.value =  ''
    }
    
  })
  .catch((err)=>{
    error.value = true
    errorMsg.value = err.message
  })
 
  
}

const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
          signInWithPopup(auth, provider)
            .then((cred) => {
              console.log(cred.user)
              router.push('/dashboard')
            })
              .catch((err) => {
                error.value = true
                errorMsg.value = err.message
              })
  }

</script>