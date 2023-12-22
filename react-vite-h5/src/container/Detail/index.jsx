/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import { useEffect, useState, useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import qs from 'query-string' 
import dayjs from 'dayjs'
import cx from 'classnames'
import Header from "../../components/Header"
import CustomIcon from '@/components/CustomIcon'
import { get, typeMap, post} from '@/utils'
import { Modal, Toast } from 'zarm';
import PopupAddBill from '@/components/PopAddBill'
import s from './style.module.less'

const Detail= () =>{
    const location = useLocation()
    const { id } = qs.parse(location.search)
    const [detail, setDetail] = useState({})
    const navigateTo = useNavigate()
    const editRef = useRef()

    useEffect(()=>{
        getDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getDetail = async ()=>{
        const { data } = await get(`/bill/detail?id=${id}`)
        setDetail(data)
    }

    const deleteDetail = () => {
        Modal.confirm({
            title: '删除',
            content: '确认删除?',
            onOk: async()=>{
                const {data} = await post('/bill/delete', {id})
                Toast.show('删除成功')
                navigateTo(-1)
            },
        });
    }
    return (
        <div className={s.detail}>
            <Header title='账单详情' />
            <div className={s.card}>
                <div className={s.type}>
                    <span className={cx({[s.expense]: detail.pay_type == 1, [s.income]: detail.pay_type == 2})}>
                        <CustomIcon className={s.iconfont} type={detail.type_id ? typeMap[detail.type_id].icon : 1}/>
                    </span>
                    <span>{detail.type_name || ''}</span>
                </div>
                {
                    detail.pay_type == 1 
                        ? <div className={cx(s.amount, s.expense)}>-{ detail.amount }</div>   
                        : <div className={cx(s.amount, s.income)}>+{ detail.amount }</div>   

                }
                <div className={s.info}>
                    <div className={s.time}>
                        <span>记录时间</span>
                        <span>{dayjs(Number(detail.date)).format('YYYY-MM-DD HH:mm')}</span>
                    </div>
                    <div className={s.remark}>
                        <span>备注</span>
                        <span>{ detail.remark || '-'} </span>
                    </div>    
                </div>       
                <div className={s.operation}>
                    <span onClick={deleteDetail}><CustomIcon type='shanchu' /></span>
                    <span onClick={() => editRef.current && editRef.current.show()}><CustomIcon type='tianjia' /></span>
                </div>
            </div>
            <PopupAddBill ref={editRef} detail={detail} /> 
        </div>
    )
}

export default Detail;
