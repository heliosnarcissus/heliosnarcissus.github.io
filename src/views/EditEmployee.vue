

<template>
     <div id="new-employee"><h3>New Employee Page</h3> <br>
         <label for="employee_id" >EMPLOYEE ID#</label>
         <input disabled ftype="text" placeholder="employee_id" v-model="employee_id">
         <label for="name" >NAME</label>
         <input type="text" placeholder="name" v-model="name">
         <label for="dept" >DEPARTMENT</label>
         <input type="text" placeholder="dept" v-model="dept">
         <label for="position" >POSITION</label>
         <input type="text" placeholder="position" v-model="position">
          <button class="green btn" @click="updateEmployee">Save</button>
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
      beforeRouteEnter(to, from, next){
        db.collection('employees').where('employee_id','==',to.params.employee_id).get()
          .then(querySnapshot=>{
                querySnapshot.forEach( doc => {
                     next( vm =>{
                         vm.employee_id = doc.data().employee_id
                         vm.name = doc.data().name
                         vm.dept = doc.data().dept
                         vm.position= doc.data().position
                     })
                })
          })  
    },
    methods:{
        updateEmployee(){
             db.collection('employees').where('employee_id', '==',
              this.$route.params.employee_id).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            doc.ref.update({
                                employee_id: this.employee_id,
                                name: this.name,
                                dept: this.dept,
                                position: this.position
                            })     
                        })
                }).then( () => {
                     this.$router.push({name: 'view-employee',
                     params: {employee_id: this.employee_id }})

                })
              .catch(err => alert(err))
        }
    }
     
}
</script>
