import React from 'react'
import { useTitle } from '../hooks'

const Home = () => {
  const [setTitle] = useTitle('Home')

  return <p>Home</p>
}

export default Home
