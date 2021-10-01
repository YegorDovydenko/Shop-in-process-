/* eslint-disable jsx-a11y/anchor-has-content */
import { useQuery} from "@apollo/client"
import { Link } from "react-router-dom"
import {GET_PRODUCTS_INFO} from "../graphql/Queries"

export let prodID = ''

export const Categories = ({chooseCategory, chooseCurrency}) => {

    const {data} = useQuery(GET_PRODUCTS_INFO)

    const chooseProduct = (item) => {
        prodID = item
    }

    return(
        <div className="categories">
            <h2>{
                chooseCategory === '' && data ? chooseCategory = data.categories[0].name : chooseCategory
            }</h2>
            <div className="categories__list">
                {
                    data 
                    ?
                        
                        data.categories.map(item => {
                            if(item.name === chooseCategory){
                                return item.products.map((prod, key) => {
                                    return(
                                        <Link key={key} to="/product" onClick={() => chooseProduct(prod.id)}>
                                            <div className={`list__product in_stock--${prod.inStock}`}>
                                                <span className="link__noStock" href="!#">out of stock</span>
                                                <span className="link__inStock" href="!#" style={{backgroundImage:`url(${prod.gallery[0]})`}}/>
                                                <p className="product__title">{prod.name}</p>
                                                    {
                                                        prod.prices.map((price, key) => {
                                                            if(price.currency === chooseCurrency){
                                                                return(
                                                                <p key={key} className="product__price">
                                                                    {price.currency}
                                                                    &nbsp;
                                                                    {price.amount}
                                                                </p>
                                                            )}
                                                            else return null
                                                        })
                                                    }
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                            else return null
                        })
                    :
                    null
                }
            </div>
        </div>
    )
}