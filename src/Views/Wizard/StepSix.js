import React, { Component } from 'react'
import {connect} from 'react-redux'

 class StepSix extends Component {
  render() {
    return (
      <div>
        <h1>Poll Created!</h1>
        <div>
        <h2>Send This Link:</h2>
        <a href={this.props.url}>{this.props.url}</a>
        </div>
        <div>
          <h2>Or this Code:</h2>
          {this.props.code}
        </div>
      </div>
    )
  }
}
export default connect(state=>state)(StepSix)