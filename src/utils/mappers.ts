export const TransactionsMap = (transactions: any) => {
  return transactions[0].values.map((item: any) => {
    return item.reduce((obj: any, value: any, index: any) => {
      const columnName = transactions[0].columns[index]
      obj[columnName] = value
      return obj
    }, {})
  })
}

export const ItemsMap = (items: any) => {
  return items[0].values.map((item: any) => ({
    itemTableID: item[0],
    itemName: item[1],
    itemAutoFillVisibility: item[2]
  }))
}

export const CategoriesMap = (categories: any) => {}

export const AccountsMap = (accounts: any) => {
  return accounts[0].values.map((item: any) => ({
    accountsTableID: item[0],
    accountName: item[1],
    accountTypeID: item[2],
    accountHidden: item[3],
    accountCurrency: item[4],
    accountConversionRateNew: item[5],
    currencyChanged: item[6],
    creditLimit: item[7],
    cutOffDa: item[8],
    creditCardDueDate: item[9],
    cashBasedAccounts: item[10],
    accountSelectorVisibility: item[11],
    accountsExtraColumnString1: item[12],
    accountsExtraColumnString2: item[13],
    accountsExtraColumnInt1: item[14],
    accountsExtraColumnInt2: item[15]
  }))
}
