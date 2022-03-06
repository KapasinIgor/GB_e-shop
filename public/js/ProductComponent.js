Vue.component('products', {
    data(){
        return {
            catalogUrl: `/catalogData.json`,
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `<div class="cards-product">
            <product 
            v-for="product of filtered" 
            :key="product.id_product"
            :product="product"
            :img="product.imgProduct"></product>
        </div>`
 });
 Vue.component('product', {
     props: ['product', 'img'],
     template: `
             <div class="cards-product__item">
                    <div class="cards-product__photo">
                        <img :src="img" alt="card1">
                    </div>
                    <div class="cards-product__overlay">
                        <button class="cards-product__overlay-btn" @click="$root.$refs.cart.addProduct(product)"><img src="./images/basket.svg" alt=""> Add to
                            cart</button>
                    </div>
                    <div class="cards-product__item-text">
                        <a href="./product.html">
                            <h3 class="cardProductName">{{ product.product_name }}</h3>
                        </a><br>
                        <p class="cardProductAbout">Known for her sculptural takes on traditional tailoring,
                            Australian
                            arbiter of cool Kym Ellery
                            teams up with Moda Operandi.</p><br>
                        <strong>$<span class="cardProductPrice">{{ product.price }}</span></strong>
                    </div>
                </div>
     `
 })


