import { useState } from 'react'
import Select, { MultiValue } from 'react-select'
import {
  MdClose,
  MdOutlineAccountBalance,
  MdOutlineBookmarks,
  MdOutlineStyle,
  MdPlaylistAddCheck
} from 'react-icons/md'

import './AddModal.css'

type Option = {
  value: string
  label: string
}

const categoryOptions: Option[] = [
  { value: 'chocolate', label: 'Food' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const accountOptions: Option[] = [
  { value: 'chocolate', label: 'Bank' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const labelsOptions: Option[] = [
  { value: 'chocolate', label: 'Optimizable' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const statusOptions: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'cleared', label: 'Cleared' },
  { value: 'reconciled', label: 'Reconciled' },
  { value: 'void', label: 'Void' }
]

const AddModal = ({
  setIsAddModalOpen
}: {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [itemName, setItemName] = useState('')
  const [amount, setAmount] = useState('0.00')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [category, setCategory] = useState<Option>(categoryOptions[0])
  const [account, setAccount] = useState<Option>(accountOptions[0])
  const [labels, setLabels] = useState<MultiValue<Option>>([])
  const [status, setStatus] = useState<Option>()
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
  }

  const handleCategoryChange = (selectedOption: Option) => {
    setCategory(selectedOption)
  }

  const handleAccountChange = (selectedOption: Option) => {
    setAccount(selectedOption)
  }

  const handleLabelChange = (selectedOption: MultiValue<Option>) => {
    setLabels(selectedOption)
  }
  const handleStatusChange = (selectedOption: Option) => {
    setStatus(selectedOption)
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
      <div className='w-96 rounded bg-white p-6 pt-3 shadow dark:bg-[#333333] dark:text-[#F2F3F3]'>
        <div className='flex justify-end'>
          <button
            className='text-gray-500 hover:text-gray-700'
            onClick={() => setIsAddModalOpen(false)}
          >
            <MdClose className='relative left-3 h-6 w-6' />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-4 flex flex-col'>
            <div className='relative'>
              <span className='absolute inset-y-0 left-0 flex items-center text-2xl text-gray-400'>
                <MdOutlineStyle />
              </span>
              <input
                type='text'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder='Item Name'
                className='p-2 pl-8 outline-none dark:bg-[#333333]'
              />
            </div>
          </div>
          <div className='mb-4 flex flex-col'>
            <div className='relative'>
              <span className='absolute inset-y-0 left-0 flex items-center'>
                {/* tailwind css div red square */}
                <div className='rounded-xs flex h-5 w-5 items-center justify-center bg-red-500 text-white'>
                  -
                </div>
              </span>
              <input
                type='text'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Amount'
                className='p-2 pl-8 outline-none dark:bg-[#333333]'
              />
            </div>
          </div>
          <div className='mb-4 flex'>
            <div className='mb-2 mr-2 w-1/2'>
              <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className='outline-none dark:bg-[#333333]'
              />
            </div>
            <div className='ml-2 w-1/2'>
              <input
                type='time'
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className='outline-none dark:bg-[#333333]'
              />
            </div>
          </div>
          <div className='relative mb-2 flex items-center text-gray-400 '>
            <span className='text-2xl '>
              <MdOutlineStyle className='absolute inset-0' />
            </span>
            <div className='w-full pl-8'>
              <label className='absolute -top-2 z-10 mb-1 text-xs font-semibold'>Category</label>
              <Select
                value={category}
                options={categoryOptions}
                onChange={handleCategoryChange}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                placeholder='Category'
                className='select-border-none dark:bg-[#333333]'
                classNamePrefix='select'
                isSearchable={false}
              />
            </div>
          </div>
          <div className='relative mb-2 flex items-center text-gray-400'>
            <span className='text-2xl'>
              <MdOutlineAccountBalance className='absolute inset-0' />
            </span>
            <div className='w-full pl-8 '>
              <label className='absolute -top-2 z-10 mb-1 text-xs font-semibold'>Account</label>
              <Select
                value={account}
                options={accountOptions}
                onChange={handleAccountChange}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                placeholder='Account'
                className='select-border-none'
                classNamePrefix='select'
                isSearchable={false}
              />
            </div>
          </div>
          <div className='relative mb-2 flex items-center text-gray-400'>
            <span className='text-2xl'>
              <MdOutlineBookmarks />
            </span>
            <div className='w-full pl-2'>
              <Select
                isMulti
                options={labelsOptions}
                value={labels}
                onChange={handleLabelChange}
                placeholder='Labels'
                className='select-border-none'
                classNamePrefix='select'
                isSearchable={false}
              />
            </div>
          </div>
          <div className='relative mb-2 flex items-center text-gray-400'>
            <span className='text-2xl'>
              <MdPlaylistAddCheck />
            </span>
            <div className='w-full pl-2'>
              <Select
                value={status}
                options={statusOptions}
                onChange={handleStatusChange}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                placeholder='Status'
                className='select-border-none'
                classNamePrefix='select'
                isSearchable={false}
              />
            </div>
          </div>
          <div className='mb-2 flex h-16 flex-col'>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder='Notes'
              className='outline-none dark:bg-[#333333]'
            />
          </div>
          <button type='submit' className='rounded bg-green-600 px-4 py-2 text-white'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddModal
