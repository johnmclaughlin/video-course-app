import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Search from './Search'
import ReadingList from './ReadingList'
import Results from './Results'
import ResultList from './ResultList'
import Book from './Book'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Search}/>
      <Route path='/readinglist' component={ReadingList}/>
      {/* <Route path='/results' component={Results}/> */}
      <Route path="/results" render={(props) => (<ResultList test="hi" {...props}/>)} />
      {/* <Route path="/results" render={() => <div>RESULTS</div>}/> */}
    </Switch>
  </main>
)

export default Main
