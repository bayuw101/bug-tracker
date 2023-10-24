import { Box } from '@radix-ui/themes'
import { Skeleton } from '@/app/components';
import React from 'react'

const IssueFormSkeleton = () => {
  return (
    <Box className='max-w-xl space-y-4'>
        <Skeleton height={30} className='mb-2'/>
        <Skeleton height="20rem" />
        <Skeleton height={40} width={200} className='mt-10' />
    </Box>
  )
}

export default IssueFormSkeleton