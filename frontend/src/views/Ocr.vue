<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { UploadFileInfo, useMessage } from 'naive-ui';
import useClipboard from 'vue-clipboard3';

import TesseractEngine from '@/ocr/tesseract';
import { cleanText } from '@/utils/strings';
import { useI18n } from 'vue-i18n';

import { DEFAULT_TIMEOUT } from '@/constants';

const { t } = useI18n();

enum Status {
  NotStart,
  Loading,
  Loaded,
  Recognizing,
  Success,
  Fail
}


const internalFileList = ref([]);
const fileList = ref<UploadFileInfo[]>();
const previewSrc = ref('');
// status of load image and recognize
const progressStatus = ref<Status>(Status.NotStart);
const isShowModal = ref(false);
const modalTimeout = ref(DEFAULT_TIMEOUT);

const recognizeText = ref('');
const prettifiedText = ref('');
  
var patients = {patient_id: "",name: "", age: "", gender: "", address: "", job:"", reason_to_hos: "", symptom: "", status: "", oxygen:"", temperature: " ", 
heart_beat:"", diagnose: "", drug: "", date_to_hos : ""}
/* OCR engine */
const tesseract = new TesseractEngine();

async function tesseractRecognize(url: string) {
  progressStatus.value = Status.Recognizing;
  try {
    const str = await tesseract.recognize(url);
    var name_tit = "Họ và tên"
    var age_tit = "Tuổi"
    var gender_tit = "Giới tính"
    var job_tit = "Nghề nghiệp"
    var add_tit = "Địa chỉ"
    var nation_tit = "Dân tộc"
    var day_to_host ="Ngày nhập viện"
    var reason_to_hos_tit = "Lý Do Nhập Viện"
    var status_tit = "Tình trạng lúc nhập viện"
    var symptom_tit = "Triệu chứng"
    var temperature_tit = "Nhiệt độ"
    var blood_pressure_tit = "Huyết áp"
    var pulse_tit = "Mạch"
    var heart_beat_tit = "Nhịp thở"
    var diagnose_tit = "Bệnh:"
    var drug_tit = "Thuốc"
    var patient_id_tit = "ID bệnh nhân"

    var patient_id = str.slice(str.indexOf(patient_id_tit) + patient_id_tit.length +1, str.indexOf(name_tit)).trim();
    var name = str.slice(str.indexOf(name_tit) + name_tit.length +1, str.indexOf(age_tit)).trim();
    var age =  str.slice(str.indexOf(age_tit) + age_tit.length +1, str.indexOf(gender_tit));
    var gender =  str.slice(str.indexOf(gender_tit) + gender_tit.length +1, str.indexOf(job_tit));
    var address =  str.slice(str.indexOf(add_tit) + add_tit.length +1, str.indexOf(day_to_host));
    var job =  str.slice(str.indexOf(job_tit) + job_tit.length +1, str.indexOf(nation_tit));
    var reason_to_hos =  str.slice(str.indexOf(reason_to_hos_tit) + reason_to_hos_tit.length +1, str.indexOf("3."));
    var symptom =  str.slice(str.indexOf(symptom_tit) + symptom_tit.length +1, str.indexOf(pulse_tit));
    var status =  str.slice(str.indexOf(status_tit) + status_tit.length +1, str.indexOf(symptom_tit));
    var temperature = str.slice(str.indexOf(temperature_tit) + temperature_tit.length +1, str.indexOf(blood_pressure_tit));
    var heart_beat = str.slice(str.indexOf(heart_beat_tit) + heart_beat_tit.length +1, str.indexOf("4. Chẩn đoán"));
    var diagnose = str.slice(str.indexOf(diagnose_tit)  + diagnose_tit.length +1, str.indexOf("5. Kê toa"));
    var drug = str.slice(str.indexOf(drug_tit) + drug_tit.length +1, str.indexOf("Liều lượng"));

    patients.patient_id = patient_id;
    patients.name = name;
    patients.age = age;
    patients.gender = gender;
    patients.address = address;
    patients.job = job;
    patients.reason_to_hos = reason_to_hos;
    patients.symptom = symptom;
    patients.status = status;
    patients.temperature = temperature;
    patients.heart_beat = heart_beat;
    patients.diagnose = diagnose;
    patients.drug = drug;   
    progressStatus.value = Status.Success;
    recognizeText.value = str;
    prettifiedText.value = str;
  } catch (e) {
    progressStatus.value = Status.Fail;
    console.error(e);
  }
  countdown();
}

