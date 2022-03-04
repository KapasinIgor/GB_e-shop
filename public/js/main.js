const app = new Vue({
    el: '#app',
    methods: {
        getJson(url){
            return fetch(url)
            .then(result => result.json())
            .catch(error => this.$refs.error.setText(error))
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },
        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },
        delJson(url, data){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },
    },
});

// class ProductList{
//   constructor(container = '.products'){
//     this.container = container;
//     this.arrProducts = [];

//     this.getArrProducts()
//       .then(data => {
//         this.arrProducts = data;
//         this.render();
//         this.sumProducts()
//       })
//   }

//   getArrProducts(){
//     return fetch(`${API_URL}/catalogData.json`)
//       .then(result => result.json())
//       .catch(err => {
//         alert(err.message)
//       });
//   }

//   render(){
//     const block = document.querySelector(this.container);
//     for(let product of this.arrProducts){
//       const item = new ProductItem(product);
//       block.insertAdjacentHTML("beforeend", item.render());
//     }
//   }

//   sumProducts() {
//     let sum = 0;
//     this.arrProducts.forEach(item => sum += item.price);
//     console.log(sum);
//   }
// }

// class ProductItem {
//   constructor(product){
//     this.id = product.id;
//     this.title = product.product_name;
//     this.price = product.price;
//     this.img = product.img;
//   }

//   render(){
//       return `<div class="product-item">
//                 <img class="product-item-img" src="${this.img}">
//                 <h3 class="product-item-title">${this.title}</h3>
//                 <p class="product-item-price">${this.price}</p>
//                 <button class="buy-btn" type="button">Добавить</button>
//           </div>`
//   } 
// }

// let productList = new ProductList();

// class Basket {
//   constructor(container = '.cart-block') {
//     this.container = container;
//     this.cartProducts = [];
//     this.showBasket();
//     this.getCartItem()
//      .then(data => {
//       this.cartProducts = data.contents;
//       this.render();
//      })
//   }

//   getCartItem(){
//     return fetch(`${API_URL}/getBasket.json`)
//     .then(arr => arr.json())
//   }

//   showBasket() {  // открыть корзину
//     document.querySelector('.btn-cart').addEventListener('click', () => {
//       document.querySelector(this.container).classList.toggle('invisible')
//     })
//   } 
//   render() {
//     const blockCart = document.querySelector(this.container);
//     for(let product of this.cartProducts) {
//       const item = new BasketItem();
//       blockCart.insertAdjacentHTML("beforeend", item.render(product));
//   } } 
// }

// class BasketItem {

//   render(product) {
//     return `<div class='cart-item' data-id='${product.id_product}'>
//       <div class='cart-left'>
//         <h4 class='cart-name'>${product.product_name}</h4>
//         <p class='cart-quantity'>Количество: ${product.quantity}</p>
//         <p class='cart-price'>Цена: ${product.price}</p>
//       </div>
//       <div class='cart-right'>
//          <p class='cart-sum'>Сумма: ${product.quantity * product.price}</p>
//          <button class="cart-delete">&times</button>
//       </div>
    
//     </div>`
//   }
// }

// let basket = new Basket();

