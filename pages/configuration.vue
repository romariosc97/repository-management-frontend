<template>
    <div class="">
        <Navbar />
        <div class="bg-gray-100 p-16">
            <div class="main-dashboard bg-white p-8">
                <div class="text-2xl font-semibold">Configuration</div>
                <div class="text-xl font-medium mt-4">Repositories</div>
                <div class="my-3">
                    <form action="">
                        <div class="w-64 mt-3">
                            <label class="" for="">Github username</label>
                            <div class="flex mt-2">
                                <input required v-model="configuration.github"  type="text" autocomplete="given-name" class="p-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" >
                                <button :disabled="githubInitial === configuration.github" type="button" :class="(githubInitial === configuration.github ? 'disabled:opacity-60 cursor-not-allowed ' : '') + 'bg-white p-2 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-1'" @click.prevent="updateGithub()">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200"></div>
                    </div>
                </div>
                <div class="text-xl font-medium mt-4">Security</div>
                <div class="my-3">
                    <form action="">
                        <div class="w-64 mb-2 inline-block">
                            <label class="" for="">Password</label>
                            <div class="mt-2">
                                <input required v-model="password" type="password" autocomplete="given-name" class="p-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" >
                            </div>
                        </div>
                        <div class="w-64 mb-2 inline-block ml-1">
                            <label class="" for="">New password</label>
                            <div class="mt-2">
                                <input required v-model="newPassword" type="password" autocomplete="given-name" class="p-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" >
                            </div>
                        </div>
                        <div class="mb-2 inline-block ml-1.5">
                            <div class="mt-2">
                                <button type="button" :class="'bg-white p-2 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'" @click.prevent="updatePassword()">
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {

        },

        computed: {

        },

        data() {
            return {
                configuration: {github: ''},
                githubInitial: '',
                password: '',
                newPassword: ''
            }
        },

        methods: {
            async getConfiguration() {
                try {
                    const sessionAxios = this.$axios.create({
                        withCredentials: true
                    });
                    const response = await sessionAxios.get('http://localhost:8080/api/configuration');
                    this.configuration = response.data.data;
                    this.githubInitial = response.data.data.github;
                } catch (e) {
                    this.error = e.response.data.message
                }
            },
            async updateGithub() {
                const loginAxios = this.$axios.create({
                    withCredentials: true
                });
                const response = await loginAxios.post('http://localhost:8080/api/configuration', {
                    github: this.configuration.github
                }); 
                if(response.data.success){
                    this.$store.commit('setToastConf', {message: 'Updated successfully.', type: 'Success'});
                    this.$store.commit('setToastState', {status: true});
                    setTimeout(() => { 
                        this.$store.commit('setToastState', {status: false});
                    }, 5000);
                }else{
                    console.error('Error');
                }

            },
            async updatePassword() {
                const loginAxios = this.$axios.create({
                    withCredentials: true
                });
                let password = '', newPassword = '';
                const msgUint8 = new TextEncoder().encode(this.password);
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                password = hashHex;

                const msgUint8_b = new TextEncoder().encode(this.newPassword);
                const hashBuffer_b = await crypto.subtle.digest('SHA-256', msgUint8_b);
                const hashArray_b = Array.from(new Uint8Array(hashBuffer_b));
                const hashHex_b = hashArray_b.map(b => b.toString(16).padStart(2, '0')).join('');
                newPassword = hashHex_b;

                const response = await loginAxios.post('http://localhost:8080/api/configuration/change-password', {
                    password: password,
                    new_password: newPassword,
                }); 
                if(response.data.success){
                    this.$store.commit('setToastConf', {message: 'Updated successfully.', type: 'Success'});
                    this.$store.commit('setToastState', {status: true});
                    setTimeout(() => { 
                        this.$store.commit('setToastState', {status: false});
                    }, 5000);
                }else{
                    this.$store.commit('setToastConf', {message: 'Password incorrect.', type: 'Error'});
                    this.$store.commit('setToastState', {status: true});
                    setTimeout(() => { 
                        this.$store.commit('setToastState', {status: false});
                    }, 5000);
                }

            },
        },

        mounted: function () {
            this.getConfiguration();
        },
    }
</script>

<style>

</style>