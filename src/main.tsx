import { createRoot } from 'react-dom/client';
import { Router } from './Components/Router';
import  './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';


const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </React.StrictMode>
);
