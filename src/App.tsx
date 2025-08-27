import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Slider } from './components/ui/slider';
import { Switch } from './components/ui/switch';
import { Heart, Brain, Users, Settings, Play, Undo, Redo, Palette, Target, Star, Trophy, Share2, Volume2, Eye, Type, Clock, Home, User, Award, Mic, CheckCircle, Circle, Square, Triangle, Bell, Calendar as CalendarIcon, Lock, Zap, Crown, Timer, BarChart3, Gamepad2, Paintbrush, ChevronRight, Plus, Repeat, Image, Camera, Brush, Layers, Activity, TrendingUp, PenTool, Grid, Shuffle, RotateCcw } from 'lucide-react';
import { NavigationBar } from './components/NavigationBar';
import { GameCompleteScreen } from './components/screens/GameCompleteScreen';
import { 
  gameTypes, 
  initialDrawingPacks, 
  initialGamePacks, 
  createLeaderboardData, 
  type DrawingPack, 
  type GamePack 
} from './constants/app-data';
import { 
  getHomeHeaderMessage, 
  formatTime, 
  getMondrianPieceStyle, 
  parseMondrianStyle, 
  getGameDetails 
} from './utils/app-helpers';

type Screen = 'splash' | 'onboarding' | 'permissions' | 'home' | 'drawing-guide' | 'drawing-canvas' | 'drawing-complete' | 'game-start' | 'game-play' | 'game-complete' | 'reward' | 'weekly-report' | 'family' | 'settings' | 'subscription' | 'drawing-menu' | 'drawing-calendar' | 'game-menu' | 'game-select' | 'game-calendar' | 'game-detail' | 'premium-pack' | 'game-premium-pack' | 'leaderboard';

interface GameState {
  currentGame: 'memory' | 'find' | 'path' | 'sudoku' | 'connect' | 'pattern' | 'attention';
  score: number;
  timeLeft: number;
}

