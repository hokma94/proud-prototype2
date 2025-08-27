import { Button } from './ui/button';
import { Home, Paintbrush, Gamepad2, Award, Settings } from 'lucide-react';

interface NavigationBarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function NavigationBar({ currentScreen, onNavigate }: NavigationBarProps) {
  const navItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'drawing-menu', label: '드로잉', icon: Paintbrush },
    { id: 'game-menu', label: '게임', icon: Gamepad2 },
    { id: 'weekly-report', label: '리포트', icon: Award },
    { id: 'settings', label: '설정', icon: Settings }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-area-bottom">
      <div className="flex justify-around px-2 py-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <Button 
            key={id}
            variant="ghost" 
            className={`flex-1 flex flex-col items-center justify-center py-3 px-2 min-h-[64px] ${
              currentScreen === id 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => onNavigate(id)}
          >
            <Icon className={`w-6 h-6 mb-1 ${currentScreen === id ? 'text-blue-600' : 'text-gray-600'}`} />
            <span className={`text-xs font-medium ${currentScreen === id ? 'text-blue-600' : 'text-gray-600'}`}>
              {label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}