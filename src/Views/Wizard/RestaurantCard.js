import React from 'react'

export default (props) => {
  const categories = props.currentRes.categories.map(cat=> cat.title)
  const categoriesJoined = categories.join(', ')
  const buttonTitle = props.delete? "Remove" : "Add to Poll"
  const clickHandler = props.delete? () => props.delete(props.currentIndex): ()=> props.addRestaurant(props.currentRes) 
  const showButton = !props.addRestaurant && !props.delete ? null : <button onClick={clickHandler}>{buttonTitle}</button>
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
          {showButton}
      </div>
    </div>
  )
}
