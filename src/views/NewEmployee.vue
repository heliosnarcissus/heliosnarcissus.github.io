

<template>
     <div id="new-employee"><h3>New Employee Page</h3> <br>
         <input type="text" placeholder="employee_id" v-model="employee_id">
         <input type="text" placeholder="name" v-model="name">
         <input type="text" placeholder="dept" v-model="dept">
         <input type="text" placeholder="position" v-model="position">
          <button class="green btn" @click="saveEmployee">Save</button>
          <router-link to="/" class="grey btn" >Cancel</router-link>
     </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '../components/firebaseInit'

export default {
    name:'new-employee',
    data(){
        return{
            employee_id: null,
            name: null,
            dept: null,
            position: null
        }
    },
    methods:{
        saveEmployee(){
            db.collection('employees').add({
                employee_id: this.employee_id,
                name: this.name,
                dept: this.dept,
                position: this.position
            }).then(docRef => this.$router.push('/'))
              .catch(err => alert(err))
        }
    }
}
</script>
