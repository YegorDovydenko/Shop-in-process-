import { useQuery} from "@apollo/client"
import {GET_NAV_LINKS} from "../graphql/Queries"

export const Nav = ({setCategory}) => {
    const {data} = useQuery(GET_NAV_LINKS)
    const navLinks = []

    if(data){
        data.category.products.map(item => (
            navLinks.push(item.category)
        ))
    }
    
    return(
        <nav>
            { 
            [...new Set(navLinks)].map((item, key) => {
                return(
                    <button key={key} onClick={() => {setCategory(item)}}>
                        {item.toUpperCase()}
                    </button>
                )
            })
            }
        </nav>
    )
}