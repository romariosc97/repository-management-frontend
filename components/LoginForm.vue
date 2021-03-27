<template>
    <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Login to access
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or request your access to
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                    luc.iyer@salesforce.com
                </a>
            </p>
            </div>
            <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent="login">
                <input type="hidden" name="remember" value="true">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" v-model="email">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" v-model="password">
                    </div>
                </div>

                <div class="flex justify-center">
                    <button type="submit" class="group relative w-36 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <!-- Heroicon name: solid/lock-closed -->
                        <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
        </div>
</template>
<script>

    export default {
        components: {

        },

        data() {
            return {
                email: '',
                password: '',
            }
        },

        methods: {
            async login() {
                let password = '';
                try {
                    const msgUint8 = new TextEncoder().encode(this.password);
                    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                    password = hashHex;
                    const response = await this.$axios.post('http://localhost:8080/auth/login', {
                        email: this.email,
                        password: password
                    }, { withCredentials: true });                    
                    if(response.data.success){
                        this.$router.push('/dashboard');
                    }else{
                        console.error('Incorrect credentials.');
                    }
                } catch (e) {
                    this.error = e.response.data.message
                }
            }
        }
    }
</script>