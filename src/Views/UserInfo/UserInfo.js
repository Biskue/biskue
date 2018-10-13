import React, { Component } from 'react'
import EditFavorites from './EditFavorites'
import {Route} from 'react-router-dom'

export default class UserInfo extends Component {
  render() {
    return (
      <div>
        <Route component ={EditFavorites}/>
      </div>
    )
  }
}
