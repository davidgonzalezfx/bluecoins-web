export const CREATE_TRANSACTION_TABLE = `
  CREATE TABLE TRANSACTIONSTABLE(
    transactionsTableID INTEGER PRIMARY KEY, 
    itemID INTEGER, 
    amount INTEGER, 
    transactionCurrency VARCHAR(5), 
    conversionRateNew REAL, 
    date DATETIME DEFAULT CURRENT_TIMESTAMP, 
    transactionTypeID INTEGER, 
    categoryID INTEGER, 
    accountID INTEGER, 
    notes VARCHAR(255), 
    status INTEGER, 
    accountReference INTEGER, 
    accountPairID INTEGER, 
    uidPairID INTEGER, 
    deletedTransaction INTEGER,
    newSplitTransactionID INTEGER, 
    transferGroupID INTEGER, 
    reminderTransaction INTEGER, 
    reminderGroupID INTEGER, 
    reminderFrequency INTEGER, 
    reminderRepeatEvery INTEGER, 
    reminderEndingType INTEGER, 
    reminderStartDate DATETIME, 
    reminderEndDate DATETIME, 
    reminderAfterNoOfOccurences INTEGER, 
    reminderAutomaticLogTransaction INTEGER, 
    reminderRepeatByDayOfMonth INTEGER, 
    reminderExcludeWeekend INTEGER, 
    reminderWeekDayMoveSetting INTEGER, 
    reminderUnbilled INTEGER, 
    creditCardInstallment INTEGER, 
    reminderVersion INTEGER, 
    dataExtraColumnString1 VARCHAR(255)
  )`

export const BUILD_TRANSACTION_TABLE = `
  INSERT INTO TRANSACTIONSTABLE
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

export const CREATE_ITEM_TABLE = `
  CREATE TABLE ITEMTABLE (
    itemTableID INTEGER PRIMARY KEY AUTOINCREMENT,
    itemName VARCHAR(63), 
    itemAutoFillVisibility INTEGER
    )
  `

export const BUILD_ITEM_TABLE = `INSERT INTO ITEMTABLE VALUES (?, ?, ?)`

export const GET_TRANSACTIONS = `
  SELECT *
  FROM TRANSACTIONSTABLE t
  JOIN ITEMTABLE i ON t.itemId = i.itemTableID
  JOIN ACCOUNTSTABLE a ON t.accountID = a.accountsTableID
  JOIN CHILDCATEGORYTABLE c ON t.categoryID = c.categoryTableID
  WHERE t.date BETWEEN '2023-01-01' AND '2023-06-30'
  ORDER BY t.date DESC;`

export const GET_ITEMS = `SELECT * FROM ITEMTABLE`

export const ADD_TRANSACTION = `
  INSERT INTO TRANSACTIONSTABLE ( itemID, date, amount, transactionCurrency, conversionRateNew, transactionTypeID, categoryID, accountID, notes, status, accountReference, accountPairID, uidPairID, deletedTransaction, newSplitTransactionID, transferGroupID ) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
