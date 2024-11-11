import { User } from '../../../App';
import { ActiveTab } from '../Jobs';

export const Menu = ({
  user,
  setSearch,
  activeTab,
  setActiveTab,
}: {
  user: User | undefined;
  setSearch: (search: string) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}) => {
  return (
    <div className='flex justify-between items-end rounded-md'>
      <div className='flex gap-x-6'>
        <button
          onClick={() => setActiveTab('all')}
          className={activeTab === 'all' ? 'underline' : ''}
        >
          All
        </button>
        <button
          disabled={!user}
          onClick={() => setActiveTab('favorites')}
          className={activeTab === 'favorites' ? 'underline' : ''}
        >
          My Starred
        </button>
      </div>
      <input
        minLength={2}
        onChange={(e) => setSearch(e.target.value)}
        className='bg-gray-90 py-2 px-4'
        placeholder='Search job title...'
      />
    </div>
  );
};
