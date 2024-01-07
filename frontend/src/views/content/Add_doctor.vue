<template>
    <div>
      <div class="p-4 sm:ml-64">
        <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
            <div>
              <h2 class="font-semibold text-xl text-gray-600">THÊM BÁC SĨ</h2>
              <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div class="text-gray-600">
                    <p class="font-medium text-lg">THÔNG TIN CÁ NHÂN</p>
                    <p>Điền thông tin bác sĩ.
                    </p>
                  </div>
                  <div class="lg:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div class="md:col-span-5">
                        <label for="full_name">Họ và tên</label>
                        <input type="text" v-model="doctor.name" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                      </div>

                      <div class="md:col-span-5">
                        <label for="email">Địa chỉ email</label>
                        <input type="text" v-model="doctor.email" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
                      </div>

                      <div class="md:col-span-3">
                        <label for="birthday">Ngày sinh</label>
                       <input type="date" v-model="doctor.birth" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"> 
                      </div>

                      <div class="md:col-span-2">
                        <label for="phone">Số điện thoại</label>
                        <input type="text" v-model="doctor.phone"  name="phone" id="phone" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                      </div>

                      <div class="md:col-span-5">
                        <label for="address">Địa chỉ</label>
                        <input type="text" v-model="doctor.address"  name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                      </div>

                      <div class="md:col-span-5">
                        <label for="sex">Giới tính</label>
                        <select type="text" v-model="doctor.sex"  name="sex" id="sex" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="">
                          <option >Giới tính</option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      </div>

                      <div class="md:col-span-5">
                        <label for="specific">Chuyên khoa</label>
                        <select type="text" v-model="doctor.spec" name="specific" id="specific" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="">
                          <option value="">Chuyên khoa</option>
                          <option value="test">Xét Nghiệm</option>
                          <option value="pediatrics">Nhi khoa</option>
                          <option value="obstetric">Sản Phụ khoa</option>
                          <option value="mbj">Cơ - xương - khớp</option>
                          <option value="surgery">Khoa Ngoại</option>
                          <option value="ent">Tai Mũi Họng</option>
                          <option value="heart">Tim mạch</option>
                          <option value="hd">Tiêu Hóa Gan Mật</option>
                          <option value="medical">Nội tổng quát</option>
                          <option value="eyes">Mắt</option>
                          <option value="dento">Răng - Hàm - Mặt</option>
                          <option value="neuro">Nội Thần Kinh</option>
                          <option value="mind">Tâm Thể</option>
                          <option value="endocrine">Nội Tiết</option>
                          <option value="allergy">Dị ứng miễn dịch</option>
                          <option value="respiratory">Hô Hấp</option>
                          <option value="sleepy">Tư vấn giấc ngủ</option>
                          <option value="general">Khám sức khỏe tổng quát</option>
                          <option value="covid19">Khám sức khỏe hậu Covid-19</option>
                          <option value="skin">Da Liễu</option>
                        </select>
                      </div>

                      <div class="md:col-span-5 text-right">
                        <div class="inline-flex items-end">
                          <button @click="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
</div>
</template>
  
<script>
import axios from 'axios';

  export default {
  data () {
    return {
      doctor: {
                name: '',
                email: '',
                birth: '',
                phone: "",
                address: "",
                sex: "",
                spec:"",
            },
    }
  },
  methods: {
     submit(e) 
     {
        console.log(this.doctor);
        axios.post('http://localhost:8080/doctor/add_doctor',
        
          this.doctor
        ).then(response => [    
        ])
        window.location.reload();
        
     }
  }
}
</script>