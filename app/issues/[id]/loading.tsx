import { Box, Card, Flex, Heading } from '@radix-ui/themes'
import { Skeleton } from '@/app/components';

const LoadingIssueDetailPage = () => {
    return (
        <Box className='max-w-xl'>
            <Heading><Skeleton /></Heading>
            <Flex className='space-x-3' my="2">
                <Skeleton width="5rem" />
                <Skeleton width="8rem"/>
            </Flex>
            <Card className='prose prose-slate mt-4 px-5'>
                <Skeleton count={3} />
            </Card>
        </Box>
    )
}

export default LoadingIssueDetailPage