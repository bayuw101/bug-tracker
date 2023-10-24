'use client';

import { ErrorMessage, Spinner } from '@/app/components';
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        setSubmitting(true);
        try {
            const newIssue = await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
            console.log(error);
            setError('An unexpected error occured.');
        }
    });

    return (
        <div className='max-w-xl space-y-3'>
            {error && <Callout.Root color="red" className='mb-5'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form className='max-w-xl space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')}></TextField.Input>
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => {
                        console.log(field);
                        return <SimpleMDE placeholder='Description' {...field} ref={null} />
                    }}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Submit {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage