import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Trophy, BarChart3, Repeat } from 'lucide-react';
import { formatTime } from '../../utils/app-helpers';
import { LeaderboardEntry } from '../../constants/app-data';

interface GameCompleteScreenProps {
  gameCompletionTime: number;
  averageCompletionTime: number;
  leaderboardData: LeaderboardEntry[];
  onNavigate: (screen: string) => void;
}

export function GameCompleteScreen({ 
  gameCompletionTime, 
  averageCompletionTime, 
  leaderboardData, 
  onNavigate 
}: GameCompleteScreenProps) {
  const myRank = leaderboardData.find(entry => entry.isMe)?.rank || 4;
  const betterThanPercentage = Math.round((1 - (myRank / leaderboardData.length)) * 100);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => onNavigate('home')}>
            ← 홈으로
          </Button>
          <h1 className="text-xl font-bold">게임 완료!</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div className="text-center">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">훌륭해요!</h2>
          <p className="text-lg text-gray-600">
            몬드리안의 명화 퍼즐을 완료했습니다
          </p>
        </div>

        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">시간 기록</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">{formatTime(gameCompletionTime)}</div>
              <p className="text-sm text-gray-600">당신의 완료 시간</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-lg font-bold text-green-600">{formatTime(averageCompletionTime)}</p>
                <p className="text-xs text-gray-600">전체 평균</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-lg font-bold text-purple-600">{myRank}위</p>
                <p className="text-xs text-gray-600">현재 순위</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-center text-sm">
                {gameCompletionTime < averageCompletionTime ? (
                  <span className="text-green-600 font-medium">
                    🎉 평균보다 {formatTime(averageCompletionTime - gameCompletionTime)} 빨라요!
                  </span>
                ) : (
                  <span className="text-blue-600 font-medium">
                    👍 좋은 기록이에요! {betterThanPercentage}%의 플레이어보다 빨라요
                  </span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">상세 분석 결과</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-purple-600">850</p>
                <p className="text-sm text-gray-600">점수</p>
              </div>
              <div>
                <p className="text-xl font-bold text-green-600">92%</p>
                <p className="text-sm text-gray-600">정확도</p>
              </div>
              <div>
                <p className="text-xl font-bold text-blue-600">{formatTime(gameCompletionTime)}</p>
                <p className="text-sm text-gray-600">완료 시간</p>
              </div>
              <div>
                <p className="text-xl font-bold text-orange-600">1.2초</p>
                <p className="text-sm text-gray-600">평균 반응시간</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>오늘의 순위표</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboardData.slice(0, 5).map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    entry.isMe ? 'bg-blue-100 border-2 border-blue-300' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      entry.rank === 1 ? 'bg-yellow-500 text-white' :
                      entry.rank === 2 ? 'bg-gray-400 text-white' :
                      entry.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {entry.rank}
                    </div>
                    <span className={`font-medium ${entry.isMe ? 'text-blue-800' : 'text-gray-700'}`}>
                      {entry.name}
                    </span>
                    {entry.isMe && <Badge variant="secondary" className="text-xs">나</Badge>}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatTime(entry.time || 0)}</p>
                    <p className="text-xs text-gray-500">{entry.score}점</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Button variant="outline" size="sm" onClick={() => onNavigate('leaderboard')}>
                전체 순위표 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-white border-t space-y-3">
        <Button
          onClick={() => onNavigate('game-play')}
          className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700"
        >
          <Repeat className="w-5 h-5 mr-2" />
          다시 도전하기
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => onNavigate('reward')}
            className="h-12"
          >
            보상 받기
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate('leaderboard')}
            className="h-12"
          >
            순위표 보기
          </Button>
        </div>
      </div>
    </div>
  );
}