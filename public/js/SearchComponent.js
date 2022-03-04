 Vue.component('search', {
  data() {
    return {
       showSearch: true,
       userSearch: ''
    }
  },
      template: `<form action="#" method="post" class="search-form" v-show="showSearch" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                    <input type="text" class="search-field" v-model="userSearch">
                    </button>
                </form>`
 });