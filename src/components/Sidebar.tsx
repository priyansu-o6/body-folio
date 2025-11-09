import { useState } from 'react';
import { Settings, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 rounded-full bg-card shadow-card hover:bg-muted"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </Button>

      <aside
        className={`fixed left-0 top-0 h-full bg-card shadow-elevated z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <div className="flex flex-col h-full pt-20 p-6 gap-4">
          <Button
            variant="ghost"
            className="justify-start gap-3 text-base hover:bg-muted"
            onClick={() => {
              navigate('/view-profile');
              setIsOpen(false);
            }}
          >
            <User className="h-5 w-5" />
            View Profile
          </Button>
          
          <Button
            variant="ghost"
            className="justify-start gap-3 text-base hover:bg-muted"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