interface GameCard {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
  artPiece: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [drawingPath, setDrawingPath] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>({
    currentGame: 'memory',
    score: 0,
    timeLeft: 180
  });
  const [selectedGame, setSelectedGame] = useState<string>('memory');
  const [streak, setStreak] = useState(3);
  const [points, setPoints] = useState(150);
  const [hearts, setHearts] = useState(3);
  const [dailyProgress, setDailyProgress] = useState({ drawing: false, game: false });
  const [showAccessibilitySettings, setShowAccessibilitySettings] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 18,
    highContrast: false,
    voiceGuide: false
  });

  const [gameCompletionTime] = useState(135);
  const [drawingPacks, setDrawingPacks] = useState<DrawingPack[]>(initialDrawingPacks);
  const [gamePacks, setGamePacks] = useState<GamePack[]>(initialGamePacks);
  
  const leaderboardData = createLeaderboardData(gameCompletionTime);
  const averageCompletionTime = 142;

  const [cognitiveData] = useState({
    drawingSpeed: 85,
    drawingAccuracy: 92,
    handStability: 88,
    pressureConsistency: 78,
    gameReactionTime: 1.2,
    memoryScore: 85,
    attentionSpan: 90,
    spatialAwareness: 82,
    trend: 'improving' as const
  });

  const purchaseDrawingPack = (packId: string) => {
    setDrawingPacks(prev => prev.map(pack => 
      pack.id === packId ? { ...pack, purchased: true } : pack
    ));
  };

  const purchaseGamePack = (packId: string) => {
    setGamePacks(prev => prev.map(pack => 
      pack.id === packId ? { ...pack, purchased: true } : pack
    ));
  };

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => Math.min(prev + 1, 5));
    }, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // 스플래시 화면
  if (currentScreen === 'splash') {
    return (
      <div className="mobile-app-layout bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="mb-8">
              <Brain className="w-24 h-24 text-blue-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Proud100</h1>
              <p className="text-lg text-gray-600">하루 10분, 두뇌 스트레칭</p>
            </div>
            <div className="animate-pulse">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 온보딩 화면
  if (currentScreen === 'onboarding') {
    const onboardingData = [
      {
        icon: <Brain className="w-16 h-16 text-blue-600" />,
        title: "인지 강화 웰니스",
        description: "드로잉과 미니게임을 통해 두뇌 건강을 관리하고 인지 능력을 향상시켜보세요."
      },
      {
        icon: <Clock className="w-16 h-16 text-green-600" />,
        title: "하루 10분 루틴",
        description: "드로잉과 미니게임을 통한 짧고 재미있는 일일 미션을 제공합니다."
      },
      {
        icon: <Users className="w-16 h-16 text-purple-600" />,
        title: "가족과 함께",
        description: "가족들과 진행상황을 공유하고 응원의 메시지를 주고받으세요."
      }
    ];

    return (
      <div className="mobile-app-layout bg-white">
        <div className="mobile-content flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="mb-8">
              {onboardingData[onboardingStep].icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {onboardingData[onboardingStep].title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {onboardingData[onboardingStep].description}
            </p>
          </div>
        </div>
        
        <div className="mobile-header p-6 space-y-4">
          <div className="flex justify-center space-x-2 mb-6">
            {[0, 1, 2].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step === onboardingStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button
            onClick={() => {
              if (onboardingStep < 2) {
                setOnboardingStep(onboardingStep + 1);
              } else {
                setCurrentScreen('permissions');
              }
            }}
            className="w-full h-14 text-lg"
            style={{ minHeight: '56px' }}
          >
            {onboardingStep < 2 ? '다음' : '시작하기'}
          </Button>
        </div>
      </div>
    );
  }

  // 권한 설정 화면
  if (currentScreen === 'permissions') {
    return (
      <div className="mobile-app-layout bg-white">
        <div className="mobile-header p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">설정을 확인해주세요</h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium">알림 허용</h3>
                      <p className="text-sm text-gray-600">일일 미션 리마인더 (선택)</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mic className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-medium">마이크 접근</h3>
                      <p className="text-sm text-gray-600">가족 음성 댓글용 (선택)</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-6 h-6 text-purple-600" />
                    <div>
                      <h3 className="font-medium">접근성 설정</h3>
                      <p className="text-sm text-gray-600">큰 글자, 고대비 등</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setShowAccessibilitySettings(true)}>
                    설정
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mobile-content p-6">
          <Button
            onClick={() => setCurrentScreen('home')}
            className="w-full h-14 text-lg"
          >
            시작하기
          </Button>
        </div>

        {showAccessibilitySettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h3 className="text-xl font-bold mb-6">접근성 설정</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">글자 크기</label>
                  <Slider
                    value={[accessibilitySettings.fontSize]}
                    onValueChange={(value) => setAccessibilitySettings(prev => ({ ...prev, fontSize: value[0] }))}
                    min={16}
                    max={24}
                    step={2}
                    className="w-full"
                  />
                  <div className="text-center mt-2" style={{ fontSize: `${accessibilitySettings.fontSize}px` }}>
                    미리보기 텍스트
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="font-medium">고대비 모드</label>
                  <Switch
                    checked={accessibilitySettings.highContrast}
                    onCheckedChange={(checked) => setAccessibilitySettings(prev => ({ ...prev, highContrast: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="font-medium">음성 안내</label>
                  <Switch
                    checked={accessibilitySettings.voiceGuide}
                    onCheckedChange={(checked) => setAccessibilitySettings(prev => ({ ...prev, voiceGuide: checked }))}
                  />
                </div>
              </div>

              <Button
                onClick={() => setShowAccessibilitySettings(false)}
                className="w-full mt-6"
              >
                확인
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 홈 화면
  if (currentScreen === 'home') {
    const headerMessage = getHomeHeaderMessage(dailyProgress);
    
    return (
      <div className="mobile-app-layout bg-gray-50">
        {/* 헤더 - 고정 */}
        <div className="mobile-header bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{headerMessage.title}</h1>
              <p className="text-gray-600">{headerMessage.subtitle}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-red-100 px-3 py-1 rounded-full">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">{hearts}</span>
              </div>
              <Badge variant="secondary" className="text-sm">
                <Star className="w-4 h-4 mr-1" />
                {streak}일 연속
              </Badge>
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('settings')}>
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* 콘텐츠 영역 - 스크롤 가능 */}
        <div className="mobile-content p-4 space-y-6">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-blue-600" />
                <span>오늘의 미션</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    dailyProgress.drawing ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {dailyProgress.drawing ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Palette className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">드로잉 미션</p>
                    <p className="text-sm text-gray-600">3-5분 소요</p>
                  </div>
                </div>
                {!dailyProgress.drawing && (
                  <Button onClick={() => setCurrentScreen('drawing-guide')}>
                    시작
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    dailyProgress.game ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {dailyProgress.game ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Brain className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">미니게임</p>
                    <p className="text-sm text-gray-600">5-7분 소요</p>
                  </div>
                </div>
                {!dailyProgress.game && dailyProgress.drawing && (
                  <Button onClick={() => setCurrentScreen('game-start')}>
                    시작
                  </Button>
                )}
              </div>

              {(!dailyProgress.drawing || !dailyProgress.game) && (
                <Button 
                  className="w-full h-12 text-lg"
                  onClick={() => setCurrentScreen(dailyProgress.drawing ? 'game-start' : 'drawing-guide')}
                >
                  지금 시작 (3-10분)
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>이번 주 진행도</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>완료한 미션</span>
                  <span className="font-medium">5/7일</span>
                </div>
                <Progress value={71} className="h-3" />
                <p className="text-sm text-gray-600 text-center">
                  주간 목표까지 2일 남았어요!
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentScreen('drawing-menu')}>
              <CardContent className="p-4 text-center">
                <Paintbrush className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium">드로잉 스튜디오</p>
                <p className="text-sm text-gray-600">더 많은 주제들</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentScreen('game-menu')}>
              <CardContent className="p-4 text-center">
                <Gamepad2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-medium">게임 센터</p>
                <p className="text-sm text-gray-600">다양한 미니게임</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="font-medium">나의 변화 카드</p>
                    <p className="text-sm text-gray-600">이번 주 활동 요약</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentScreen('weekly-report')}>
                    보기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <NavigationBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>
    );
  }

  // 드로잉 메뉴 화면
  if (currentScreen === 'drawing-menu') {
    return (
      <div className="mobile-app-layout bg-white">
        {/* 헤더 - 고정 */}
        <div className="mobile-header p-4 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">드로잉 스튜디오</h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-red-100 px-3 py-1 rounded-full">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">{hearts}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('leaderboard')}>
                <BarChart3 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* 콘텐츠 영역 - 스크롤 가능 */}
        <div className="mobile-content p-4 space-y-4">
          {/* 오늘의 데일리 미션 */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">오늘의 데일리 미션</p>
                    <p className="text-sm text-gray-600">"나의 정원" - 완료됨</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* 달력 보기 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">이번 달 진행도</h3>
                <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('drawing-calendar')}>
                  전체보기 <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <div key={day} className="text-xs text-gray-500 py-1">{day}</div>
                ))}
                {Array.from({length: 7}, (_, i) => (
                  <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                    i < 5 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 프리미엄 팩 - 드로잉용 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">인지 강화 드로잉 팩</h3>
              <Button variant="ghost" size="sm">
                모두보기 <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {drawingPacks.slice(0, 3).map(pack => (
                <Card key={pack.id} className={pack.purchased ? 'border-green-200 bg-green-50' : 'hover:shadow-md transition-shadow'}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        pack.purchased ? 'bg-green-600' : pack.type === 'coloring' ? 'bg-purple-500' : 'bg-blue-500'
                      }`}>
                        {pack.purchased ? (
                          <CheckCircle className="w-8 h-8 text-white" />
                        ) : pack.type === 'coloring' ? (
                          <Image className="w-8 h-8 text-white" />
                        ) : (
                          <Brush className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{pack.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{pack.description}</p>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="text-xs">{pack.category}</Badge>
                              <Badge variant="outline" className="text-xs">{pack.type === 'coloring' ? '컬러링' : '자유드로잉'}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {pack.samples.map((sample, i) => (
                                <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{sample}</span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right ml-2">
                            {pack.purchased ? (
                              <Button size="sm">플레이</Button>
                            ) : (
                              <div>
                                <p className="text-sm font-bold text-blue-600">₩{pack.price.toLocaleString()}</p>
                                <Button size="sm" className="mt-1" onClick={() => setCurrentScreen('premium-pack')}>
                                  구매
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <NavigationBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>
    );
  }

  // 드로잉 달력 화면 (추가)
  if (currentScreen === 'drawing-calendar') {
    return (
      <div className="mobile-h-screen bg-white flex flex-col">
        {/* 헤더 - 고정 */}
        <div className="p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setCurrentScreen('drawing-menu')}>
              ← 뒤로
            </Button>
            <h1 className="text-xl font-bold">드로잉 달력</h1>
            <div className="w-16"></div>
          </div>
        </div>

        {/* 콘텐츠 영역 - 스크롤 가능 */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto pb-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">2024년 12월</h2>
            <p className="text-gray-600">이번 달 드로잉 활동을 확인해보세요</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-3 text-center mb-4">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <div key={day} className="text-sm font-medium text-gray-700 py-2">{day}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-3">
                {Array.from({length: 31}, (_, i) => {
                  const dayNum = i + 1;
                  const isCompleted = dayNum <= 15;
                  const isToday = dayNum === 15;
                  
                  return (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm border-2 ${
                        isToday ? 'border-blue-500 bg-blue-50 text-blue-600 font-bold' :
                        isCompleted ? 'border-green-200 bg-green-50 text-green-600' : 
                        'border-gray-200 bg-gray-50 text-gray-400'
                      }`}
                    >
                      <span>{dayNum}</span>
                      {isCompleted && (
                        <CheckCircle className="w-3 h-3 mt-1" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-green-600">15</p>
                <p className="text-sm text-gray-600">완료한 날</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-blue-600">48%</p>
                <p className="text-sm text-gray-600">완료율</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-purple-600">7</p>
                <p className="text-sm text-gray-600">연속 기록</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">이번 달 하이라이트</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 가장 활발했던 주: 12월 2주차 (7일 연속)</li>
                <li>• 가장 좋아한 주제: "겨울 풍경" 시리즈</li>
                <li>• 평균 드로잉 시간: 4분 20초</li>
                <li>• 손 안정성 개선: 전월 대비 +12%</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 드로잉 프리미엄 팩 구매 화면 (추가)
  if (currentScreen === 'premium-pack') {
    return (
      <div className="h-screen bg-white flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setCurrentScreen('drawing-menu')}>
              ← 뒤로
            </Button>
            <h1 className="text-xl font-bold">드로잉 프리미엄 팩</h1>
            <div className="w-16"></div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-6">
          <div className="text-center">
            <Brush className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">인지 강화 드로잉</h2>
            <p className="text-gray-600">창의적 드로잉으로 두뇌 건강을 체계적으로 관리하세요</p>
          </div>

          <div className="space-y-4">
            {drawingPacks.map(pack => (
              <Card key={pack.id} className={pack.purchased ? 'border-green-200 bg-green-50' : 'border-2 border-blue-200'}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      pack.purchased ? 'bg-green-600' : pack.type === 'coloring' ? 'bg-purple-500' : 'bg-blue-500'
                    }`}>
                      {pack.purchased ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : pack.type === 'coloring' ? (
                        <Image className="w-8 h-8 text-white" />
                      ) : (
                        <Brush className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold">{pack.name}</h3>
                          {pack.purchased && <Badge className="bg-green-600 mt-1">구매완료</Badge>}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">₩{pack.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{pack.description}</p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge variant="outline">{pack.category}</Badge>
                        <Badge variant="outline">{pack.type === 'coloring' ? '컬러링' : '자유드로잉'}</Badge>
                        <span className="text-sm text-gray-600">{pack.levels}개 레벨</span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">포함된 주제:</p>
                        <div className="flex flex-wrap gap-2">
                          {pack.samples.map((sample, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-3 py-1 rounded-full">{sample}</span>
                          ))}
                        </div>
                      </div>
                      
                      <ul className="space-y-1 text-sm text-gray-600 mb-4">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          {pack.levels}개 단계별 난이도 조절
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          상세한 진행도 분석
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          {pack.type === 'coloring' ? 'AI 사진 변환 기능' : '단계별 가이드 제공'}
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          무제한 재플레이
                        </li>
                      </ul>
                      
                      {!pack.purchased && (
                        <Button 
                          className="w-full" 
                          onClick={() => {
                            purchaseDrawingPack(pack.id);
                          }}
                        >
                          구매하기
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>💡 안내:</strong> 구매한 팩은 언제든지 이용할 수 있으며, 
              가족과 함께 공유할 수 있습니다. 모든 구매는 안전하게 보호됩니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 게임 프리미엄 팩 구매 화면 (추가)
  if (currentScreen === 'game-premium-pack') {
    return (
      <div className="h-screen bg-white flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setCurrentScreen('game-menu')}>
              ← 뒤로
            </Button>
            <h1 className="text-xl font-bold">게임 프리미엄 팩</h1>
            <div className="w-16"></div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-6">
          <div className="text-center">
            <Crown className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">인지 강화 게임팩</h2>
            <p className="text-gray-600">전문 미니게임으로 두뇌 능력을 체계적으로 향상시켜보세요</p>
          </div>

          <div className="space-y-4">
            {gamePacks.map(pack => (
              <Card key={pack.id} className={pack.purchased ? 'border-green-200 bg-green-50' : 'border-2 border-purple-200'}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      pack.purchased ? 'bg-green-600' : 'bg-gradient-to-br from-yellow-400 to-orange-500'
                    }`}>
                      {pack.purchased ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : (
                        <Crown className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold">{pack.name}</h3>
                          {pack.purchased && <Badge className="bg-green-600 mt-1">구매완료</Badge>}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600">₩{pack.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{pack.description}</p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge variant="outline">{pack.category}</Badge>
                        <span className="text-sm text-gray-600">{pack.games}개 게임</span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">포함된 게임:</p>
                        <p className="text-sm text-blue-600">{pack.preview}</p>
                      </div>
                      
                      <ul className="space-y-1 text-sm text-gray-600 mb-4">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          {pack.games}개 전문 인지 훈련 게임
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          개인 맞춤형 난이도 조절
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          상세 인지 능력 분석 리포트
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          무제한 도전 및 재플레이
                        </li>
                      </ul>
                      
                      {!pack.purchased && (
                        <Button 
                          className="w-full" 
                          onClick={() => {
                            purchaseGamePack(pack.id);
                          }}
                        >
                          구매하기
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              <strong>🎯 안내:</strong> 구매한 게임팩은 언제든지 이용할 수 있으며, 
              개인별 인지 능력 분석과 맞춤형 추천을 제공합니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 리더보드 화면 (추가)
  if (currentScreen === 'leaderboard') {
    return (
      <div className="h-screen bg-white flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setCurrentScreen('game-menu')}>
              ← 뒤로
            </Button>
            <h1 className="text-xl font-bold">순위표</h1>
            <div className="flex items-center space-x-1 bg-red-100 px-3 py-1 rounded-full">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-600">{hearts}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-6">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">메모리 매치 순위표</h2>
            <p className="text-gray-600">오늘의 최고 기록을 확인해보세요</p>
          </div>

          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="font-medium mb-2">나의 순위</h3>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">4위</p>
                    <p className="text-sm text-gray-600">현재 순위</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{formatTime(gameCompletionTime)}</p>
                    <p className="text-sm text-gray-600">내 기록</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">1850</p>
                    <p className="text-sm text-gray-600">점수</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>전체 순위</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboardData.map((entry, index) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.isMe ? 'bg-blue-100 border-2 border-blue-300' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        entry.rank === 1 ? 'bg-yellow-500 text-white' :
                        entry.rank === 2 ? 'bg-gray-400 text-white' :
                        entry.rank === 3 ? 'bg-orange-600 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {entry.rank}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${entry.isMe ? 'text-blue-800' : 'text-gray-900'}`}>
                            {entry.name}
                          </span>
                          {entry.isMe && <Badge variant="secondary" className="text-xs">나</Badge>}
                        </div>
                        <p className="text-sm text-gray-600">{entry.score}점</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatTime(entry.time || 0)}</p>
                      <p className="text-xs text-gray-500">완료 시간</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">통계</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-blue-600">{formatTime(averageCompletionTime)}</p>
                  <p className="text-sm text-gray-600">전체 평균</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">124</p>
                  <p className="text-sm text-gray-600">오늘 참여자</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="p-4">
          <Button
            onClick={() => setCurrentScreen('game-play')}
            className="w-full h-12 text-lg"
          >
            <Repeat className="w-5 h-5 mr-2" />
            다시 도전하기
          </Button>
        </div>
      </div>
    );
  }

  // 드로잉 캔버스 화면
  if (currentScreen === 'drawing-canvas') {
    return (
      <div className="h-screen bg-gray-100 flex flex-col">
        {/* 상단 컨트롤 */}
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setCurrentScreen('drawing-guide')}>
              ← 돌아가기
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-600">나의 정원</p>
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">3:42</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Redo className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 캔버스 영역 */}
        <div className="flex-1 bg-white m-4 rounded-lg shadow-sm border-2 border-dashed border-gray-300 relative overflow-hidden">
          <svg
            className="w-full h-full"
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              setDrawingPath(`M ${x} ${y}`);
            }}
            onMouseMove={(e) => {
              if (e.buttons === 1) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setDrawingPath(prev => `${prev} L ${x} ${y}`);
              }
            }}
          >
            {drawingPath && (
              <path
                d={drawingPath}
                stroke="#2563eb"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            
            {/* 샘플 드로잉 */}
            <circle cx="100" cy="150" r="30" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
            <rect x="50" y="200" width="100" height="80" fill="#10b981" stroke="#059669" strokeWidth="2" />
            <path d="M 200 180 Q 220 160 240 180 Q 260 200 280 180" stroke="#ef4444" strokeWidth="3" fill="none" />
            <text x="160" y="250" fontSize="12" fill="#6b7280">꽃</text>
          </svg>
          
          <div className="absolute bottom-4 left-4 text-sm text-gray-500">
            화면을 터치하고 드래그해서 그려보세요
          </div>
        </div>

        {/* 하단 도구 */}
        <div className="bg-white p-4 border-t">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="outline" className="w-12 h-12 rounded-full bg-black"></Button>
              <Button variant="outline" className="w-12 h-12 rounded-full bg-red-500"></Button>
              <Button variant="outline" className="w-12 h-12 rounded-full bg-blue-500"></Button>
              <Button variant="outline" className="w-12 h-12 rounded-full bg-green-500"></Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => {
                  setDailyProgress(prev => ({ ...prev, drawing: true }));
                  setCurrentScreen('drawing-complete');
                }}
                className="px-8"
              >
                완료
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 주간 리포트 화면
  if (currentScreen === 'weekly-report') {
    return (
      <div className="mobile-h-screen bg-white flex flex-col">
        {/* 헤더 - 고정 */}
        <div className="p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setCurrentScreen('home')}>
              ← 뒤로
            </Button>
            <h1 className="text-xl font-bold">인지 건강 리포트</h1>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 콘텐츠 영역 - 스크롤 가능 */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto pb-20">
          {/* 전체 인지 점수 */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">이번 주 인지 점수</h2>
                <div className="text-4xl font-bold text-blue-600 mb-2">87점</div>
                <div className="flex items-center justify-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">+5점 향상</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg text-center">
                  <p className="text-xl font-bold text-blue-600">{cognitiveData.drawingSpeed}%</p>
                  <p className="text-sm text-gray-600">드로잉 속도</p>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <p className="text-xl font-bold text-green-600">{cognitiveData.memoryScore}%</p>
                  <p className="text-sm text-gray-600">기억력 점수</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 상세 인지 분석 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>상세 인지 분석</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">손 안정성</span>
                    <span className="text-sm text-gray-600">{cognitiveData.handStability}%</span>
                  </div>
                  <Progress value={cognitiveData.handStability} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">집중 지속시간</span>
                    <span className="text-sm text-gray-600">{cognitiveData.attentionSpan}%</span>
                  </div>
                  <Progress value={cognitiveData.attentionSpan} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">공간 인지능력</span>
                    <span className="text-sm text-gray-600">{cognitiveData.spatialAwareness}%</span>
                  </div>
                  <Progress value={cognitiveData.spatialAwareness} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">반응 속도</span>
                    <span className="text-sm text-gray-600">{cognitiveData.gameReactionTime}초</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 이번 주 활동 요약 */}
          <Card>
            <CardHeader>
              <CardTitle>이번 주 활동 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">5일</p>
                  <p className="text-sm text-gray-600">미션 완료</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">47분</p>
                  <p className="text-sm text-gray-600">총 활동시간</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">이번 주 하이라이트</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• 드로잉 완료율: 100% (7/7일)</li>
                  <li>• 손떨림 개선: 이전 주 대비 12% 향상</li>
                  <li>• 게임 평균 점수: 850점 (+50점 향상)</li>
                  <li>• 집중 지속시간: 평균 6.5분 (+30초 연장)</li>
                  <li>• 가장 좋았던 날: 수요일 (완벽한 점수!)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 추천 사항 */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3 flex items-center space-x-2">
                <Brain className="w-5 h-5 text-green-600" />
                <span>AI 맞춤 추천</span>
              </h3>
              <div className="space-y-2 text-sm">
                <p>📈 <strong>집중력이 향상되고 있어요!</strong> 계속 이대로 유지해보세요.</p>
                <p>🎨 추천 드로잉: 세밀한 패턴 그리기로 손 안정성을 더 높여보세요.</p>
                <p>🧩 추천 게임: 공간 퍼즐 게임으로 공간 인지능력을 강화해보세요.</p>
              </div>
            </CardContent>
          </Card>

          {/* 가족 공유 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">가족과 공유하기</h3>
                <Switch />
              </div>
              <p className="text-sm text-gray-600">
                가족에게 이번 주 인지 건강 요약을 공유할 수 있어요. 언제든 해제할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          {/* 의료 고지 */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>안내:</strong> 이 리포트는 생활형 변화 요약이며, 의료 진단이나 치료 목적이 아닙니다. 
              인지 건강에 대한 의학적 조언이 필요한 경우 전문의와 상담하세요.
            </p>
          </div>
        </div>

        <NavigationBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>
    );
  }

  // 설정 화면
  if (currentScreen === 'settings') {
    return (
      <div className="mobile-h-screen bg-white flex flex-col">
        {/* 헤더 - 고정 */}
        <div className="p-4 border-b flex-shrink-0">
          <h1 className="text-xl font-bold text-center">설정</h1>
        </div>

        {/* 콘텐츠 영역 - 스크롤 가능 */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-20">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">사용자</p>
                  <p className="text-sm text-gray-600">{points}포인트 • {streak}일 연속</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start h-12" onClick={() => setShowAccessibilitySettings(true)}>
              <Eye className="w-5 h-5 mr-3" />
              접근성 설정
            </Button>
            
            <Button variant="ghost" className="w-full justify-start h-12">
              <Volume2 className="w-5 h-5 mr-3" />
              알림 설정
            </Button>
            
            <Button variant="ghost" className="w-full justify-start h-12">
              <Star className="w-5 h-5 mr-3" />
              구독 관리
            </Button>
            
            <Button variant="ghost" className="w-full justify-start h-12">
              <Settings className="w-5 h-5 mr-3" />
              데이터 관리
            </Button>
          </div>

          <div className="pt-4 border-t">
            <Button variant="ghost" className="w-full justify-start h-12 text-gray-600">
              도움말
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 text-gray-600">
              개인정보처리방침
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 text-red-600">
              로그아웃
            </Button>
          </div>
        </div>

        <NavigationBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />

        {showAccessibilitySettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h3 className="text-xl font-bold mb-6">접근성 설정</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2">글자 크기</label>
                  <Slider
                    value={[accessibilitySettings.fontSize]}
                    onValueChange={(value) => setAccessibilitySettings(prev => ({ ...prev, fontSize: value[0] }))}
                    min={16}
                    max={24}
                    step={2}
                    className="w-full"
                  />
                  <div className="text-center mt-2" style={{ fontSize: `${accessibilitySettings.fontSize}px` }}>
                    미리보기 텍스트
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="font-medium">고대비 모드</label>
                  <Switch
                    checked={accessibilitySettings.highContrast}
                    onCheckedChange={(checked) => setAccessibilitySettings(prev => ({ ...prev, highContrast: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="font-medium">음성 안내</label>
                  <Switch
                    checked={accessibilitySettings.voiceGuide}
                    onCheckedChange={(checked) => setAccessibilitySettings(prev => ({ ...prev, voiceGuide: checked }))}
                  />
                </div>
              </div>

              <Button
                onClick={() => setShowAccessibilitySettings(false)}
                className="w-full mt-6"
              >
                확인
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 게임 완료 화면 (별도 컴포넌트 사용)
  if (currentScreen === 'game-complete') {
    return (
      <GameCompleteScreen
        gameCompletionTime={gameCompletionTime}
        averageCompletionTime={averageCompletionTime}
        leaderboardData={leaderboardData}
        onNavigate={setCurrentScreen}
      />
    );
  }

  // 게임 플레이 화면
  if (currentScreen === 'game-play') {
    const gameCards: GameCard[] = [
      { id: 1, symbol: '🌸', flipped: false, matched: false, artPiece: '0' },
      { id: 2, symbol: '🌸', flipped: false, matched: false, artPiece: '1' },
      { id: 3, symbol: '🌿', flipped: false, matched: false, artPiece: '2' },
      { id: 4, symbol: '🌿', flipped: false, matched: false, artPiece: '3' },
      { id: 5, symbol: '🌺', flipped: false, matched: false, artPiece: '4' },
      { id: 6, symbol: '🌺', flipped: false, matched: false, artPiece: '5' },
      { id: 7, symbol: '🍀', flipped: false, matched: false, artPiece: '6' },
      { id: 8, symbol: '🍀', flipped: false, matched: false, artPiece: '7' },
    ];

    return (
      <div className="h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setCurrentScreen('game-start')}>
              ← 돌아가기
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-600">몬드리안 명화 퍼즐</p>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{Math.floor(gameState.timeLeft / 60)}:{(gameState.timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">점수: {gameState.score}</span>
                </div>
              </div>
            </div>
            <div className="w-16"></div>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">몬드리안의 "빨강, 파랑, 노랑의 구성" 조각들을 매치하세요</p>
          </div>
          
          <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
            {gameCards.map((card) => (
              <div
                key={card.id}
                className="aspect-square rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all border-2 border-white overflow-hidden"
                style={{ minHeight: '80px', minWidth: '80px' }}
              >
                {card.flipped || card.matched ? (
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <span className="text-2xl">{card.symbol}</span>
                  </div>
                ) : (
                  <div 
                    className="w-full h-full"
                    style={parseMondrianStyle(getMondrianPieceStyle(parseInt(card.artPiece)))}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">같은 그림 카드 2개를 찾아 터치하세요</p>
            <p className="text-sm text-purple-600 mt-2">
              🎨 각 카드는 몬드리안의 명작 "빨강, 파랑, 노랑의 구성"의 한 조각입니다
            </p>
          </div>
        </div>

        <div className="p-4">
          <Button
            onClick={() => {
              setDailyProgress(prev => ({ ...prev, game: true }));
              setCurrentScreen('game-complete');
            }}
            variant="outline"
            className="w-full"
          >
            게임 종료
          </Button>
        </div>
      </div>
    );
  }

  // 게임 시작 화면
  if (currentScreen === 'game-start') {
    return (
      <div className="h-screen bg-white flex flex-col">
        <div className="p-4 border-b">
          <Button variant="ghost" onClick={() => setCurrentScreen('home')}>
            ← 뒤로
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <Brain className="w-20 h-20 text-purple-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">오늘의 미니게임</h2>
            <p className="text-lg text-gray-600 mb-6">
              명화 퍼즐 게임으로 두뇌를 활성화해보세요!
            </p>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <p className="text-lg font-medium text-purple-900">메모리 매치</p>
              <p className="text-purple-600 mt-2">몬드리안의 "빨강, 파랑, 노랑의 구성" 조각 맞추기</p>
            </div>
            
            <div className="text-sm text-gray-500 space-y-1">
              <p>• 5-7분 정도 소요됩니다</p>
              <p>• 같은 그림을 찾아 매치하세요</p>
              <p>• 기하학적 명화의 아름다운 조각들을 감상해보세요</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Button
            onClick={() => setCurrentScreen('game-play')}
            className="w-full h-14 text-lg"
          >
            게임 시작하기
          </Button>
        </div>
      </div>
    );
  }

  // 게임 메뉴 화면
  if (currentScreen === 'game-menu') {
    return (
      <div className="mobile-h-screen bg-white flex flex-col">
        {/* 헤더 - 고정 */}
        <div className="p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">게임 센터</h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-red-100 px-3 py-1 rounded-full">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">{hearts}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('leaderboard')}>
                <BarChart3 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* 콘텐츠 영역 - 스크롤 가능 */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-20">
          <div>
            <h3 className="font-medium mb-3">인지 강화 게임</h3>
            <div className="grid grid-cols-2 gap-3">
              {gameTypes.map(game => (
                <Card 
                  key={game.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedGame(game.id);
                    setCurrentScreen('game-detail');
                  }}
                >
                  <CardContent className="p-3">
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-lg ${game.color} flex items-center justify-center text-white mx-auto mb-2`}>
                        {game.icon}
                      </div>
                      <h4 className="font-medium text-sm">{game.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">{game.description}</p>
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        <span className="text-xs text-green-600">오늘: ✓</span>
                        <span className="text-xs text-gray-500">5/7</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">이번 주 인지 성과</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-purple-600">15</p>
                  <p className="text-xs text-gray-600">총 게임 수</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">2:15</p>
                  <p className="text-xs text-gray-600">평균 시간</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-xs text-gray-600">평균 정확도</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="font-medium mb-3">프리미엄 게임 팩</h3>
            <div className="space-y-3">
              {gamePacks.slice(0, 2).map(pack => (
                <Card key={pack.id} className={pack.purchased ? 'border-green-200 bg-green-50' : 'hover:shadow-md transition-shadow'}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          pack.purchased ? 'bg-green-600' : 'bg-gradient-to-br from-yellow-400 to-orange-500'
                        }`}>
                          {pack.purchased ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : (
                            <Crown className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{pack.name}</h4>
                          <p className="text-sm text-gray-600">{pack.description}</p>
                          <p className="text-xs text-blue-600 mt-1">{pack.preview}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {pack.purchased ? (
                          <Button size="sm">플레이</Button>
                        ) : (
                          <div>
                            <p className="text-lg font-bold text-blue-600">₩{pack.price.toLocaleString()}</p>
                            <Button size="sm" onClick={() => setCurrentScreen('game-premium-pack')}>
                              구매
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <NavigationBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>
    );
  }

  // 게임 상세 화면
  if (currentScreen === 'game-detail') {
    const game = gameTypes.find(g => g.id === selectedGame);
    const gameDetails = getGameDetails(selectedGame);
    
    if (!game || !gameDetails) {
      return <div>게임을 찾을 수 없습니다.</div>;
    }

    return (
      <div className="mobile-h-screen bg-white flex flex-col">
        {/* 헤더 - 고정 */}
        <div className="p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setCurrentScreen('game-menu')}>
              ← 뒤로
              </Button>
            <h1 className="text-xl font-bold">{game.name}</h1>
            <div className="flex items-center space-x-1 bg-red-100 px-3 py-1 rounded-full">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-600">{hearts}</span>
            </div>
          </div>
        </div>

        {/* 콘텐츠 영역 - 스크롤 가능 */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto pb-20">
          <Card className={`border-2 ${game.color.replace('bg-', 'border-').replace('-500', '-200')} ${game.color.replace('bg-', 'bg-').replace('-500', '-50')}`}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-16 h-16 rounded-lg ${game.color} flex items-center justify-center text-white`}>
                  {game.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{game.name}</h2>
                  <p className="text-gray-600">{game.description}</p>
                </div>
              </div>
              <p className="text-gray-700">{gameDetails.fullDescription}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>나의 기록</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{gameDetails.myBestScore}</p>
                  <p className="text-sm text-gray-600">최고 점수</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{gameDetails.weeklyAvg}</p>
                  <p className="text-sm text-gray-600">주간 평균</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{gameDetails.completionRate}%</p>
                  <p className="text-sm text-gray-600">완료율</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">평균 플레이 시간: <span className="font-medium">{gameDetails.avgTime}</span></p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>인지 강화 효과</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gameDetails.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>난이도 선택</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gameDetails.difficulty.map((level, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <span className="text-gray-700">{level}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="p-4 space-y-3">
          <Button
            onClick={() => setCurrentScreen('game-start')}
            className="w-full h-12 text-lg"
          >
            지금 플레이하기
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentScreen('game-menu')}
            className="w-full h-12 text-lg"
          >
            다른 게임 보기
          </Button>
        </div>
      </div>
    );
  }

  // 나머지 간단한 화면들은 그대로 유지
  if (currentScreen === 'drawing-guide') {
    return (
      <div className="h-screen bg-white flex flex-col">
        <div className="p-4 border-b">
          <Button variant="ghost" onClick={() => setCurrentScreen('home')}>
            ← 뒤로
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <Palette className="w-20 h-20 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">오늘의 드로잉</h2>
            <p className="text-lg text-gray-600 mb-6">
              제시된 주제에 따라 자유롭게 그려보세요. 정답은 없어요!
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-lg font-medium text-blue-900">오늘의 주제</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">"나의 정원"</p>
            </div>
            
            <div className="text-sm text-gray-500 space-y-1">
              <p>• 3-5분 정도 소요됩니다</p>
              <p>• 실수해도 괜찮아요, 되돌리기가 가능해요</p>
              <p>• 완성도보다 과정이 중요해요</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Button
            onClick={() => setCurrentScreen('drawing-canvas')}
            className="w-full h-14 text-lg"
          >
            그리기 시작하기
          </Button>
        </div>
      </div>
    );
  }

  if (currentScreen === 'drawing-complete') {
    return (
      <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">잘하셨어요!</h2>
          <p className="text-lg text-gray-600 mb-8">
            오늘의 드로잉 미션을 완료했습니다.<br />
            이제 미니게임을 해볼까요?
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <h3 className="font-medium mb-3">오늘의 드로잉 분석</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-blue-600">4:12</p>
                <p className="text-sm text-gray-600">완료 시간</p>
              </div>
              <div>
                <p className="text-xl font-bold text-green-600">92%</p>
                <p className="text-sm text-gray-600">완성도</p>
              </div>
              <div>
                <p className="text-xl font-bold text-purple-600">85%</p>
                <p className="text-sm text-gray-600">손 안정성</p>
              </div>
              <div>
                <p className="text-xl font-bold text-orange-600">+50</p>
                <p className="text-sm text-gray-600">포인트</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <Button
            onClick={() => setCurrentScreen('game-start')}
            className="w-full h-12 text-lg"
          >
            미니게임 시작하기
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentScreen('home')}
            className="w-full h-12 text-lg"
          >
            나중에 하기
          </Button>
        </div>
      </div>
    );
  }

  if (currentScreen === 'reward') {
    return (
      <div className="h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">+1</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">축하합니다!</h2>
          <p className="text-lg text-gray-600 mb-8">
            오늘의 모든 미션을 완료했습니다
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">획득한 포인트</span>
                <span className="text-xl font-bold text-blue-600">+100</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">연속 달성</span>
                <span className="text-xl font-bold text-green-600">{streak}일 연속</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border-2 border-purple-200">
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-6 h-6 text-purple-600" />
                <span className="font-bold text-purple-800">일일 목표 달성 배지</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <Button
            onClick={() => setCurrentScreen('home')}
            className="w-full h-12 text-lg"
          >
            홈으로 돌아가기
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentScreen('weekly-report')}
            className="w-full h-12 text-lg"
          >
            주간 리포트 보기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <p className="text-gray-500">화면을 구현 중입니다...</p>
    </div>
  );
}