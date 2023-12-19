import {Icon, Pull} from 'zarm'
import { useState } from 'react'
import dayjs from 'dayjs'
import BillItem from '@/components/BillItem'
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils'

import s from './style.module.less'
const Home = () => {
    const [list, setList] = useState([{
        bills: [
            {
                amount: "25.00",
                date: "1702966935805",
                id: 911,
                pay_type: 1,
                remark: "",
                type_id: 1,
                type_name: "餐饮"
            }
        ],
        date: "2023-12-19"
    }])

    return <div className={s.home}>
        <div className={s.header}>
            <div className={s.dataWrap}>
                <span className={s.expense}>总支出:<b>200</b></span>
                <span className={s.income}>总收入: <b>500</b></span>
            </div>
            <div className={s.typeWrap}>
                <div className={s.left}>
                    <span className={s.title}>
                        类型<Icon className={s.arrow} type="arrow-bottom" />
                    </span>
                </div>
                <div className={s.right}>
                    <span className={s.time}>
                        2023-12<Icon className={s.arrow} type="arrow-bottom" />
                    </span>
                </div>
            </div>
        </div>

        <div className={s.contentMap}>
                {
                    list.map((item, index) => <BillItem bill={item} key={index} />)
                }
        </div>
    </div>
}
export default Home;