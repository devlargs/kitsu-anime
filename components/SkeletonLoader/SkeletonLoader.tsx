import { Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { FC } from 'react';

const SkeletonLoader: FC<{ multiple?: boolean }> = ({ multiple }) => {
  return !multiple ? (
    <Skeleton>
      <GridItem w="100%" h="550px" bg="blue.500" />
    </Skeleton>
  ) : (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
        xl: 'repeat(5, 1fr)',
      }}
      gap={6}
    >
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <Skeleton key={i}>
            <GridItem w="100%" h="550px" bg="blue.500" />
          </Skeleton>
        );
      })}
    </Grid>
  );
};

export default SkeletonLoader;
