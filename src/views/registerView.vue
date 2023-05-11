<template>
    <div class="body">
        <div v-show="error" class="">
                {{ errorMsg }}
        </div>
        <div v-show="success" class="">
                {{ successMsg }}
        </div>
        <div class="container">
            <div class="">
                <div class="card-body">
                    <h4 class="text-white">Create Account</h4>

                    <div class="">
                     
                        
                            <label for="fullName" class="text-white text-center" style="font-size: 15px;">Full Name:</label> <br>
                            <input v-model="fullName" type="text" name="" id=""> <br>

                            <label for="address" class="text-white text-center" style="font-size: 15px;">Address:</label> <br>
                            <input v-model="address" type="text" name="" id="">  <br>


                            <label for="gender" class="text-white text-center" style="font-size: 15px;">Gender:</label><br>
                            <input v-model="gender" type="text" name="" id=""> <br>
                          

                            <label for="emailAdress" class="text-white text-center" style="font-size: 15px;">Email Address:</label> <br>
                            <input v-model="emailAddress" type="email" name="" id=""><br>

                            <label for="contactNumber" class="text-white text-center" style="font-size: 15px;">Contact Number:</label> <br>
                            <input v-model="contactNumber" type="number" name="" id=""> <br>

                            <label for="password" class="text-white text-center" style="font-size: 15px;">Password:</label> <br>
                            <input v-model="password" type="password" name="" id=""> <br>

                            <button  @click="register()" class="float-right mt-3 btn btn-primary"><h5>Register</h5></button>

                    
                    </div>
                 
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {db} from '../firebase/index.js'
import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
import { auth } from '../firebase/index.js'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { RouterLink } from 'vue-router'
import router from '../router'


const fullName = ref('')
const address = ref('')
const gender = ref('')
const emailAddress = ref('')
const contactNumber = ref('')
const password = ref('')
const error = ref('')
const errorMsg = ref('')
const success = ref('')
const successMsg = ref('')






const register = async () => {
    if(fullName.value != '' && address.value != '' && gender.value != '' && emailAddress.value != '' && contactNumber.value != null && password.value != ''){
        
        try{
            const {user} = await createUserWithEmailAndPassword(auth, emailAddress.value, password.value);
            await addDoc (collection(db,"midterm"),{
            fullName:fullName.value,
            address:address.value,
            gender:gender.value,
            emailAddress:emailAddress.value,
            contactNumber:contactNumber.value,
            
            completed: false
        });
        sendEmailVerification(user);
            success.value = true
            error.value = true
            errorMsg.value = "Account registered. A verification mail has been sent to your address"

            fullName.value = ''
        address.value = ''
        gender.value = ''
        emailAddress.value = ''
        contactNumber.value = null
        password.value = null
        }catch(err){
            
            error.value = true
            errorMsg.value = error 
          
        }
    }
    else{
            error.value = true
            errorMsg.value = "Please fill out all the fields"
        }

     
}



</script>

<style>
.body{
    display: grid;
    place-content: center;
}
.container{
    width: 1000px;
}

</style>