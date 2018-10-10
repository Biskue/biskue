import React, { Component } from 'react'
import upVote from '../../upVote.png'
import downVote from '../../downVote.png'

export default class RestaurantCard extends Component {
  render() {
    const categories = props.currentRes.categories.map(cat=> cat.title)
    const categoriesJoined = categories.join(', ')
    return (
      <div>
      <img className ='restaurant-image'src={props.currentRes.image_url} alt="yelp image"/>
      <div>
          <h4>{props.currentRes.name}</h4>
          <p>{categoriesJoined}</p>
          <p>Price: {props.currentRes.price}</p>
          <p>
            {props.currentRes.display_phone} <br/>
            {props.currentRes.location.address1 + ' '+ props.currentRes.location.address2 + ' ' +props.currentRes.location.address3} <br/>
            {props.currentRes.location.city + ', ' + props.currentRes.location.state + ' ' + props.currentRes.location.zip_code}
          </p>
          <img src={upVote} alt="up vote" style='height: 50px; width: 50px'/>
          <img src={downVote} alt="down vote" style='height: 50px; width: 50px'/>
      </div>
    </div>
    )
  }
}
