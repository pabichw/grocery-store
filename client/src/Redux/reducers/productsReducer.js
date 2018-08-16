const initialState = {

    products: [
      {
        id:     0,
        name: "Schab",
        price: 999,
        quantity: 1,
        imgUrl: 'http://3.bp.blogspot.com/-szPx_TTTS-Y/U4bcr0rPTRI/AAAAAAAAFyU/Y0ucPWe_qek/s1600/Kotlety+Schabowe+5.jpg',
        desc: {
            text: 'Not necessarily grocery store product, but come on! Schabik taki z ziemniaczkami i mizeria. Mmmm... kurwa zajebiste',
            vitamins: 'B12 C12 C4 AK47',
            origin: 'Polska'
        }
      },{
        id:    1,
        name: 'Carrot',
        price: 123.12,
        quantity: 1,
        imgUrl: "https://media.mercola.com/assets/Images/foodfacts/carrot-nutrition-facts.jpg",
        desc: {
            text: 'Lorem ipsum dolor sit carrot, consectetur adipiscing carrot, carrot carrot eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim carrot, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit carrot cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, carrot carrot carrot carrot officia deserunt mollit anim id est laborum.',
            vitamins: 'B12 C12 C4 AK47',
            origin: 'Italy'
        }
      },{
        id:    2,
        name: 'Beetroot',
        price: 64,
        quantity: 1,
        imgUrl: "http://countryfruit.uy/238-thickbox_default/remolacha.jpg",
        desc: {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            vitamins: 'B12 C12 C4 AK47',
            origin: 'Poland'
        }
      }
    ],
    cart:[],
    total: 0
};

const handleAddProductToCart = (state, action) => {
    let newTotal = state.total + action.payload.product.price;

    let newCart = state.cart;
    const productToAdd = action.payload.product;

    if(productToAdd.quantity > 0) {
        let found = false;
        for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id === productToAdd.id) {
                state.cart[i].quantity += 1; //productToAdd.quantity;
                found = true;
                break;
            }
        }
        if (!found) {
            newCart = [
                ...state.cart,
                action.payload.product
            ];
        }
    }
    return ({
        ...state,
        cart: newCart,
        total: newTotal
    })
};

const handleProductQuantityIncrease = (state, action) => {
    let newProducts = [];
    state.products.map( (p) => {
        if(p.id === action.payload.product.id){
            p.quantity += 1;
        }
        newProducts.push(p);
    });
    return ({
        ...state,
        products: newProducts
    })
};

const handleProductQuantityDecrease = (state, action) => {
    let newProducts = [];
    state.products.map( (p) => {
        if(p.id === action.payload.product.id && p.quantity > 0){
            p.quantity -= 1;
        }
        newProducts.push(p);
    });
    return ({
        ...state,
        products: newProducts
    })
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
        return handleAddProductToCart(state, action);
    case "PRODUCT_QUANTITY_INCREASE":
        return handleProductQuantityIncrease(state, action);
    case "PRODUCT_QUANTITY_DECREASE":
        return handleProductQuantityDecrease(state, action);
    default:
      return state
  }
}