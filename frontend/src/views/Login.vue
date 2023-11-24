<template> 
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          Flowbite    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" v-model="user_send.email"   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password"  v-model="user_send.password"   name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div class="flex items-center justify-end">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">{{user}}</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500" @click="logOut">Forgot password?</a>
                  </div>
                  <div class="flex place-content-start">
                    <button class="btn btn-primary "  @click="handleSubmit" >Login</button>
                    <button class="btn btn-primary ml-4"  @click="googleAuth">Login with google</button>
                  </div>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
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
            user_send: {
                email: '',
                password: '',
            },
            navigate: false,
            token: "",
            role_id: "",
        }
    },
    mounted(){
     
    },
    methods: {
        handleSubmit(e) {
         axios.post('http://localhost:8080/auth/login', {
                    email: this.user_send.email,
                    password: this.user_send.password,
                    }).then(response => [
                        this.token = response.data.token,
                        this.navigate = response.data.status,
                        this.role_id = response.data.role_id,
                    ]);   
                     event.preventDefault()       
                setTimeout(() => {
                   if(this.navigate){
                        localStorage.setItem('user', JSON.stringify(this.token));
                        localStorage.setItem('roleid',JSON.stringify(this.role_id));
                        window.location.href = '/home'
                    }
                 },1000);
        },

        logOut() {
            localStorage.removeItem('user');
        },

        googleAuth() {
            window.open('http://localhost:8080/auth/google',"_self")
        }

    }
};
</script>