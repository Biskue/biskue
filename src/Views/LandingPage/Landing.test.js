import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import React from 'react';
import  Landing from './Landing';
Enzyme.configure({ adapter: new Adapter() });


const wrapper = shallow(<Landing />);

describe('<Landing />', () => {
    wrapper.setState = jest.fn( wrapper.setState )
    
  describe('openModal',()=>{
    afterEach(()=>{
    
      wrapper.setState({showFavorites: false})
     
    })
  it('update "state.showFavorites" to typed true', ()=>{
    wrapper.instance().openModal()
    expect(wrapper.state().showFavorites).toEqual(true)
  })

  })
  });