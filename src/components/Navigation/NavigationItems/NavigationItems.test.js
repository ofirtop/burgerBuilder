import React from 'react';
import {configure,shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()})


describe('<NavigationItems/>',()=>{
    let wrapper ;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems/>);
    })

    it('render two Navigation Item elements when authentication is false',()=>{        
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('render three Navigation Item elements when authentication is TRUE',()=>{        
        wrapper.setProps({isAuth:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('render the logout Navigation element when authentication is TRUE',()=>{        
        wrapper.setProps({isAuth:true})
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
})