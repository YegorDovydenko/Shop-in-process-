import { useQuery} from "@apollo/client"
import { useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { CHOOSE_PRODUCT } from "../graphql/Queries"
import { prodID } from "./Categories";


export const Product = ({chooseCurrency}) => {

    const {data} = useQuery(CHOOSE_PRODUCT, {
        variables: {id: prodID}
    })


    const history = useHistory();
    const {id} = useParams();
    const location = useLocation();
    location.pathname = `/product/${prodID}`
    console.log(history);
    console.log(id);
    console.log(location);


    const [chooseImg, setChooseImg] = useState({})

    const selectImg = (item) => {
        setChooseImg(item)
    }

    return(
        <>
            {data
                ? 
                    <div className="product">
                        <div className="product__gallery">
                            <div className="product__gallery--all">
                                {
                                    data.product.gallery.map((item, key) => {
                                        return(
                                            <img key={key} src={item} alt="prodImg" onClick={() => selectImg(item)}/>
                                        )
                                    })
                                }
                            </div>
                            <div className="product__gallery--main">
                                <img src={chooseImg.length > 0 ? chooseImg : data.product.gallery[0]} alt="prodMain" />
                            </div>  
                        </div>
                        <div className="product__info">

                            <h1>{data.product.name}</h1>
                            
                            {
                                data.product.attributes
                                ?
                                data.product.attributes.map((item, key) => {
                                    return(
                                        <div className="product__attributes" key={key}>
                                            <p>{item.name}:</p>
                                            {
                                                item.name !== "Color" 
                                                ?
                                                <div className="product__attributes--variables">
                                                    {
                                                        item.items.map((item, key) => {
                                                            return(
                                                                <div key={key}>
                                                                    <p>{item.value}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                :
                                                <div className="product__attributes--variables">
                                                    {
                                                        item.items.map((item, key) => {
                                                            return(
                                                                <div 
                                                                    key={key} 
                                                                    className="color__variable"
                                                                    style={{backgroundColor:`${item.value}`}}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                                :
                                null
                            }
                            <div className="product__price">
                                <p>Price:</p>
                                {
                                    data.product.prices.map((price, key) => {
                                        if(price.currency === chooseCurrency){
                                            return(
                                            <h2 key={key} className="product__price">
                                                {price.currency}
                                                &nbsp;
                                                {price.amount}
                                            </h2>
                                        )}
                                        else return null
                                    })
                                }
                                {/* <h2>{data.product.prices[0].currency} {data.product.prices[0].amount}</h2> */}
                            </div>
                            <button className="addCart_button">Add to cart</button>

                            <div className="product__description">{data.product.description}</div>
                        </div>
                    </div>  
                : 
                null
            }
        </>
    )
}