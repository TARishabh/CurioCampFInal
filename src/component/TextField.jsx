import React from 'react'
import { ErrorMessage, useField } from 'formik';

const TextField = ({...props}) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <input
        className= {`my-2 w-full p-3 rounded-full text-black input-field shadow-lg shadow-[#040c166b] border-1 ${meta.touched && meta.error && 'border-red-700'}`}
        {...field} {...props}
        autoComplete='off'
      />
      <ErrorMessage component="div" name={field.name} className = "text-sm text-red-600"/>
    </div>
  )
}

export default TextField