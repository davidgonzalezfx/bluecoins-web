import ReactSelect from 'react-select'

import './Select.css'

const Select = ({
  options,
  value,
  onChange,
  placeholder,
  isMulti = false
}: {
  options: any
  value: any
  onChange: any
  placeholder: string
  isMulti?: boolean
}) => {
  return (
    <ReactSelect
      isMulti={isMulti}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className='select-border-none'
      classNamePrefix='select'
      isSearchable={false}
    />
  )
}

export default Select
