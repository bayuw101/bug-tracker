'use client';

import React from 'react'
import { Button, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueForm>();

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
        const newIssue = await axios.post('/api/issues', data);
        console.log(newIssue);
        router.push('/issues');
    })}>
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')}></TextField.Input>
        </TextField.Root>   
        <Controller
            name="description"
            control={control}
            render={({field}) => <SimpleMDE placeholder='Description' {...field}/>}
        />
        <Button>Submit</Button>
    </form>
  )
}

export default NewIssuePage