function countdown() {
  if (modalTimeout.value > 0) {
    modalTimeout.value--;
    setTimeout(countdown, 1000);
  } else {
    isShowModal.value = false;
    modalTimeout.value = DEFAULT_TIMEOUT;
  }
}

async function handleFileListChange() {
  const newFile = fileList.value?.[fileList.value.length - 1] as UploadFileInfo;
  const url = URL.createObjectURL(newFile.file!);

  previewSrc.value = url;
  progressStatus.value = Status.Loading;
  isShowModal.value = true;
}

function handleDrop(event) {
  event.preventDefault();
  const files = event.dataTransfer.files;
  fileList.value = [];
  internalFileList.value.concat(files);
}

// event handlers
const { toClipboard } = useClipboard();
const message = useMessage();

async function copyText() {
  try {
    await toClipboard(prettifiedText.value);
    message.success(t('ocr.modal.copy.success'));
  } catch (e) {
    console.error(e);
    message.error(t('ocr.modal.copy.failed'));
  }
}

function prettifyText() {
  prettifiedText.value = cleanText(recognizeText.value);
  message.success(t('ocr.modal.prettify.success'));
}

function resetText() {
  prettifiedText.value = recognizeText.value;
  message.success(t('ocr.modal.raw.success'));
}

async function addtotable() {
  try {
    const text_copy = await toClipboard(prettifiedText.value);
    const text = text_copy.text;

  } catch (e) {
    console.error(e);
   
  }
}

// ref: https://web.dev/patterns/clipboard/paste-images/
async function handlePaste(e) {
  try {
    const clipboardItems =
      typeof navigator?.clipboard?.read === 'function'
        ? await navigator.clipboard.read()
        : e.clipboardData.files;
    for (const clipboardItem of clipboardItems) {
      let blob;
      if (clipboardItem.type?.startsWith('image/')) {
        // For files from `e.clipboardData.files`.
        blob = clipboardItem;
      } else {
        // For files from `navigator.clipboard.read()`.
        const imageTypes = clipboardItem.types?.filter((type) => type.startsWith('image/'));
        for (const imageType of imageTypes) {
          blob = await clipboardItem.getType(imageType);
        }
      }
      const url = URL.createObjectURL(blob);
      previewSrc.value = url;
      progressStatus.value = Status.Loading;
      isShowModal.value = true;
    }
  } catch (e) {
    console.error(e);
    message.error('Failed to paste');
  }
}

async function loadSuccess() {
  progressStatus.value = Status.Loaded;
  await tesseractRecognize(previewSrc.value);
}

// async function saveData() {
//   const data =  await toClipboard(prettifiedText.value);
//   const data_send = data.text;
//   axios.post('http://localhost:8080/ocr/ocr_detect', {data_send
//                     }).then(response => [
//                     ])
// }


function loadFailed() {
  progressStatus.value = Status.Fail;
}

/* hook functions */
onMounted(async () => {
  await tesseract.init();
});

</script>



