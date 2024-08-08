import React, { InputHTMLAttributes, ReactElement } from 'react'
import Image from 'next/image';

// A input file with image preview for useFieldArray

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  fieldIdx: number;
  preview?: string;
  errorMessage?: string;
}

function InputImagePreview(props: Props) {
  const { fieldIdx, preview, errorMessage, ...rest } = props

  return (
    <label htmlFor={`${fieldIdx}.image`}>
      <div className='group cursor-pointer relative w-full h-[180px] rounded-md overflow-hidden border border-input hover:opacity-50'>
        { preview ? (
          <>
            <Image 
              fill 
              className='object-cover' 
              alt='preview' 
              src={preview} 
            /> 
            <div className='opacity-0 group-hover:opacity-100 transition-all absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 grid place-content-center'>
              <span className='font-light uppercase text-white'>Change</span>
            </div>
          </>
          
        ) : (
          <div className='transition-all absolute top-0 left-0 w-full h-full grid place-content-center'>
            <span className='font-light text-card-foreground uppercase'>Choose image</span>
          </div>
        )
        }
      </div>
      
      { errorMessage && (
        <div className='bg-destructive rounded-md px-2 mt-2'>
          <span className='text-xs text-destructive-foreground'>{errorMessage}</span>
        </div>
      ) }
      
      <input
        className='sr-only' 
        type="file" 
        id={`${fieldIdx}.image`} 
        {...rest}
      />
    </label>
  )
}

export default InputImagePreview
