/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';
import { Cell, Input, Button, Checkbox} from 'zarm';
import CustomIcon from '@/components/CustomIcon';
import s from './style.module.less'
import Captcha from 'react-captcha-code'
import { post } from '@/utils'
import cx from 'classnames'

const login = () => {
    // 判断是注册还是登陆状态
    const [type, setType] = useState('login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [verify, setVerify] = useState('')
    const [captcha, setCaptcha] = useState('')
    const handleChange = useCallback((captcha) => {
        console.log('captcha', captcha)
        setCaptcha(captcha)
    }, [])
    const onSubmit = async () => {
        if(!username) {
            alert("请输入账号")
            return
        }
        if(!password){
            alert("请输入密码")
            return
        }
        try {
            if (type === 'login'){
                const { data } = await post('user/login', {
                    username,
                    password
                });
                alert(data.msg)
                localStorage.setItem('token', data.data.token)
            }else {
                if (!verify){
                    alert('请输入验证码')
                    return 
                }
                if(verify !== captcha){
                    alert('验证码错误')
                    return
                }
                if(password.length < 6){
                    alert('密码长度必须大于6')
                    return
                }
                if(password !== password2){
                    alert('两次密码输入不一致')
                    return
                }
                const { data } = await post('/user/register', {
                    username,
                    password
                })
                alert(data.msg)
                setType('login')
            }
        } catch (err) {
            alert('请求错误')
        }
    }
    return <div className={s.auth}>
        <div className={s.head}>
            <div className={s.tab}>
                <span className={cx({[s.active]: type === 'login'})}
                 onClick={() => setType('login')}>登录</span>

                <span className={cx({[s.active]: type === 'register'})}
                 onClick={() => setType('register')}>注册</span>
                <span></span>
            </div>
        </div>
        <div className={s.form}>
            <Cell icon={<CustomIcon type="zhanghao" />}>
                <Input 
                    clearable
                    type="text"
                    placeholder='请输入账号'
                    onChange={(value)=>setUsername(value)}
                />
            </Cell>
            <Cell icon={<CustomIcon type="mima" />}>
                <Input 
                    clearable
                    type="password"
                    placeholder='请输入密码'
                    onChange={(value)=>setPassword(value)}
                />
            </Cell> 
            { type === 'register' ?
            <Cell icon={<CustomIcon type="mima" />}>
                <Input 
                    clearable
                    type="text"
                    placeholder='请再次输入密码'
                    onChange={(value) => setPassword2(value)}
                />
            </Cell> : null
            }
            { type === 'register' ?
            <Cell icon={<CustomIcon type="mima" />}>
                <Input 
                    clearable
                    type="text"
                    placeholder='请输入验证码'
                    onChange={(value) => setVerify(value)}
                />
                <Captcha charNum={4} onChange={handleChange}/>
            </Cell> : null
            }

        </div>
        <div className={s.operation}>
            { type==='register' ? (
            <div className={s.agree}>
                <Checkbox />
                <label className="text-light">
                    阅读并同意<a>《条款》</a>
                </label>
            </div>) : null
            }
            <Button onClick={onSubmit} block theme="primary">
                {type === 'login' ? '登录':'注册'}
            </Button>
        </div>
    </div>
}

export default login