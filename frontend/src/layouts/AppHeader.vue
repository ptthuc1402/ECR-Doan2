<script setup lang="ts">
// import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';

// import { Locale } from '@/enums';
import Favicon from '../components/icons/Favicon.vue';
// import QQ from '@/components/icons/QQ.vue';

// const VERSION: string = __VERSION__ as string;

// Change theme
const emit = defineEmits(['update-theme']);
const isDark = ref(false);
const changeTheme = (theme: 'light' | 'dark') => {
  if (theme === 'dark') {
    isDark.value = true;
  } else {
    isDark.value = false;
  }
  emit('update-theme', isDark.value);
  document.documentElement.setAttribute('data-theme', theme);
};
const logOut = () => {
  localStorage.removeItem('user');
  window.location.href ='/login'
};

// Change language
// const { t, locale } = useI18n();
// const useLanguage = ref(Locale.EN_US);
// const changeLanguage = (language: Locale) => {
//   useLanguage.value = language;
//   document.documentElement.setAttribute('lang', language);
//   locale.value = language;
// };

var user = JSON.parse(localStorage.getItem('user')!);
  const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };
var data = initialState.status.loggedIn;



onMounted(() => {
});
 
</script>

<template>
  <div
    class="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content border-b border-slate-900/10"
  >
    <nav class="navbar w-full">
      <div class="flex flex-1 gap-2">
        <div class="flex items-center gap-2" >
          <a
            href="/"
            aria-current="page"
            aria-label="Homepage"
            class="flex-0 btn btn-ghost gap-2 px-2"
          >
            <Favicon />
            <div class="font-title inline-flex text-lg">
              <span class="capitalize">BK</span>
              <span class="uppercase text-green-500">Health</span>
            </div>
          </a>
          <div class="dropdown">
            <ul
              tabindex="0"
              class="dropdown-content menu menu-sm bg-base-200 rounded-box w-36 p-2 shadow"
              data-svelte-h="svelte-vi8k5e"
            >
              <li>
                <a href="https://github.com/plantree/ocr-pwa/tree/main/changelogs.md">Changelogs</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex-0">
        <div title="Change Theme" class="dropdown dropdown-end">
          <label tabindex="0" class="btn normal-case btn-ghost">
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-5 w-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              ></path>
            </svg>
            <svg
              width="12px"
              height="12px"
              class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </label>
          <div
            class="dropdown-content bg-base-200 text-base-content rounded-box top-px w-32 overflow-y-auto shadow mt-16"
          >
            <div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
              <button
                class="outline-base-content overflow-hidden rounded-lg text-left"
                :class="!isDark ? ' [&_svg]:visible' : ''"
                data-set-theme="light"
                data-act-class="[&_svg]:visible"
                @click="changeTheme('light')"
              >
                <div
                  data-theme="light"
                  class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                >
                  <div class="grid grid-cols-5 grid-rows-3">
                    <div
                      class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="invisible h-3 w-3 shrink-0"
                      >
                        <path
                          d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                        ></path>
                      </svg>
                      <div class="flex-grow text-sm">light</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M6.76 4.84l-1.8-1.79l-1.41 1.41l1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407l-1.79 1.79l-1.407-1.408zm-1.8 15.115l1.79 1.8l1.41-1.41l-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41l1.79-1.8l-1.41-1.41z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div></button
              ><button
                class="outline-base-content overflow-hidden rounded-lg text-left"
                :class="isDark ? ' [&_svg]:visible' : ''"
                data-set-theme="dark"
                data-act-class="[&_svg]:visible"
                @click="changeTheme('dark')"
              >
                <div
                  data-theme="dark"
                  class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                >
                  <div class="grid grid-cols-5 grid-rows-3">
                    <div
                      class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="invisible h-3 w-3 shrink-0"
                      >
                        <path
                          d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                        ></path>
                      </svg>
                      <div class="flex-grow text-sm">dark</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M279.135 512c78.756 0 150.982-35.804 198.844-94.775c28.27-34.831-2.558-85.722-46.249-77.401c-82.348 15.683-158.272-47.268-158.272-130.792c0-48.424 26.06-92.292 67.434-115.836c38.745-22.05 28.999-80.788-15.022-88.919A257.936 257.936 0 0 0 279.135 0c-141.36 0-256 114.575-256 256c0 141.36 114.576 256 256 256zm0-464c12.985 0 25.689 1.201 38.016 3.478c-54.76 31.163-91.693 90.042-91.693 157.554c0 113.848 103.641 199.2 215.252 177.944C402.574 433.964 344.366 464 279.135 464c-114.875 0-208-93.125-208-208s93.125-208 208-208z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div title="Profile" class="dropdown dropdown-end" >
          <label tabindex="0" class="btn btn-ghost normal-case" data-svelte-h="svelte-16sc62l">
            Menu
            <svg
              width="12px"
              height="12px"
              class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </label>
          <div
            tabindex="0"
            class="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 w-56 overflow-y-auto shadow"
          >
            <ul class="menu gap-1 text-lg" tabindex="0" >
              <li>
                <button >
                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
                  Profile
                </button>
              </li>
              <li @click="logOut">
                <button >
                  <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
        <span  
          class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
          data-tip="QQ"
        >
          <!-- <div class="flex-none items-center group relative">
            <a
              aria-label="QQ"
              target="_blank"
              href="https://raw.githubusercontent.com/plantree/ocr-pwa/f79a5bd8c56be149f5644c2251841e6100057d6a/public/qrcode.jpeg"
              rel="noopener, noreferrer"
              class="btn btn-ghost drawer-button btn-square normal-case"
            >
              <QQ />
            </a>
          </div> -->
        </span>
        <span
          class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
          data-tip="GitHub"
          data-svelte-h="svelte-j52hjb"
        >
          <div class="flex-none items-center">
            <a
              aria-label="Github"
              target="_blank"
              href="https://github.com/plantree/ocr-pwa"
              rel="noopener, noreferrer"
              class="btn btn-ghost drawer-button btn-square normal-case"
            >
              <Github />
            </a>
          </div>
        </span>
      </div>
    </nav>
  </div>
</template>



