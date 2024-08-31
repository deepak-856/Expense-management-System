import React from 'react'
import { Progress } from 'antd'

const Analytics = ({allTransection }) => {
const categories = ['salary','tip','project','bills','food','medical','fee','movie']

    const totalTransaction = allTransection.length;
    const totalIncomeTransection = allTransection.filter(transaction => transaction.type === 'income')
    const totalExpenseTransection = allTransection.filter(transaction => transaction.type === 'expense')
    const totalIncomePercent = (totalIncomeTransection.length / totalTransaction) *100
    const totalExpensePercent = (totalExpenseTransection.length / totalTransaction) *100

    //total turnover
    const totalTurnover = allTransection.reduce((acc,transaction) => acc +transaction.amount,0);

    const totalIncomeTurnover = allTransection.filter(transaction => transaction.type ==='income'
    ).reduce((acc,transaction) => acc + transaction.amount, 0);

    const totalExpenseTurnover = allTransection.filter(transaction => transaction.type ==='expense'
    ).reduce((acc,transaction) => acc + transaction.amount,0);

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;
  return (
    <>
      <div className='row'>
        <div className='col-md-4'>
          <div className='card'>
            <div className='card-header'>
                Total Transactions : {totalTransaction}
            </div>
            <div className='card-body'>
                <h5 className='text-success'>Income  :{totalIncomeTransection.length}</h5>
                <h5 className='text-danger'>Expense  :{totalExpenseTransection.length}</h5>
                <div>
                  <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)}/>
                  <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpensePercent.toFixed(0)}/>
                </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card'>
            <div className='card-header'>
                Total Turnover : {totalTurnover}
            </div>
            <div className='card-body'>
                <h5 className='text-success'>Income  :{totalIncomeTurnover}</h5>
                <h5 className='text-danger'>Expense  :{totalExpenseTurnover}</h5>
                <div>
                  <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)}/>
                  <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpenseTurnoverPercent.toFixed(0)}/>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className='graph row mt-3'>
        <div className='col-md-4'>
          <h4>CategoryWise Income</h4>
          {categories.map(category =>{
            const amount = allTransection.filter(
              (transaction) =>transaction.type === 'income' && 
               transaction.category === category
              )
              .reduce((acc,transaction)=> acc + transaction.amount, 0)
              return(
                amount > 0 &&(
                <div className='card'>
                  <div className='card-body'>
                      <h5>{category}</h5>
                      <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}/>
                  </div>
                </div>
                )
              )
          })}
        </div>
        <div className='col-md-4'>
          <h4>CategoryWise Expense</h4>
          {categories.map(category =>{
            const amount = allTransection.filter(
              (transaction) =>transaction.type === 'expense' && 
               transaction.category === category
              )
              .reduce((acc,transaction)=> acc + transaction.amount, 0)
              return(
                amount > 0 &&(
                <div className='card'>
                  <div className='card-body'>
                      <h5>{category}</h5>
                      <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}/>
                  </div>
                </div>
                )
              )
          })}
        </div>
      </div>

       
    </>
  )
}

export default Analytics