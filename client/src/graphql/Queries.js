import {gql} from '@apollo/client';

export const GET_NAV_LINKS = gql`
    query{
        category{
            products{
                category
            }
        }   
    }
`

export const GET_PRODUCTS_INFO = gql`
    query{
        categories{
            name
            products{
                id
                inStock
                name
                gallery
                prices{
                    currency
                    amount
                }
            }
        }
    }
`

export const GET_CURRENCIES = gql`
    query{
        currencies
    }
`

export const CHOOSE_PRODUCT = gql`
    query getProduct($id: String!){
        product(id: $id){
            id
            name
            description
            gallery
            attributes{
                name
                items{
                  value
                }
            }
            prices{
                currency
                amount
            }
        }
    }
`


