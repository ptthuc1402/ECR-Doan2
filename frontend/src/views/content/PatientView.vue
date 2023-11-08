<template> 
<div class="p-4 sm:ml-64">
   <div class="p-4  rounded-lg dark:border-gray-700">
      <div class="grid grid-cols-3 gap-4 mb-4">
         <div class="flex items-center justify-center h-24 rounded rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500">
            <p class="text-2xl text-white font-bold">
            <font-awesome-icon :icon="['fas', 'person']" />
               Patient quantity :  {{patients.length}}
            </p>
         </div>
         <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
      </div>
<!-- table -->
<div class='w-1/3 mt-20'>
    <form>   
    <label for="default-search"   class="  mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input     v-model="search_key" @input="searchFunc"    type="search"   
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." >
        <!-- <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> -->
    </div>

</form> 
 </div>  
<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Patient name
                </th>
                <th scope="col" class="px-6 py-3">
                    Age
                </th>
                <th scope="col" class="px-6 py-3">
                    Job
                    
                </th>
                <th scope="col" class="px-6 py-3">
                Reason To Hospital
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>        
                <th scope="col" class="px-6 py-3">
                    Symptom
                </th>
                <th scope="col" class="px-6 py-3">
                    Temperature, blood pressure, pulse, heart beat
                </th>
                <th scope="col" class="px-6 py-3">
                    Diagnose
                </th>
                <th scope="col" class="px-6 py-3">
                    Drug
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b text-lg dark:bg-gray-900 dark:border-gray-700" v-if='patients_search.length ===0'   v-for="(patient, index) in patients">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {{patient.name}}
                </th>
                <td class="px-6 py-4">
                   {{patient.age}}
                </td>
                <td class="px-6 py-4">
                     {{patient.job}}
                </td>
                <td class="px-6 py-4">
                     {{patient.reason_to_hos}}
                </td>
                <td class="px-6 py-4">
                  {{patient.status}}
                </td>
                <td class="px-6 py-4">
                      {{patient.symptom}}
                </td>
                 <td class="px-6 py-4">
                      {{patient.temperature}}, {{ patient.blood_pressure }},  {{patient.pulse }}, {{patient.heart_beat}}
                </td>
                <td class="px-6 py-4">
                      {{patient.diagnose}}
                </td>
                <td class="px-6 py-4">
                      {{patient.drug}}
                </td>

            </tr>

            <!-- search -->
            <tr class="bg-white border-b text-lg dark:bg-gray-900 dark:border-gray-700" v-else  v-for="(patient, index) in patients_search">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {{patient.name}}
                </th>
                <td class="px-6 py-4">
                   {{patient.age}}
                </td>
                <td class="px-6 py-4">
                     {{patient.job}}
                </td>
                <td class="px-6 py-4">
                     {{patient.reason_to_hos}}
                </td>
                <td class="px-6 py-4">
                  {{patient.status}}
                </td>
                <td class="px-6 py-4">
                      {{patient.symptom}}
                </td>
                 <td class="px-6 py-4">
                      {{patient.temperature}}, {{ patient.blood_pressure }},  {{patient.pulse }}, {{patient.heart_beat}}
                </td>
                <td class="px-6 py-4">
                      {{patient.diagnose}}
                </td>
                <td class="px-6 py-4">
                      {{patient.drug}}
                </td>

            </tr>
        </tbody>
    </table>
</div>
</div>
</div>

</template>

<script lang="js">
import axios from "axios"

export default {
    data () {
        return {
            patients: {
            },
            patients_search: [],
            search_key: ""
        }
    },
    mounted(){
        const data= this.search
         axios.get('http://localhost:8080/patient/index', {
                    }).then(response => [   
                       this.patients = response.data.patients, 
                    ]);          
    },
    methods: {
        searchFunc() {
            const data= this.search_key
            axios.post('http://localhost:8080/patient/search', {
                data
                    }).then(response => [     
                       this.patients_search = response.data.patients,      
                    ]);     
    }
  }
};
</script> 
