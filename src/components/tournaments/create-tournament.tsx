'use client'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Cross1Icon } from '@radix-ui/react-icons'
import InputImagePreview from './input-image-preview'
import CreateTournamentFab from './create-tournament-fab'
import { PlusIcon, Upload } from 'lucide-react'

export type ContestantDsiplay = 'image' | 'color'

const contestantSchema = z.object({
  image: z.instanceof(FileList, { message: 'Image is required!' })
    .refine(files => {
      return !!files.length;
    }, 'Image is required!'),
  name: z.string().min(3, 'Type minimum of 3 characters'),
})

const formSchema = z.object({
  contestants: z.array(contestantSchema).min(2, 'Create a minimum of two contestants'),
})

interface Props {}

function CreateTournament(props: Props) {
  const {} = props
  const [previews, setPreviews] = useState<Record<number, string>>({})

  const contestantsWithPreview = Object.keys(previews);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contestants: [],
    },
  })

  const formValues = form.watch();
  const validation = formSchema.safeParse(formValues);

  console.log(formValues)

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contestants", 
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  // handle previews
  useEffect(() => {
    formValues.contestants.forEach((contestant, index) => {
      const hasPreview = contestantsWithPreview.includes(index.toString())
      if(hasPreview) return;
      if(contestant.image && !!contestant.image.length) {
        const imageUrl = URL.createObjectURL(contestant.image[0])
        setPreviews(prev => ({...prev, [index]: imageUrl}))
      }
    })
  }, [contestantsWithPreview, formValues.contestants])

  const getErrorMessage = useCallback((fieldIdx: number) => {
    return form.formState.errors.contestants 
      && form.formState.errors.contestants[fieldIdx]
        && form.formState.errors.contestants[fieldIdx]
  }, [form.formState.errors.contestants])

  return (
    
      <Form {...form}>
          {!fields.length && (
            <div className='bg-muted rounded-md p-4 sm:p-10'>
              <h3 className='mb-5 text-muted-foreground text-sm sm:text-xl uppercase font-bold'>Start by adding contestants</h3>
              <ul className='text-xs sm:text-base text-muted-foreground list-disc ml-4 space-y-2'>
                <li>You can add contestants manually using <Button size='icon' variant='secondary' className='w-6 h-6 rounded'><PlusIcon size={15} className='inline'/></Button> and specify name and image.</li>
                <li>You can use <Button size='icon' variant='secondary' className='w-6 h-6 rounded'><Upload size={15} className='inline'/></Button> button to upload multiple images</li>
              </ul>
            </div>
          )}
        <form className='mt-4' onSubmit={form.handleSubmit(onSubmit)}>
          <ul className='flex gap-4 flex-wrap justify-center pb-20'>
            {fields.map((field, fieldIdx) => (  
              <li key={field.id}>
                <Card className='relative w-60'>
                  <Button
                    size='icon'
                    className='absolute top-2 right-2 rounded-full' 
                    onClick={() => remove(fieldIdx)} 
                    variant='outline'
                  >
                    <Cross1Icon/>
                  </Button>  
                  <CardHeader>
                    <CardTitle className='text-sm uppercase'>Contestant #{fieldIdx + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-2'>
                    <FormField
                      name={`contestants.${fieldIdx}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Name"  
                              {...form.register(`contestants.${fieldIdx}.name`)}
                            />
                          </FormControl>
                          <FormMessage className='mt-2' />
                        </FormItem>
                      )}
                    />
                    <InputImagePreview
                      fieldIdx={fieldIdx}
                      preview={previews[fieldIdx]}
                      errorMessage={getErrorMessage(fieldIdx)?.message}
                      {...form.register(`contestants.${fieldIdx}.image`)}
                      onChange={(e) => {
                        const files = e.target.files;
                        if(files) {
                          form.setValue(`contestants.${fieldIdx}.image`, files)
                        }
                      }}
                    />
                  </CardContent>
                </Card>
                
              </li>
            ))}
          </ul>
          <CreateTournamentFab
            onAppend={() => append({ name: '', image: '' as unknown as FileList })}
            onReset={() => form.reset({ contestants: [] })}
            isValid={validation.success}
          />
        </form>
      </Form>
  )
}

export default CreateTournament
