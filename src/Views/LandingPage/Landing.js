import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './Landing.css';
import EditFavorites from '../UserInfo/EditFavorites'
import biskue_top from '../../../src/biskue_top.png';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

export default class Landing extends Component {
  constructor(props){
    super(props)
    this.state = {
      showFavorites: false,
      joinPoll: false,
      pollCode: ''
    }
  }
  closeModal(){
    this.setState({showFavorites: false})
  }
  openModal(){
    this.setState({showFavorites: true})
  }
  joinPoll(){
    if(this.state.joinPoll){
      return this.setState({joinPoll: false})
    }
    this.setState({joinPoll: true})
  }
  handleChange(string){
    this.setState({pollCode: string})
  }
  render() {
    return (
      
      <div className="landing">
        <div className='biskue-logo'>
          <img src={biskue_top} alt="biskue logo" className='biskue-top'/>
        </div>
        <div className='poll-buttons'>
          <div>
            <Link to='/wizard/step-1'>
              <button className='create-poll'>Start Poll</button>
            </Link>
              <button onClick={()=> this.openModal()} className='create-poll'>Select poll from favorites</button>
            <button className='create-poll' onClick={()=> this.joinPoll()}>Join Poll</button>
          </div>
          <Modal
					isOpen={this.state.showFavorites}
					onRequestClose={() => this.closeModal()}
					contentLabel="Import Modal"
					style={customStyles}
				>
					<EditFavorites history = {this.props.history}/>
          <button onClick={()=>this.closeModal()}>Cancel</button>
				</Modal>
        <Modal
					isOpen={this.state.joinPoll}
					onRequestClose={() => this.joinPoll()}
					contentLabel="Import Modal"
					style={customStyles}
				>
        <input placeholder= 'Enter Poll Code' value={this.state.pollCode} onChange={(e)=> this.handleChange(e.target.value)}/>
					<button onClick={()=>this.props.history.push('/poll/'+this.state.pollCode)}>Join</button>
          <button onClick={()=>this.joinPoll()}>Cancel</button>
				</Modal>
          <div>
          </div>
        </div>
      </div>
    );
  }
}