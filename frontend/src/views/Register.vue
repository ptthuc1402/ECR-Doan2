<template> 
<section class="bg-gray-50 dark:bg-gray-900 mx-auto md:h-[50%] lg:py-0 mt-[85px]">
  <div class="flex flex-col items-center justify-center px-6 py-8 ">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img src="https://cdn4.iconfinder.com/data/icons/medical-business/512/medical_help-512.png" class='w-9 h-9 mr-3'>
          BK HEALTH
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
              <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="name"  v-model="user.name" v-validate="'required'" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required="">
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email"  v-model="user.email" v-validate="'required'" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" v-model="user.confirmPassword" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div class="flex items-start">
                      <!-- <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                      </div> -->
                      <!-- <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div> -->
                       <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      You already have an account? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                      </p>
                  </div>
                
                  <div class="form-group">
                <button class="btn btn-primary "  @click="handleSubmit" >Register</button>
                <img />
            </div>
              </form>
          </div>
      </div>
  </div>
</section>
</template> 
<script>

import axios from "axios"
export default {
    
    data () {
        return {
            user: {
                name: "",
                email: '',
                password: '',
                confirmPassword: ""
            },
            navigate: false,
            token : "",
            role_id: "",
        }
    },
    mounted(){
    
    },
    methods: {
            handleSubmit(e) {
                 axios.post('http://localhost:8080/auth/register', {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    confirmPassword: this.user.confirmPassword,
                    }).then(response => [
                    this.navigate = response.data.status,
                    this.token = response.data.token,
                    this.role_id = response.data.role_id
                    ]) 
                    event.preventDefault()       
                setTimeout(() => {
                    if(this.navigate) { 
                        localStorage.setItem('user', JSON.stringify(this.token ));
                        localStorage.setItem('roleid', JSON.stringify(this.role_id ));
                        window.location.href = '/home'
                    }
                },1000);
        },
    }
};
</script>