
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { label: 'План урока', path: '/lesson-plan' },
    { label: 'Подбор заданий', path: '/task-match' },
    { label: 'Проверка работ', path: '/homework-check' },
    { label: 'Личный кабинет', path: '/dashboard' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Topbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-white">
                Астра ИИ
              </Link>
              
              <nav className="hidden md:flex space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-white/10">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    У
                  </div>
                  <span className="hidden md:block">Учитель</span>
                  <ChevronDown size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
