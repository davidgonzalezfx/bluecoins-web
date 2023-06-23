import { useState, useEffect, useCallback, createContext } from 'react'
import initSqlJs, { Database, SqlJsStatic } from 'sql.js'
import { buildDatabase, getTransactions } from '../services/database'
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
}

const DatabaseContext = createContext<DatabaseContextType>(null)

const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [database, setDatabase] = useState<Database | null>(null)
  const [SQL, setSQL] = useState<SqlJsStatic | null>(null)
  const [state, setState] = useState({ transactions: [] })

  const init = useCallback(async () => {
    const sqlJs = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`
    })

    setSQL(sqlJs)
  }, [])

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // if user is in / route
    if (window.location.pathname === '/') {
      let dbInstance = database
      if (dbInstance === null) {
        dbInstance = buildDatabase(SQL)
      }
      console.log('Database updated')
      const updatedTransactions = getTransactions(dbInstance)
      setState({ transactions: updatedTransactions })
    }
  }, [SQL, database])

  const createDatabase = useCallback(
    async (file: ArrayBufferLike): Promise<void> => {
      if (!SQL) return Promise.reject(new Error('SQL.js not loaded'))

      const fileDatabase = new SQL.Database(new Uint8Array(file))

      if (fileDatabase) {
        setDatabase(fileDatabase)

        const updatedTransactions = getTransactions(fileDatabase)
        setState({ transactions: updatedTransactions })

        return Promise.resolve()
      } else {
        return Promise.reject(new Error('Database not created'))
      }
    },
    [SQL]
  )

  const exportDatabase = useCallback(() => {
    let dbInstance = database
    if (dbInstance === null) {
      dbInstance = buildDatabase(SQL)
    }

    const data = dbInstance.export()
    const buffer = new Blob([data], { type: 'application/octet-stream' })

    const db_name = `Bluecoins_${formatDate(new Date())}.fydb`.replace(' ', '_')

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(buffer)
    link.download = db_name
    link.click()
  }, [SQL, database])

  return (
    <DatabaseContext.Provider
      value={{
        SQL,
        database,
        setDatabase,
        createDatabase,
        exportDatabase,
        state
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export { DatabaseContext, DatabaseProvider }