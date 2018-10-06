import React from 'react'

export default (props) => {
  const categories = props.currentRes.categories.map(cat=> cat.title)
  const categoriesJoined = categories.join(', ')
    return (
    <div>
      <img className ='restaurant-image'src={props.currentRes.image_url} alt="yelp image"/>
      <div>
          <h4>{props.currentRes.name}</h4>
          <p>{categoriesJoined}</p>

          <p>
            {props.currentRes.display_phone} <br/>  
            {props.currentRes.location.address1 + ' '+ props.currentRes.location.address2 + ' ' +props.currentRes.location.address3} <br/>
            {props.currentRes.location.city + ', ' + props.currentRes.location.state + ' ' + props.currentRes.location.zip_code}
          </p>
          <button onClick={()=>props.addRestaurant(props.currentRes)}>Add to Poll</button>
      </div>
    </div>
  )
}
