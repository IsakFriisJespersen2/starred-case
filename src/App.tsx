import './App.css';
import { Users } from './components/Users';
import { Jobs } from './components/Jobs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex min-h-full min-w-full flex-grow flex-col items-center my-20'>
        <main className='max-w-7xl'>
          <Users />
          <Jobs />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
