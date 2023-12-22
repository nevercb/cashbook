// import React from 'react';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { NavBar, Icon } from 'zarm'

import s from './style.module.less'

const Header = ({ title = '' }) => {
    const navigateTo = useNavigate()
    return (
        <div className={s.headerWrap}>
            <div className={s.block}>
                <NavBar 
                    className={s.header}
                    left={<Icon type="arrow-left" theme="primary"
                onClick={()=>navigateTo(-1)} />}
                    title={title}
                />
            </div>
        </div>
    );
};

Header.proptypes = {
    title: PropTypes.string,
}
export default Header
