import { trpc, getQueryClient } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Client } from './client';
import { Suspense } from 'react';

const Home = async () => {

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.hello.queryOptions({text: 'from prefetch'}));

  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <h1>Welcome to the AI Website Builder</h1>  
          <Client/>
        </Suspense> 
      </HydrationBoundary>
    
  );
} 

export default Home;  