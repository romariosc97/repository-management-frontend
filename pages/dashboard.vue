<template>
    <div class="">
        <Navbar />
        <div class="bg-gray-100 p-16">
            <div class="main-dashboard bg-white p-8">
                <div class="text-2xl font-semibold">Repositories</div>
                <!-- This example requires Tailwind CSS v2.0+ -->
                <div class="mt-6 flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Url
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Language
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Update at
                                            </th>
                                            <th scope="col" class="relative px-6 py-3">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr v-for="v in repositories" :key="v.id">
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <div class="">
                                                        <div class="text-sm font-medium text-gray-900 mb-2">
                                                            {{v.name}}
                                                        </div>
                                                        <div class="text-sm text-gray-500">
                                                            <div class="text-sm text-gray-500 relative w-80 flex">
                                                                <input :ref="'linkRepo-'+v.id" type="text" :value="v.git_url" autocomplete="given-name" class="p-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" >
                                                                <button type="button" class="bg-white p-2 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-1" @click.prevent="cloneRepo(v.id)">
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-gray-900 mb-2">{{v.html_url}}</div>
                                                <div class="text-sm text-gray-500"><a :href="v.html_url" target="_blank">Open link</a></div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {{v.language}}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{v.updated_at}}
                                            </td>
                                        </tr>

                                        <!-- More items... -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
                repositories: []
            }
        },

        methods: {
            async getRepositories() {
                try {
                    const sessionAxios = this.$axios.create({
                        
                    });
                    const response = await sessionAxios.get('https://api.github.com/users/romariosc97/repos');                    
                    console.log(response.data);
                    this.repositories = response.data;
                } catch (e) {
                    this.error = e.response.data.message
                }
            },
            cloneRepo(id){
                console.log(this.$refs['linkRepo-'+id]);
                
                let linkRepo = this.$refs['linkRepo-'+id][0];
                linkRepo.select();
                document.execCommand("copy");
                
            }
        },

        mounted: function () {
            this.getRepositories();
        },
    }
</script>

<style>
    .main-dashboard {
        min-height: 800px;
        border-radius: 0.5rem;
    }
</style>