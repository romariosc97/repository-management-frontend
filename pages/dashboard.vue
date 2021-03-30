<template>
    <div class="">
        <Navbar />
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
            async getSession() {
                try {
                    const sessionAxios = this.$axios.create({
                        withCredentials: true
                    });
                    const response = await sessionAxios.get('http://localhost:8080/auth/session');                    
                    console.log(response.data);
                    if(response.data.success){
                        console.log(response.data);
                    }else{
                        this.$router.push('/');
                    }
                } catch (e) {
                    this.error = e.response.data.message
                }
            }
        },

        mounted: function () {
            console.log(this);
            this.getSession();
        },
    }
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>