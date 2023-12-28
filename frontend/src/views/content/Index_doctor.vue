<template>
  

<div class="relative overflow-x-auto">
   <div class="p-4  rounded-lg dark:border-gray-700">
      <div class="grid grid-cols-3 gap-4 mb-4 ml-[300px] mt-[50px]">
         <div class="flex items-center justify-center h-24 rounded rounded-2xl  bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <p class="text-2xl text-white font-bold flex inline">
   <svg class="w-7 h-7 mr-4 mt-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
  </svg>

               Doctor quantity :  {{doctors.length}}
            </p>
         </div>
      </div>
      </div>
    <table class="w-[1500px] text-base text-left rtl:text-right text-gray-500 dark:text-gray-400 ml-[300px] mt-[100px]" v-if="doctors.length!=0">
        <thead class="text-base text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-white  ">
            <tr>
                <th scope="col" class="px-6 py-3 w-[100px] ">
                    Tên bác sĩ
                </th>
                <th scope="col" class="px-6 py-3  w-[100px] ">
                    Email
                </th>
                <th scope="col" class="px-6 py-3  w-[100px] ">
                    Giới tính
                </th>
                <th scope="col" class="px-6 py-3  w-[100px] ">
                   Ngày sinh
                </th>
                <th scope="col" class="px-6 py-3  w-[100px] ">
                    Số điện thoại
                </th>
                    <th scope="col" class="px-6 py-3  w-[100px] ">
                    Địa chỉ
                </th>
                  <th scope="col" class="px-6 py-3  w-[100px]  "> 
                  Chuyên khoa
                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-[100px]"  v-for="(doctor, index) in doctors">
                <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap text-white" >
                   {{doctor.name}}
                </th>
                <td class="px-6 py-4 text-white">
                  {{doctor.email}}
                </td>
                <td class="px-6 py-4 text-white">
                  {{doctor.sex}}
                </td>
                <td class="px-6 py-4 text-white">
                  {{doctor.birth}}
                </td>
                <td class="px-6 py-4 text-white">
                 {{doctor.phone}}
                </td>
                <td class="px-6 py-4">
                   {{doctor.address}}
                </td>
                <td class="px-6 py-4 text-white">
                  {{doctor.spec}}
                </td>
            </tr>
        </tbody>
    </table>
    <div v-else> Empty table</div>
</div>

</template>
  
<script lang="js">
import axios from "axios"

export default {
    data () {
        return {
        doctors: {}
        }
    },
    mounted(){
         axios.get('http://localhost:8080/doctor/index', {
                    }).then(response => [   
                
                       this.doctors = response.data.doctors,
            
                    ]); 
                   
    }
};
</script> 
