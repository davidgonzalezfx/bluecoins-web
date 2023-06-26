// @ts-nocheck
import { useContext } from 'react'

import { formatCurrency } from '../../utils/formatters'
import { DatabaseContext } from '../../context'

const TransactionsList = () => {
  const { state } = useContext(DatabaseContext)
  const { transactions } = state

  const groupedTransactions = transactions?.reduce((result, transaction) => {
    const date = transaction.date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric'
    })

    if (!result[formattedDate]) {
      result[formattedDate] = []
    }

    result[formattedDate].push(transaction)
    return result
  }, {})

  const groupedTransactionsList = Object.entries(groupedTransactions || {}).map(
    ([date, transactions]) => ({
      date,
      transactions
    })
  )

  return (
    <div className='w-2/4'>
      {groupedTransactionsList.map(({ date, transactions }) => (
        <>
          <div
            key={date}
            className='flex h-8 items-center rounded-full bg-gray-100 px-4 py-4 text-sm dark:bg-[#757575] dark:text-black'
          >
            <div className='w-1/2'>
              <p className='font-semibold'>{date}</p>
            </div>
            <div className='w-1/2 text-right'>
              <p className='font-semibold'>
                Total:{' '}
                {formatCurrency(
                  transactions.reduce((total, transaction) => total + transaction.amount, 0)
                )}
              </p>
            </div>
          </div>
          <div className='px-4 py-2'>
            {transactions.map((transaction) => (
              <div key={transaction.transactionsTableID} className='flex justify-between py-2'>
                <div className='flex items-center gap-2'>
                  {/* Replace with appropriate transaction icon */}
                  <div
                    className={`h-6 w-6 rounded-full  ${
                      transaction.amount > 0 ? 'bg-green-600' : 'bg-red-400'
                    } `}
                  ></div>
                  <div>
                    <p>{transaction.itemName}</p>
                    <p className='text-xs text-gray-500'>{transaction.childCategoryName}</p>
                  </div>
                </div>
                <div className='flex flex-col items-end font-medium	'>
                  <p className={`${transaction.amount > 0 ? 'text-green-700' : 'text-red-600'}`}>
                    {formatCurrency(transaction.amount)}
                  </p>
                  {/* Replace with appropriate account and balance */}
                  <p className='ml-2 text-xs text-gray-500'>{transaction.accountName}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  )
}

export default TransactionsList
