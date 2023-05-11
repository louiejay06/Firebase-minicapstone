

<template>
  <div class="">
    <div class="">
      <header class="p-4">

      <nav class="text-left" v-show="!ifSingedIn">
        <RouterLink to="/" class="btn nav1 m-3"><h3>Register</h3></RouterLink>
        <RouterLink to="/login" class="btn nav2 m-3"><h3>Login</h3></RouterLink>
      </nav>
      <div v-for="midterm in midterms" :key="midterm.midterms" v-show="ifSingedIn">

        <nav class="text-left" >
          <div class="d-flex">
            <RouterLink to="/home" class="btn nav1 m-3"><h3>Home</h3></RouterLink>
            <RouterLink to="/dashboard" class="btn nav1 m-3"><h3>Dashboard</h3></RouterLink>
            <RouterLink to="/login" class="btn nav1 m-3" @click="logout()"><h3>{{ midterm.fullName }}</h3></RouterLink>
          </div>

        </nav>

    </div>
</header>
    </div>
  </div>


  <RouterView />
</template>


<script setup>
import {db} from './firebase/index.js'
import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase/index.js'
import router from './router'

const ifSingedIn = ref (false)


onMounted(()=>{
  onAuthStateChanged(auth, function(user){
    if(user){
      if(user.emailVerified){
        ifSingedIn.value = true
        router.push('/dashboard')
      }
    }else{
      router.push('/login')
    }
  })
})

const logout = () =>{
  signOut(auth)
  .then(()=>{
    ifSingedIn.value = false
    
  })
  window.location.reload();
}


const midterms = ref([])
    const id = ref(1)
    const q = (collection(db, "midterm"));
    
    onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const q = query(collection(db, "midterm"), orderBy("fullName"));
      onSnapshot(q, (snapshot) => {
        const midtermTmp = [];
        snapshot.forEach((doc) => {
          const midterm = {
            id: doc.id,
            fullName: doc.data().fullName,
            address: doc.data().address,
            gender: doc.data().gender,
            emailAddress: doc.data().emailAddress,
            contactNumber: doc.data().contactNumber,
            completed: doc.data().completed,
          };
          if (midterm.emailAddress === user.email) {
            midtermTmp.push(midterm);
          }
        });
        midterms.value = midtermTmp;
      });
    }
  });
});

</script>
