import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Cell } from 'zarm'
import { useNavigate } from 'react-router-dom'
import CustomIcon from '../CustomIcon'
import { typeMap } from '@/utils'

import s from './style.module.less'

const BillItem = ({ bill }) => {
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    const navigateTo = useNavigate();

    useEffect(()=>{
        const _income = bill.bills.filter(i => i.pay_type == 2)
        .reduce((curr, item)=>{
            curr += Number(item.amount);
            return curr;
        }, 0)
        setIncome(_income)
        const _expense = bill.bills.filter(i => i.pay_type == 1)
        .reduce((curr, item) => {
            curr += Number(item.amount);
            return curr;
        }, 0)

        setExpense(_expense)
    }, [bill.bills])

    const goToDetail = (item) => {
        navigateTo(`/detail?id=${item.id}`)
    }
    
    
    return <div className={s.item}>
        <div className={s.headerDate}>
            <span className={s.date}>{bill.date}</span>
            <span className={s.money}>
                <span>
                    <span>支出</span>
                    <span>{expense.toFixed(2)}</span>
                </span>
                <span>
                    <span>收入</span>
                    <span>{income.toFixed(2)}</span>
                </span>
            </span>
        </div>
        {
            bill && bill.bills.map(item => <Cell
                className={s.bill}
                key={item.id}
                onClick={() => goToDetail(item)}
                title={
                    <>
                        <CustomIcon 
                            className={s.itemIcon}
                            type={item.type_id ? typeMap[item.type_id].icon : 1}
                        />
                        <span>
                            {item.type_name}
                        </span>
                    </>
                }
                description={<span style={{color: item.pay_type == 2 ? 'red' : '#39be77'}}>
                    {`${item.pay_type === 1 ? '-': '+'}${item.amount}`}
                </span>}
                help={<div>{dayjs(Number(item.date)).format('HH:mm')}{item.remark ? `|${item.remark}`: ''}</div>}
            >
            </Cell>)
        }
    </div>
}

BillItem.propTypes = {
    bill: PropTypes.object
}

export default BillItem