<template>

  <div class="flex flex-col my-16 mx-8 gap-4 justify-around md:flex-row" @paste="handlePaste">
    <div class="flex flex-col gap-4 md:w-2/5">
      <n-upload
        v-model:file-list="fileList"
        accept="image/*"
        :show-file-list="false"
        :default-upload="false"
        @update:file-list="handleFileListChange"
      >
        <n-upload-dragger @drop="handleDrop" @dragover.prevent>
          <div>
            <n-icon size="32" :depth="3">
              <archive-icon />
            </n-icon>
          </div>
          <n-text class="text-md font-bold capitalize">{{ t('ocr.upload.title') }}</n-text>
          <n-p depth="3">{{ t('ocr.upload.subTitle') }}</n-p>
        </n-upload-dragger>
      </n-upload>

      <h2 class="title capitalize text-lg font-bold">{{ t('ocr.preview') }}</h2>
      <div>
        <kbd class="kbd">ctrl</kbd>
        +
        <kbd class="kbd">v</kbd>
        <span class="ml-2">{{ t('ocr.kbd') }}</span>
      </div>
      <div class="border-2 rounded border-slate-200 p-2 h-48">
        <n-image
          :src="previewSrc"
          :object-fit="'contain'"
          :img-props="{ id: 'previewImg' }"
          @load="loadSuccess()"
          @error="loadFailed()"
        />
      </div>

      <n-modal v-model:show="isShowModal">
        <n-card
          class="w-4/5 md:w-1/2"
          size="huge"
          :bordered="false"
          preset="dialog"
          aria-modal="true"
          :closable="true"
          :on-close="
            () => {
              isShowModal = false;
            }
          "
        >
          <ul class="steps w-full">
            <li
              class="step"
              :class="progressStatus >= Status.Loaded ? 'step-success' : 'step-error'"
            >
              {{ t('ocr.status.loading') }}
            </li>
            <li
              class="step"
              :class="
                progressStatus < Status.Success
                  ? ''
                  : progressStatus === Status.Success
                  ? 'step-success'
                  : 'step-error'
              "
            >
              {{ t('ocr.status.recognizing') }}
            </li>
          </ul>
          <p class="mt-4 text-right">{{ modalTimeout }} (s)</p>
        </n-card>
      </n-modal>
    </div>

    <div class="flex flex-col gap-4 md:w-2/5">
      <select class="select select-bordered w-full max-w-xs">
        <option disabled selected>{{ t('ocr.engineOptions[0]') }}</option>
        <option>{{ t('ocr.engineOptions[1]') }}</option>
        <option disabled>{{ t('ocr.engineOptions[2]') }}</option>
      </select>
      <h2 class="title capitalize text-lg font-bold">{{ t('ocr.result') }}</h2>
      <div class="flex flex-grow border-2 rounded overflow-y-auto h-64">
        <textarea
          v-model="prettifiedText"
          cols="0"
          class="w-full whitespace-pre-line font-sans"
        ></textarea>
      </div>
      <div class="flex flex-row gap-2">
        <button class="btn normal-case" @click="copyText">{{ t('ocr.operations.copy') }}</button>
      
        <!-- <button class="btn normal-case" @click="resetText">{{ t('ocr.operations.raw') }}</button> -->
        <button class="btn normal-case" > <router-link to="/home">
        <p class="text-center btn normal-case">
         Return Home
        </p>
      </router-link></button>
      </div>
    </div>
  </div>


  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" v-if="patients.name!='' ">
        <thead class="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
               <th scope="col" class="px-6 py-3">
                    Patient ID
                </th>
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
                <th scope="col" class="px-6 py-3">
                    Edit
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b text-lg dark:bg-gray-900 dark:border-gray-700">
                <td class="px-6 py-4" >
                    <span v-if="!isEditable">   {{patients.patient_id}} </span>
                    <input class='w-[150px]' v-else v-model="patients.patient_id" />
                </td>
                <td class="px-6 py-4" >
                    <span v-if="!isEditable">   {{patients.name}} </span>
                    <input class='w-[150px]' v-else v-model="patients.name" />
                </td>
                <td class="px-6 py-4" >
                    <span v-if="!isEditable"> {{patients.age}}  </span> 
                        <input class='w-[100px]' v-else v-model="patients.age" />
                </td>

                <td class="px-6 py-4" >
                      <span v-if="!isEditable">{{   patients.job}} </span>  
                          <input class='w-[100px]' v-else v-model="patients.job" />
                </td>
                <td class="px-6 py-4" >
                    <span v-if="!isEditable"> {{ patients.reason_to_hos}}</span> 
                        <input class='w-[100px]' v-else v-model="patients.reason_to_hos" />
                </td>
                  <td class="px-6 py-4" >
                       <span v-if="!isEditable">{{  patients.status}} </span>  
                       <input class='w-[200x]' v-else v-model="patients.status" />
                </td>
                <td class="px-6 py-4" >
                        <span v-if="!isEditable"> {{  patients.symptom}}</span>  
                        <input class='w-[200px]' v-else v-model="patients.symptom" />
                </td>
                    <td class="px-6 py-4" >
                      <span v-if='isMeasure'> Nhịp tim :{{  heart_beat}}  Nồng độ o2: {{ir_value}}%  Nhiệt độ: {{temperature}}°C</span> 
                </td>

                <td class="px-6 py-4" >
                        <span v-if="!isEditable"> {{  patients.diagnose }}</span> 
                        <input class='w-[100px]' v-else v-model="patients.diagnose" />
                </td>
                <td class="px-6 py-4" >
                        <span v-if="!isEditable">{{   patients.drug}} </span> 
                        <input class='w-[100px]' v-else v-model="patients.drug" />
                </td>
                <td class="px-6 py-4" >
                       <button :disabled="!patients.name" v-if="!isEditable" @click="toggleEdit(patients)" class="btn normal-case p-3 rounded-xl">Edit</button>
                       <button :disabled="!patients.name" v-else @click="saveEdit(patients)" class='btn normal-case rounded-xl  p-3'>Save</button>
                </td>
                
            </tr>
        </tbody>
    </table>
    

