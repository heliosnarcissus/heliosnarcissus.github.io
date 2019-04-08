<template>
  <div id="app">
    <Navbar/>
    
   
    <router-view/>
  </div>
</template>

<script>

import Navbar from './views/Navbar.vue';
import NewEmployee from './views/NewEmployee.vue';
import EditEmployee from './views/EditEmployee.vue';
import ViewEmployee from './views/ViewEmployee.vue';


export default {
    name:'app',
    components: {
       Navbar,
       NewEmployee,
       ViewEmployee,
       EditEmployee
    }
}
</script>
