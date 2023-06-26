import { useState, useEffect, useCallback, createContext } from 'react'
import initSqlJs, { Database, SqlJsStatic } from 'sql.js'
import { addTransaction, buildDatabase, getItems, getTransactions } from '../services/database'
import { formatDate } from '../utils/formatters'

type DatabaseContextType = {
  SQL: SqlJsStatic | null
  database: Database | null
  setDatabase: React.Dispatch<React.SetStateAction<Database | null>>
  createDatabase: (file: ArrayBufferLike) => Promise<void>
  exportDatabase: () => void
  state: {
    transactions: any[]
  }
  addNewTransaction: (newTransaction: any) => void
}

const DatabaseContext = createContext<DatabaseContextType>(null)

const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [database, setDatabase] = useState<Database | null>(null)
  const [SQL, setSQL] = useState<SqlJsStatic | null>(null)
  const [state, setState] = useState({ transactions: [] })

  const fetchAllData = useCallback((db: Database) => {
    const updatedTransactions = getTransactions(db)
    getItems(db)

    setState({ transactions: updatedTransactions })
  }, [])

  const init = useCallback(async () => {
    const sqlJs = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`
    })

    setSQL(sqlJs)

    if (window.location.pathname === '/' && database === null) {
      const db = buildDatabase(sqlJs)
      setDatabase(db)

      fetchAllData(db)
    }
  }, [database, fetchAllData])

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''

      return ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const createDatabaseFromFile = useCallback(
    async (file: ArrayBufferLike): Promise<void> => {
      if (!SQL) return Promise.reject(new Error('SQL.js not loaded'))

      const fileDatabase = new SQL.Database(new Uint8Array(file))

      if (fileDatabase) {
        setDatabase(fileDatabase)

        fetchAllData(fileDatabase)

        return Promise.resolve()
      } else {
        return Promise.reject(new Error('Database not created'))
      }
    },
    [SQL, fetchAllData]
  )

  const exportDatabase = useCallback(() => {
    const data = database.export()
    const buffer = new Blob([data], { type: 'application/octet-stream' })

    const db_name = `Bluecoins_${formatDate(new Date())}.fydb`.replace(' ', '_')

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(buffer)
    link.download = db_name
    link.click()
  }, [database])

  const addNewTransaction = useCallback(
    (newTransaction: any) => {
      addTransaction(database, newTransaction)
      fetchAllData(database)
    },
    [database, fetchAllData]
  )

  return (
    <DatabaseContext.Provider
      value={{
        SQL,
        database,
        setDatabase,
        createDatabase: createDatabaseFromFile,
        exportDatabase,
        state,
        addNewTransaction
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export { DatabaseContext, DatabaseProvider }