</div>
<div v-if="patients.name!='' "> 
 <button :disabled="!patients.name" class="btn normal-case mt-10 float-right mr-[200px]" @click="saveData(patients)">
        Save to database
        </button>
 <button  :disabled="!patients.name"  class="btn normal-case mt-10 float-right mr-[200px]" @click="Measure">
       Measure
        </button>
        </div> 


<div  v-if="isToast==true" id="toast-interactive" class="w-full max-w-xs mt-[25px] p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400 ml-[500px]" role="alert">
    <div class="flex">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-14 h-14 text-green-500 bg-green-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span class="sr-only">Refresh icon</span>
        </div>
        <div class="ms-3 text-sm font-normal h-full">
            <span class="mb-1 text-lg font-semibold text-gray-900 dark:text-white leading-8">Cập nhật thông tin bệnh nhân thành công !</span>
            <div class="mb-2 text-lg font-normal" v-if="date_to_hos">Ngày vào viện trước đó của bệnh nhân : {{date_to_hos}}</div> 
            <div class="mb-2 text-lg font-normal" v-else >Đây là lần đầu bệnh nhân đến tới bệnh viện.</div> 
            <div class="grid grid-cols-2 gap-2">
               
            </div>    
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NUpload, NUploadDragger, NIcon, NText, NP, NImage, NModal, NCard } from 'naive-ui';
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';
import firebase from 'firebase'

import axios from "axios";


const firebaseConfig = {
  apiKey: "AIzaSyAfj9Za-9lkRYgrvKpXptViw6CQbi1jqjo",
  authDomain: "doan2final-2fd75.firebaseapp.com",
  databaseURL: "https://doan2final-2fd75-default-rtdb.firebaseio.com",
  projectId: "doan2final-2fd75",
  storageBucket: "doan2final-2fd75.appspot.com",
  messagingSenderId: "760497431612",
  appId: "1:760497431612:web:f9932bf9b69b3445ed8f39"
};
const app = firebase.initializeApp(firebaseConfig);

let db = app.database()
let ref_test = db.ref('doanfinal')

export default {
    data () {
        return {
        isEditable : false ,
        heart_beat : "" ,
        ir_value : "" ,
        temperature: "" ,
        isMeasure: false,
        isToast: false,
        date_to_hos :""
        }
    },
    mounted(){
     const self = this;
        app.database()
            .ref('doan')
            .on('value', function(snapshot) {

            self.heart_beat = snapshot.val().heart_beat || null;
            self.ir_value = snapshot.val().ir_value/1000 || null;
            self.temperature = snapshot.val().temperature || null;

            });
    },
    methods: {
       toggleEdit(patients) {
      // Toggle the editable state
      this.isEditable = !this.isEditable;
      // console.log(  this.isEditable);
    
    },
    dateComponentPad(value) {
        var format = String(value);
        return format.length < 2 ? '0' + format : format;
    },
    formatDate(date) {
        var datePart = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].map(this.dateComponentPad);
        var timePart = [ date.getHours(), date.getMinutes(), date.getSeconds() ].map(this.dateComponentPad);
        return datePart.join('-') + ' ' + timePart.join(':');
    },
      saveEdit(patients) {
      // Toggle the editable state
      this.isEditable = !this.isEditable;

    },
    saveData(patients) {
      // Toggle the editable state
      


        let date = new Date();
        patients.date_to_hos = this.formatDate(date);
        patients.temperature = this.temperature; 
        patients.oxygen = this.ir_value; 
        patients.heart_beat = this.heart_beat; 
        axios.post('http://localhost:8080/ocr/ocr_detect', {patients
            }).then(response => [
                this.date_to_hos = response.data.date_to_hos
            ])  
        this.isToast =true
        setTimeout(() => {
            this.isToast =false
            this.date_to_hos=""
        }, "5000")  
        },
    
    Measure(patients) {
      // Toggle the editable state
        this.isMeasure = !this.isMeasure;
        console.log(this.isMeasure)
        app.database()
        .ref('doan').set({isMeasure : this.isMeasure})
    
    }
  }
};

</script>


