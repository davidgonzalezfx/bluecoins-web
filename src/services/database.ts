import { Database, SqlJsStatic } from 'sql.js'
import {
  ADD_TRANSACTION,
  BUILD_ITEM_TABLE,
  BUILD_TRANSACTION_TABLE,
  CREATE_ITEM_TABLE,
  CREATE_TRANSACTION_TABLE,
  GET_ITEMS,
  GET_TRANSACTIONS
} from '../sql'

export const getTransactions = (db: Database) => {
  localStorage.removeItem('transactions')

  const transactions = db.exec(GET_TRANSACTIONS)

  localStorage.setItem('transactions', JSON.stringify(transactions))

  return transactions
}

export const getItems = (db: Database) => {
  localStorage.removeItem('items')
  const items = db.exec(GET_ITEMS)

  localStorage.setItem('items', JSON.stringify(items))
  return items
}

export const addTransaction = (db: Database) => {
  db.run(ADD_TRANSACTION, [
    49,
    '2023-06-30',
    100 * 100000,
    'USD',
    1,
    3,
    17,
    5,
    'SQL WEB',
    0,
    1,
    5,
    Math.random() * 10000,
    6,
    0,
    0
  ])
}

export const buildDatabase = (SQL: SqlJsStatic): Database => {
  const db = new SQL.Database()

  db.run(CREATE_TRANSACTION_TABLE)
  db.run(CREATE_ITEM_TABLE)

  const transactions = JSON.parse(localStorage.getItem('transactions'))

  const values = transactions[0].values

  values.forEach((value: any) => {
    value.shift()
    value.splice(-3)

    db.run(BUILD_TRANSACTION_TABLE, value)
  })

  const items = JSON.parse(localStorage.getItem('items'))

  const itemValues = items[0].values

  itemValues.forEach((value: any) => {
    db.run(BUILD_ITEM_TABLE, value)
  })

  return db
}
