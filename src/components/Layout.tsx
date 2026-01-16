import React, { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Compass, Star, MessageCircle, User } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface LayoutProps {
  children: ReactNode;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 ${
      active
        ? 'text-primary'
        : 'text-muted-foreground hover:text-foreground'
    }`}
  >
    <div className={`relative ${active ? 'scale-110' : ''} transition-transform`}>
      <Icon size={22} strokeWidth={active ? 2.5 : 2} />
      {active && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full gradient-primary" />
      )}
    </div>
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </Link>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { t } = useApp();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-20 overflow-y-auto no-scrollbar">
        <div className="max-w-md mx-auto min-h-full bg-card shadow-xl sm:rounded-xl sm:my-4 sm:overflow-hidden">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-50 backdrop-blur-lg bg-opacity-90">
        <div className="flex justify-around items-center h-full max-w-md mx-auto">
          <NavItem to="/" icon={Home} label={t.feed} active={location.pathname === '/'} />
          <NavItem to="/discover" icon={Compass} label={t.discover} active={location.pathname === '/discover'} />
          <NavItem to="/highlights" icon={Star} label={t.highlights} active={location.pathname === '/highlights'} />
          <NavItem to="/chats" icon={MessageCircle} label={t.chats} active={location.pathname.startsWith('/chats')} />
          <NavItem to="/profile" icon={User} label={t.profile} active={location.pathname.startsWith('/profile')} />
        </div>
      </nav>
    </div>
  );
};
