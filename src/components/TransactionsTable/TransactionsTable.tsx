// @ts-nocheck
const TransactionsList = ({
  transactions
}: {
  transactions: {
    columns: string[]
    values: (string | number)[][]
  }[]
}) => {
  const groupedTransactions = transactions[0].values.reduce((result, transaction) => {
    const [date] = transaction
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

  const groupedTransactionsList = Object.entries(groupedTransactions).map(
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
            className='flex h-8 items-center rounded-full bg-gray-100 px-4 py-4 text-sm'
          >
            <div className='w-1/2'>
              <p className='font-semibold'>{date}</p>
            </div>
            <div className='w-1/2 text-right'>
              <p className='font-semibold'>
                Total: {transactions.reduce((total, transaction) => total + transaction[1], 0)}
              </p>
            </div>
          </div>
          <div className='px-4 py-2'>
            {transactions.map((transaction) => (
              <div key={transaction[0]} className='flex justify-between py-2'>
                <div className='flex items-center gap-2'>
                  {/* Replace with appropriate transaction icon */}
                  <div className={`h-6 w-6 rounded-full  ${transaction[1] > 0 ? 'bg-green-600' : 'bg-red-400'} `}></div>
                  <div>
                    <p>{transaction[2]}</p>
                    <p className='text-xs text-gray-500'>Category</p>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <p>{transaction[1]}</p>
                  {/* Replace with appropriate account and balance */}
                  <p className='ml-2 text-xs text-gray-500'>Account - Balance</p>
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
