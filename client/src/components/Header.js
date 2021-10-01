import { Nav } from "./Nav"
import logo from "../images/logo.svg"
import cart from "../images/cart.svg"
import { useQuery } from "@apollo/client"
import { GET_CURRENCIES } from "../graphql/Queries"
import { useState } from "react"
import { Link } from "react-router-dom"


export const Header = ({setCategory, giveCurrency}) => {

    const {data} = useQuery(GET_CURRENCIES)
    const [currency, setCurrency] = useState(data ? data.currencies[0] : 'USD')
    const [openCur, setOpenCur] = useState(false)

    const changeCurrency = (item) =>{
        setCurrency(item)
        giveCurrency(item)
        setOpenCur(false)
    }

    const openCurremcies = () => {
        setOpenCur(pv => !pv)
    }

    return(
        <header>
            <Nav setCategory={setCategory}/>
            <Link to="/"><img src={logo} alt="logo" /></Link>
            <div className="headerLastBlock">
                <div className="secSelect">
                    <p onClick={openCurremcies} className={`open--${openCur}`}>
                        {
                            data ? currency : null
                        }
                    </p>
                    <div className={`currencies__list hidden__currencies--${openCur}`}>
                        {
                            data ?
                            data.currencies.map((item, key) => {
                                return(
                                    <button 
                                        onClick={() => changeCurrency(item)}
                                        key={key}
                                    >
                                        {item}
                                    </button>
                                )
                            })
                            :
                            null
                        }
                    </div>
                </div>
                <a href="/cart"><img src={cart} alt="cart" /></a>
            </div>
        </header>
    )
}