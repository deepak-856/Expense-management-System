import React,{useState,useEffect} from 'react'
import {Form, Input, message, Modal, Select, Table,DatePicker} from 'antd'
import {UnorderedListOutlined, AreaChartOutlined} from '@ant-design/icons'
import Layout from '../components/Layout/Layout'
import moment from 'moment'
import axios from 'axios'
import Spinner from '../components/Spinner'
import Analytics from '../components/Analytics'
const {RangePicker} = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allTransection, setAllTransection] = useState([]);
  const [frequency,setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([])
  const [type,setType] = useState('all')
  const[viewData, setViewData] = useState('table')

  //table data
  const columns  =[
    {
      title:'Date',
      dataIndex:'date',
      render: (text)=><span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title:'Amount',
      dataIndex:'amount'
    },
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Category',
      dataIndex:'category'
    },
    {
      title:'Reference',
      dataIndex:'reference'
    },
    {
      title:'Actions'
    }
  ]

  //get all transactions
 
  //useeffect work
  useEffect(()=>{
    const getAllTransection = async()=>{
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true);
        const res = await axios.post('/transections/get-transection',{userid:user._id, frequency,selectedDate,type})
        setLoading(false);
        setAllTransection(res.data);
        console.log(res.data)
      } catch (error) {
        console.log(error)
        message.error('Fetch issue with transection')
      }
    }
    getAllTransection()
  },[frequency,selectedDate,type])

  //form handling
  const handleSubmit = async(value)=>{
    try {
    const user= JSON.parse(localStorage.getItem('user'))
    setLoading(true);
    await axios.post('/transections/add-transection',{...value, userid:user._id})
    setLoading(false)
    message.success("Transaction done successfully")
    setShowModal(false)
    } catch (error) {
      setLoading(false)
      message.error("Failed to add transaction")
    }
  }
  return (
    <Layout>
      {loading && <Spinner/>}
      <div className='filters'>
        <div>
          <h6>Select frequency</h6>
          <Select value={frequency} onChange={(value) =>setFrequency(value)}>
            <Select.Option value='7'>LAST 1 week</Select.Option>
            <Select.Option value='30'>LAST 1 month</Select.Option>
            <Select.Option value='365'>LAST 1 year</Select.Option>
            <Select.Option value='custom'>custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(value)=> setSelectedDate(value)}/>}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) =>setType(value)}>
            <Select.Option value='all'>All</Select.Option>
            <Select.Option value='income'>Income</Select.Option>
            <Select.Option value='expense'>Expense</Select.Option>
          </Select>
        </div>
        <div className='switch-icon mx-2 '>
          <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={ ()=>setViewData('table')}/>
          <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={()=>setViewData('analytics')}/>
        </div>
        <div>
          <button className='btn btn-primary' onClick={() =>setShowModal(true)}>Add New</button>
        </div>
      </div>

      <div className='content'>
        {viewData ==='table' ?<Table columns={columns} dataSource={allTransection}/> 
        : <Analytics allTransection = {allTransection}/>
        }
        
      </div>
      <Modal title="Add description" open={showModal} onCancel={()=>setShowModal(false)} footer={false}>
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item label='Amount' name='amount'>
            <Input type="text"></Input>
          </Form.Item>
          <Form.Item label='type' name='type'>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Category' name='category'>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="bills">Bill</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Date' name='date'>
            <Input type='date'></Input>
          </Form.Item>
          <Form.Item label='Reference' name='reference'>
            <Input type='text'></Input>
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input type='text'></Input>
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <button type='submit' className='btn btn-primary'>{" "} Save</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage