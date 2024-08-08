import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, PlusIcon, Upload } from 'lucide-react';
import { ResetIcon } from '@radix-ui/react-icons';

interface Props {
  isValid: boolean;
  onAppend: () => void;
  onReset: () => void;
}

function CreateTournamentFab(props: Props) {
  const { isValid, onAppend, onReset } = props
  // TODO: Mobile variant
  return (
    <div className='fixed bottom-0 xl:bottom-4 left-0 w-full'>
      <div className='h-16 max-w-screen-xl mx-auto px-4 my-0 flex items-center justify-between p-2 bg-nav xl:shadow-md xl:rounded-xl'>
        <div className='gap-2 flex items-center'>
          <Button size='icon' variant='secondary'>
            <Upload/>
          </Button>
          <Button 
            onClick={onAppend} 
            variant='secondary' 
            size='icon'
          >
            <PlusIcon/>
          </Button>
          <Button variant='destructive' size='icon' onClick={onReset}>
            <ResetIcon/>
          </Button>
        </div>
        <Button disabled={!isValid} type="submit">
          Continue
          <ArrowRight/>
        </Button>
      </div>
    </div>
  )
}

export default CreateTournamentFab
