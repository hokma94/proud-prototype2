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
    <div className="bg-white border-t p-2">
      <div className="flex justify-around">
        {navItems.map(({ id, label, icon: Icon }) => (
          <Button 
            key={id}
            variant="ghost" 
            className={`flex-1 flex flex-col items-center py-3 ${
              currentScreen === id ? 'text-blue-600' : ''
            }`}
            onClick={() => onNavigate(id)}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}