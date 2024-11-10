import './App.css';
import { Users } from './components/Users';
import { Jobs } from './components/Jobs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

export type User = {
  email: string;
  favorites: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  salt: string;
};

function App() {
  const [user, setUser] = useState<User | undefined>();
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex min-h-full min-w-full flex-grow flex-col items-center my-20'>
        <main className='max-w-7xl'>
          <Users setUser={setUser} />
          <Jobs user={user} />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
