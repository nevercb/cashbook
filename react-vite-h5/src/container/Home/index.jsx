/* eslint-disable no-unused-vars */
import {Icon, Pull} from 'zarm'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import BillItem from '@/components/BillItem'
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils'

import s from './style.module.less'
const Home = () => {
    const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM'))
    const [page, setPage] = useState(1)
    const [list, setList] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal)
    const [loading, setLoading] = useState(LOAD_STATE.normal)

    useEffect(()=>{
        getBillList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getBillList = async () => {
        const { data } = await get(`/bill/list?page=${page}&page_size=1&date=${currentTime}`);
        if(page === 1){
            setList(data.list);
        } else {
            setList(list.concat(data.list));
        }
        setTotalPage(data.totalPage)
        setLoading(LOAD_STATE.success)
        setRefreshing(REFRESH_STATE.success)
    }

    const refreshData = ()=>{
        setRefreshing(REFRESH_STATE.loading)
        if(page != 1){
            setPage(1)
        } else {
            getBillList()
        }
    }

    const loadData = ()=>{
        console.log(1)
        if (page < totalPage) {
            setLoading(LOAD_STATE.loading)
            setPage(page + 1)
            getBillList()
        }
    }
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
                    list.length ? <Pull
                        animationDuration={200}
                        stayTime={400}
                        refresh={{
                            state: refreshing,
                            handler: refreshData
                        }}
                        load={{
                            state: loading,
                            distance: 200,
                            handler: loadData
                        }}
                    >
                        {
                            list.map((item, index) => <BillItem bill={item} key={index} />)
                        }
                    </Pull>: null
                }
        </div>
    </div>
}
export default Home;