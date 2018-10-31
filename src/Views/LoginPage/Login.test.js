import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import React from 'react';
import { Login } from './Login';
Enzyme.configure({ adapter: new Adapter() });


const wrapper = shallow(<Login />);

describe('<Login />', () => {
    wrapper.setState = jest.fn( wrapper.setState )
    
    it('has username property set to "" initially', () => {
      const wrapper = shallow(<Login />);
      const originalSetState = wrapper.setState
      expect(wrapper.state().username).toEqual('');
    });
    it('has password property set to "" initially', () => {
        expect(wrapper.state().password).toEqual('');
      });
  describe('handleChange',()=>{
    afterEach(()=>{
    
      wrapper.setState({username: ''})
     
    })
  it('update "state.username" to typed value', ()=>{
    wrapper.instance().handleChange({target: {value: 'hello', name: 'username'}})
    expect(wrapper.state().username).toEqual("hello")
  })
  it('ran SetState Function', ()=>{
    wrapper.instance().handleChange({target: {value: 'hello', name: 'username'}})
    expect(wrapper.setState).toHaveBeenCalledWith({username: 'hello'})
  })
  })
  });