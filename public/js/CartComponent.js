Vue.component('cart', {
    data() {
        return {
            showCart: false,
            cartItems: [],
        }
    },
    methods: {
        addProduct( product ) {
            let find = this.cartItems.find( el => el.id_product === product.id_product );
            if ( find ) {
                this.$parent.putJson( `/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: 1 } )
                    .then( data => {
                        if ( data.result ) {
                            find.quantity++;
                        }
                    } )
            } else {
                let prod = Object.assign( { quantity: 1 }, product );
                this.$parent.postJson( `api/cart/${ product.id_product }/${ product.product_name }`, prod )
                    .then( data => {
                        if ( data.result ) {
                            this.cartItems.push( prod );
                        }
                    } )
            }
        },
        remove( product ) {
            if ( product.quantity > 1 ) {
                this.$parent.putJson( `/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: -1 } )
                    .then( data => {
                        if ( data.result ) {
                            product.quantity--;
                        }
                    } )
            } else {
                this.$parent.delJson( `/api/cart/${ product.id_product }/${ product.product_name }`, product )
                    .then( data => {
                        if ( data.result ) {
                            this.cartItems.splice( this.cartItems.indexOf( product ), 1 );
                        } else {
                            console.log( 'error' );
                        }
                    } )
            }
        },
    },
    mounted() {
        this.$parent.getJson( `/api/cart` )
            .then( data => {
                for ( let el of data.contents ) {
                    this.cartItems.push( el )
                }
            } );
    },
    template: `<a><img @click="showCart = !showCart" class="cart-icon" src="images/basket.svg" alt="basket"><span
                        class="cart-number">0</span><div class="cart__window" v-show="showCart">
        <p v-if="!cartItems.length">В корзине нет товаров</p>
        <a class="cart-link" href="cart.html" v-if="cartItems.length" >Перейти в корзину для оформления</a>
            <cart-item v-for="item of cartItems" 
            :key="item.id_product"
            :img="item.imgProduct" 
            :cart-item="item"
            @remove="remove"></cart-item>
        </div></a>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
        <div class="productCart__item">
                    <div>
                        <img :src="img" alt="slon">
                    </div>
                    <div class="productCart__item-text">
                        <h3>{{ cartItem.product_name }}</h3>
                        <p>Цена: <strong> ₽{{ cartItem.price }}</strong></p>
                        <p>Кол-во:<strong> {{ cartItem.quantity }}</strong></p>
                        <p>Итого:<strong> ₽{{ cartItem.quantity*cartItem.price }} </strong></p>
                    </div>
                    <svg @click="$emit('remove', cartItem)" width="15" height="15" viewBox="0 0 18 18" fill="#575757"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                                d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"/>
                    </svg>
                </div>
    `
})

