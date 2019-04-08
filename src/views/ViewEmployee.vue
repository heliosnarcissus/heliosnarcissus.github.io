

<template>
    <div id="view-employee">
        <h2>View Employee Page</h2> 
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{name}}</h4></li>
        </ul>
        <table class="centered" id="employee-table">
            <tr>
                 <th>Name</th>
                 <th>{{name}}</th>
            </tr>
             <tr>
                 <th>employee_id</th>
                 <th>{{employee_id}}</th>
            </tr>
            <tr>
                 <th>department</th>
                 <th>{{dept}}</th>
            </tr>
             <tr>
                 <th>position</th>
                 <th>{{position}}</th>
            </tr>       
        </table>
        <router-link to="/" class="btn grey">BACK</router-link>
        <button @click="deleteEmployee"  class="btn red">DELETE</button>

        <div class="fixed-action-btn">
            <router-link v-bind:to="{name: 'edit-employee', params:{employee_id: employee_id}}" class="btn-floating btn-large red"> <i class="fa fa-pencil"></i></router-link>
            
        </div>
    </div>    
</template>

<script>
import Navbar from './Navbar.vue'
import firebase from 'firebase/app'
import db from '../components/firebaseInit'

export default {
    name:'view-employee',
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
    watch:{
        '$route':  'fetchData'
    },
    methods:{
        fetchData () {
                db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                            this.employee_id = doc.data().employee_id
                            this.name = doc.data().name
                            this.dept = doc.data().dept
                            this.position = doc.data().position
                    })
                })
        },
        deleteEmployee(){
            if(confirm('Are you sure you want to delete '+this.name+'\'s record?')){
                  db.collection('employees').where('employee_id','==',this.$route.params.employee_id).get()
                    .then(querySnapshot=>{
                          querySnapshot.forEach( doc => {
                            doc.ref.delete()
                            this.$router.push('/')
                    })
          })  
            }else{
                console.log('No')
            }
        }
    }
}
</script>

<style scoped>
    #employee-table{
        width: 80%;
    }

    table {
         border-collapse: collapse;
         align-self: center;
    }

    table, th {
    border: 1px solid black;
    }
</style>
