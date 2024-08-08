'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Cross1Icon } from '@radix-ui/react-icons'

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
      contestants: [
        { name: '', image: null as unknown as FileList },
        { name: '', image: null as unknown as FileList },
      ],
    },
  })

  console.log(form.formState.errors)

  const formValues = form.watch();
  const validation = formSchema.safeParse(formValues);

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

  return (
    
      <Form {...form}>
        <div>
          {!fields.length && (
            <span className='text-foreground uppercase font-light'>Start by adding contestants</span>
          )}
        </div>
        <form className='mt-4' onSubmit={form.handleSubmit(onSubmit)}>
          <ul className='flex gap-4 flex-wrap justify-center'>
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
                    <label htmlFor={`${fieldIdx}.image`}>
                      <div className='group cursor-pointer relative w-full h-[180px] rounded-md overflow-hidden border border-input hover:opacity-50'>
                        { previews[fieldIdx] ? (
                          <>
                            <Image 
                              fill 
                              className='object-cover' 
                              alt='preview' 
                              src={previews[fieldIdx]} 
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
                      
                      { form.formState.errors.contestants 
                        && form.formState.errors.contestants[fieldIdx] 
                          && (
                        <div className='bg-destructive rounded-md px-2 mt-2'>
                          <span className='text-xs text-destructive-foreground'>{form.formState.errors.contestants[fieldIdx].image?.message}</span>
                        </div>
                      ) }
                      
                      <input
                        className='sr-only' 
                        type="file" 
                        id={`${fieldIdx}.image`} 
                        {...form.register(`contestants.${fieldIdx}.image`)}
                      />
                    </label>
                  </CardContent>
                </Card>
                
              </li>
            ))}
          </ul>
          
          <div className='fixed bottom-0 xl:bottom-4 left-0 w-full'>
            <div className='h-16 max-w-screen-xl mx-auto px-4 my-0 flex items-center justify-between p-2 bg-nav xl:shadow-md xl:rounded-xl'>
              <div className='space-x-2'>
                <Button 
                  onClick={() => append({ name: '', image: '' as unknown as FileList })} 
                  variant='secondary' 
                  type="button"
                >
                  Add contestant
                </Button>
                <Button variant='destructive' onClick={() => form.reset({ contestants: [] })}>
                  Reset
                </Button>
              </div>
              <Button type="submit">Continue</Button>
            </div>
          </div>
          
        </form>
      </Form>
  )
}

export default CreateTournament
