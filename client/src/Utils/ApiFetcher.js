import {APIFETCHER_CONFIG} from "../Configs/ApiFetcherConfig";

export function getAllProducts(callback){

      return fetch(APIFETCHER_CONFIG.ROOT_URL + APIFETCHER_CONFIG.PRODUCTS_ACTIONS.GET_ALL)
        .then(resp => resp.json())
          .then(resp => {
              console.log(resp);
              let products = [];
              resp.map((product) => {
                  products.push({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: product.quantity,
                      imgUrl: product.img_url,
                      desc: {
                          vitamins: product.desc_vitamins,
                          text: product.desc_text,
                          origin: product.desc_origin
                      }
                  });
              });
              callback(products);
          })
};