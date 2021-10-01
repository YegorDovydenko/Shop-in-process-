import {
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider,
} from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Categories, prodID } from './pages/Categories';
import { Product } from './pages/Product';
import { Header } from "./components/Header"
import { useState } from "react";

export default function App() {

  const [chooseCategory, setChooseCategory] = useState('')
    const [chooseCurrency, setChooseCurrency] = useState('USD')
  
    const setCategory = (item) => {
        setChooseCategory(item)
    }

    const giveCurrency = (item) => {
        setChooseCurrency(item)
    }

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/"
  })

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Header setCategory={setCategory} giveCurrency={giveCurrency}/>
          <Switch>
            <Route exact path='/'>
              <Categories chooseCategory={chooseCategory} chooseCurrency={chooseCurrency} />
            </Route>
            <Route path="/product/">
              <Product prodID={prodID} chooseCurrency={chooseCurrency} />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  )
}

