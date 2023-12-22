/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import {useState, useEffect, useRef, forwardRef} from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Popup, Icon, Keyboard, Input, Toast} from 'zarm'
import CustomIcon from '../CustomIcon'
import cx from 'classnames'
import dayjs from 'dayjs'
import PopupDate from '../PopupDate'
import {get, post, typeMap} from '@/utils'
import s from './style.module.less'
// eslint-disable-next-line react/prop-types
const PopupAddBill = forwardRef(({detail = {}, onReload}, ref)=>{
    const [show, setShow] = useState(false)
    const [payType, setPayType] = useState('expense')
    const [amount, setAmount] = useState('')
    const dateRef = useRef()
    const [date, setDate] = useState(new Date())
    const [currentType, setCurrentType] = useState({})
    const [expense, setExpense] = useState([])
    const [income, setIncome] = useState([])
    const [remark, setRemark] = useState('')
    const [showRemark, setShowRemark] = useState(false)
    const id = detail && detail.id;

    useEffect(() => {
        if (detail && detail.id) {
            setPayType(detail.pay_type == 1 ? 'expense': 'income')
            setCurrentType({
                id: detail.type_id,
                name: detail.type_name
            })
            setRemark(detail.remark)
            setAmount(detail.amount)
            setDate(dayjs(Number(detail.date)))
        }
    }, [detail])

    useEffect(() => {
        async function fn(){
            const {data} = await get('/type/list')
            const _expense = data.filter(i => i.type == 1)
            const _income = data.filter(i => i.type == 2)
            setExpense(_expense)
            setIncome(_income)
            if(!id)
                setCurrentType(_expense[0])
        }
        fn()
    },[])

    if (ref){
        ref.current = {
            show: () => { setShow(true) },
            close: () => { setShow(false) } 
        }
    }

    const changeType = (type) => {
        setPayType(type)
    }
    const selectDate = (val) => {
        setDate(val)
    }
    const handleMoney = (val) => {
        val = String(val)
        if(val == 'delete'){
            let _amount = amount.slice(0, amount.length - 1)
            setAmount(_amount)
            return
        }
        if(val == 'ok'){
            addBill()
            return
        }
        if(val == '.' && amount.includes('.')) return
        if(val != '.' && amount.includes('.') && amount && amount.split('.')[1].length >= 2) return
        setAmount(amount + val)
    }
    const addBill = async()=>{
        if(!amount){
            Toast.show("请输入具体金额")
            return
        }
        const params = {
            amount: Number(amount).toFixed(2),
            type_id: currentType.id,
            type_name: currentType.name,
            date: dayjs(date).unix() * 1000,
            pay_type: payType == 'expense' ? 1: 2,
            remark: remark || ' '
        }
        if(id) {
            params.id = id;
            await post('/bill/update', params)
            Toast.show('修改成功')
        } else {
            await post('/bill/add', params)
            setAmount('')
            setDate(new Date())
            setRemark('')
            Toast.show('添加成功')
        }
        setShow(false) 
        onReload()
    }
    return <Popup
        visible={show}
        direction='bottom'
        onMaskClick={()=>setShow(false)}
        destroy={false}
        mountContainer={()=>document.body}
    >
        <div className={s.addWrap}>
            {/*右上角关闭弹窗 */}
            <header className={s.header}>
                <span className={s.close} onClick={() => setShow(false)}>
                    <Icon type="wrong"></Icon>
                </span>
            </header>
            <div className={s.filter}>
                <div className={s.type}>
                    <span onClick={()=>changeType('expense')}
                    className={cx({[s.expense]: true, [s.active]: payType == 'expense'})}>支出</span>
                    <span onClick={()=>changeType('income')}
                   className={cx({[s.income]: true, [s.active]: payType == 'income'})}>收入</span>
                </div>
                <div className={s.time}
                    onClick={()=>dateRef.current && dateRef.current.show()}
                >
                    {dayjs(date).format('YYYY-MM')} <Icon className={s.arrow} type="arrow-bottom"></Icon>
                </div>
            </div>
            <PopupDate ref={dateRef} onSelect={selectDate}/>
            <div className={s.money}>
              <span className={s.sufix}>¥</span>
              <span className={cx(s.amount, s.animation)}>{amount}</span>
            </div>
            <div className={s.typeWrap}>
            <div className={s.typeBody}>
                {
                    (payType == 'expense' ? expense: income).map(
                        item => <div onClick={()=>setCurrentType(item)} key={item.id} className={s.typeItem}>
                            <span className={cx({[s.iconfontWrap]: true, [s.expense]: payType == 'expense', [s.income]: payType == 'income',
                        [s.active]: currentType.id == item.id})}>
                                <CustomIcon className={s.iconfont} type={typeMap[item.id].icon}/>
                            </span>
                            <span>{item.name}</span>
                        </div>
                    )
                }
            </div>
            </div>
            <div className={s.remark}>
                {
                    showRemark ? <Input 
                    rows={3}
                    value={remark}
                    placeholder='请输入备注'
                    onChange={(val)=>setRemark(val)}
                    onBlur={()=>setShowRemark(false)}
                    /> : <span onClick={()=>setShowRemark(true)}>
                        {remark || '添加备注'}
                    </span>
                }
            </div>
        </div>
        <Keyboard type="price" onKeyClick={(value)=>handleMoney(value)} />   
    </Popup>
})
export default PopupAddBill;