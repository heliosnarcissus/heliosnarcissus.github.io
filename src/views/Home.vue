<template>
    <div id="home">
        
        <h4>Welcome Home {{this.userName}}! </h4><br>

      <ul class="collection with-header">
      <li class="collection-header"><h4>Employees</h4></li>
      <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
        <div class="chip" id="chip-id" >{{employee.dept}}</div>
             {{employee.employee_id}}: {{employee.name}} 
         <router-link class="secondary-content" v-bind:to="{ name: 'view-employee', params: { employee_id: employee.employee_id }}"><i class="fa fa-eye"></i></router-link>
      </li>
    </ul>
        <!--img src="../assets/motorlogo.jpg" alt="0-->      
        <div class="fixed-action-btn">
              <router-link  to="/new" class="btn-floating btn-large red"> <i class="fa fa-plus"></i></router-link>         
        </div>     
        <div class="logout">
              <button @click="logoutCurrentUser" id="logout-btn">Logout</button> 
        </div>
    </div>
</template> 
  
<script> 
import Navbar from './Navbar.vue'
import firebase from 'firebase/app'
import db from '../components/firebaseInit'

export default {
    name: 'home',
    components:{
        Navbar
    },
    data(){
        return{
            userName: '',
            employees: []
        }
    },
    created(){
        db.collection('employees').orderBy('dept').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.data().name );
                const data = {
                    'id': doc.id,
                    'employee_id': doc.data().employee_id,
                    'name': doc.data().name,
                    'dept': doc.data().dept, 
                    'position': doc.data().position
                }
                this.employees.push(data)
            });
        })
    },
    methods: {
        fuckyou: function(){
            console.log('fuck u')
        },
        logoutCurrentUser: function(){
            firebase.auth().signOut().then( () => {
                console.log('Signed Out');
               
                this.$router.replace('login');
            }, function(error) {
                console.error('Sign Out Error', error);
            });
        }
    },
     mounted(){
         this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been rendered
            console.log("Home Screen.");
            console.log(firebase.auth().currentUser)
            if(firebase.auth().currentUser.displayName === null){
                this.userName = firebase.auth().currentUser.email
            }else{
                 this.userName = firebase.auth().currentUser.displayName
            }
            
        })
      
   }
}
</script>

<style>
    #chip-id{

    }
</style>
