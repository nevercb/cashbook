/* eslint-disable no-unused-vars */
import {Icon, Pull} from 'zarm'
import { useState, useEffect, useRef } from 'react'
import CustomIcon from '@/components/CustomIcon'
import dayjs from 'dayjs'
import BillItem from '@/components/BillItem'
import PopupType from '@/components/PopupType'
import PopupDate from '@/components/PopupDate'
import PopupAddBill from '@/components/PopAddBill'
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils'
import s from './style.module.less'
const Home = () => {
    const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM'))
    const [currentSelect, setCurrentSelect] = useState({})
    const [page, setPage] = useState(1)
    const [list, setList] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal)
    const [loading, setLoading] = useState(LOAD_STATE.normal)
    const [totalExpense, setTotalExpense] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const typeRef = useRef()
    const monthRef = useRef()
    const addRef = useRef()
    useEffect(()=>{
        getBillList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, currentSelect, currentTime])

    const getBillList = async () => {
        const { data } = await get(`/bill/list?page=${page}&page_size=2&date=${currentTime}&type_id=${currentSelect.id || 'all'}`);
        if(page === 1){
            setList(data.list);
        } else {
            setList(list.concat(data.list));
        }
        setTotalExpense(data.totalExpense)
        setTotalIncome(data.totalIncome)
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
            // getBillList()  如果直接获取page, 则没有更改
        }
    }

    const toggle = () => {
        typeRef.current && typeRef.current.show()
    }
    const monthToggle = ()=>{
        monthRef.current && monthRef.current.show()
    }
    const select = (item) => {
        setRefreshing(REFRESH_STATE.loading)
        setPage(1)
        setCurrentSelect(item)
    }
    const selectMonth = (item) => {
        setRefreshing(REFRESH_STATE.loading)
        setPage(1)
        setCurrentTime(item)
    }
    
    const addToggle = () => {
        addRef.current && addRef.current.show()
    }

    
    return <div className={s.home}>
        <div className={s.header}>
            <div className={s.dataWrap}>
                <span className={s.expense}>totalExpense:<b>{totalExpense}</b></span>
                <span className={s.income}>totalIncome: <b>{totalIncome}</b></span>
            </div>
            <div className={s.typeWrap}>
                <div className={s.left} onClick={toggle}>
                    <span className={s.title}>
                        types<Icon className={s.arrow} type="arrow-bottom" />
                    </span>
                </div>
                <div className={s.right}>
                    <span className={s.time} onClick={monthToggle}>
                        {currentTime}<Icon className={s.arrow} type="arrow-bottom" />
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
        <PopupType ref={typeRef} onSelect={select} />
        <PopupDate ref={monthRef} onSelect={selectMonth} />
        <div className={s.add} onClick={addToggle} >
            <CustomIcon type='tianjia' />
        </div>
        <PopupAddBill ref={addRef} onReload={refreshData}/>
    </div>
}
export default Home;