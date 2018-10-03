import React, { Component } from 'react'
import {connect} from 'react-redux'

 class StepOne extends Component {
  constructor(props){
    super(props)
    this.state = {
      location: '',
      distance: 10,
      priceRange: [],
      latitude: null,
      longitude: null,
    }
  }
  handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
  }
  
  getLocation= () => { console.log('checking location')
   window.navigator.geolocation.getCurrentPosition((position) => {
     console.log(position)

  this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
});}


handlePriceChange(e){
  const priceRange = this.state.priceRange
if(priceRange.includes(e.target.value)){
  
}
}
  render() {
   
    return (
      <div>
       <input type="text" placeholder= 'Enter City and State or Zip' />
       <button onClick= {(e)=> this.getLocation}>Use Current Location</button>
       <div>
       <b>Distance:</b>
       <input type="range" min={5} max ={25} value={this.state.distance} step={5} onChange={(e)=> this.handleChange(e, 'distance')} /> {this.state.distance + " Miles"}
       </div>
       <div>
         <b>Price Range</b>
          $10 Or less <input type="checkbox" value = {1} onChange={this.handleChange}/>
          $11-$30 <input type="checkbox" value = {2}/>
          $31-$60 <input type="checkbox" value ={3}/>
          $61+ <input type="checkbox" value= {4}/>
       </div>
      </div>
    )
  }
}
export default connect(state => state)(StepOne)