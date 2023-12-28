<template>
  

<div class="relative overflow-x-auto">
   <div class="p-4  rounded-lg dark:border-gray-700">
      <div class="grid grid-cols-3 gap-4 mb-4 ml-[300px] mt-[50px]">
         <div class="flex items-center justify-center h-24 rounded rounded-2xl bg-gradient-to-r from-lime-700 to-green-500">
            <p class="text-2xl text-white font-bold flex inline">
   <svg class="w-7 h-7 mr-4 mt-1 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
  </svg>
               Appoinment quantity :  {{appoinments.length}}
            </p>
         </div>
      </div>
      </div>
    <table class="w-[1500px] text-base text-left rtl:text-right text-gray-500 dark:text-gray-400 ml-[300px] mt-[100px]" v-if="appoinments.length!=0">
        <thead class="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  ">
            <tr>
                <th scope="col" class="px-6 py-3 w-[100px] ">
                    Tên bệnh nhân
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
                    <th scope="col" class="px-6 py-3  w-[100px]  ">
                    Thời gian
                </th>
                  <th scope="col" class="px-6 py-3 w-[100px]  ">
                    Triệu chứng
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-[100px]"  v-for="(appoinment, index) in appoinments">
                <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap text-white" >
                   {{appoinment.name}}
                </th>
                <td class="px-6 py-4">
                  {{appoinment.email}}
                </td>
                <td class="px-6 py-4">
                  {{appoinment.sex}}
                </td>
                <td class="px-6 py-4">
                  {{appoinment.birth}}
                </td>
                <td class="px-6 py-4">
                 {{appoinment.phone}}
                </td>
                <td class="px-6 py-4">
                   {{appoinment.address}}
                </td>
                <td class="px-6 py-4">
                  {{appoinment.spec}}
                </td>
               <td class="px-6 py-4">
                  {{appoinment.time}} - {{appoinment.date}}
                </td>
                  <td class="px-6 py-4">
                   {{appoinment.sym}}
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
        appoinments: {}
        }
    },
    mounted(){
         axios.get('http://localhost:8080/appoint/index', {
                    }).then(response => [   
                
                       this.appoinments = response.data.appoinments
                    ]); 
                   
    }
};
</script> 
