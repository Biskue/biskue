import React, { Component } from 'react'
import upVote from '../../upVote.png'
import downVote from '../../downVote.png'

export default class RestaurantCard extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const categories = this.props.currentRes.categories.map(cat=> cat.title)
    const categoriesJoined = categories.join(', ')
    return (
      <div>
      <img className ='restaurant-image'src={this.props.currentRes.image_url} alt="yelp image"/>
      <div>
          <h4>{this.props.currentRes.name}</h4>
          <p>{categoriesJoined}</p>
          <p>Price: {this.props.currentRes.price}</p>
          <p>
            {this.props.currentRes.display_phone} <br/>
            {this.props.currentRes.location.address1 + ' '+ this.props.currentRes.location.address2 + ' ' +this.props.currentRes.location.address3} <br/>
            {this.props.currentRes.location.city + ', ' + this.props.currentRes.location.state + ' ' + this.props.currentRes.location.zip_code}
          </p>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img src={upVote} alt="up vote" style={{height: '50px', width: '50px'}}/>
          <img src={downVote} alt="down vote" style={{height: '50px', width: '50px'}}/>
          </div>
      </div>
    </div>
    )
  }
}
