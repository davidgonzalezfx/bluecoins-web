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
import { ItemsMap, TransactionsMap } from 'utils/mappers'

export const getTransactions = (db: Database) => {
  localStorage.removeItem('transactions')

  const transactions = db.exec(GET_TRANSACTIONS)

  localStorage.setItem('transactions', JSON.stringify(transactions))

  return TransactionsMap(transactions)
}

export const getItems = (db: Database) => {
  localStorage.removeItem('items')
  const items = db.exec(GET_ITEMS)

  localStorage.setItem('items', JSON.stringify(items))
  return ItemsMap(items)
}

export const addTransaction = (db: Database, newTransaction: any) => {
  console.log(newTransaction)

  console.log('amount', newTransaction.amout * 100000)

  const itemID = db.exec(
    `SELECT itemTableId FROM ITEMTABLE WHERE itemName = "${newTransaction.itemName}"`
  )[0].values[0][0]

  const categoryID = db.exec(
    `SELECT categoryTableID FROM CHILDCATEGORYTABLE WHERE childCategoryName = "${newTransaction.category}"`
  )[0].values[0][0]

  const accountID = db.exec(
    `SELECT accountsTableID FROM ACCOUNTSTABLE WHERE accountName = "${newTransaction.account}"`
  )[0].values[0][0]

  db.run(ADD_TRANSACTION, [
    itemID,
    newTransaction.date ?? new Date().toISOString(),
    '-' + newTransaction.amount + '000000',
    'USD', // transactionCurrency
    1, // conversionRateNew
    3, // transactionTypeID
    categoryID,
    accountID,
    'Recorded from bluecoins web',
    0, // status
    1, // accountReference
    accountID, // accountPairID
    Math.random() * 10000, // uidPairID
    6, // deletedTransaction
    0, // newSplitTransactionID
    0 // transferGroupID
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
