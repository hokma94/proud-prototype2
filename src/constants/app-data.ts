

export interface GameType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'memory' | 'attention' | 'spatial' | 'executive';
}

export interface DrawingPack {
  id: string;
  name: string;
  type: 'drawing' | 'coloring';
  price: number;
  levels: number;
  purchased: boolean;
  description: string;
  samples: string[];
  category: string;
}

export interface GamePack {
  id: string;
  name: string;
  price: number;
  games: number;
  purchased: boolean;
  description: string;
  category: string;
  preview: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  time?: number;
  isMe?: boolean;
}

export const gameTypes: GameType[] = [
  {
    id: 'memory',
    name: '메모리 매치',
    description: '같은 그림 카드를 찾아 매치하기',
    icon: 'Brain',
    color: 'bg-purple-500',
    category: 'memory'
  },
  {
    id: 'attention',
    name: '집중력 테스트',
    description: '색깔과 글자가 다른 단어 빠르게 판별',
    icon: 'Eye',
    color: 'bg-blue-500',
    category: 'attention'
  },
  {
    id: 'spatial',
    name: '공간 퍼즐',
    description: '도형을 회전하고 조합하여 맞추기',
    icon: 'Grid',
    color: 'bg-green-500',
    category: 'spatial'
  },
  {
    id: 'sudoku',
    name: '숫자 퍼즐',
    description: '스도쿠와 넘버링크 등 논리 퍼즐',
    icon: 'Square',
    color: 'bg-orange-500',
    category: 'executive'
  },
  {
    id: 'pattern',
    name: '패턴 인식',
    description: '순서와 패턴을 기억하고 따라하기',
    icon: 'Shuffle',
    color: 'bg-pink-500',
    category: 'memory'
  },
  {
    id: 'connect',
    name: '선 잇기',
    description: '숫자를 순서대로 하나의 선으로 연결',
    icon: 'PenTool',
    color: 'bg-indigo-500',
    category: 'spatial'
  }
];

export const initialDrawingPacks: DrawingPack[] = [
  {
    id: 'nature-therapy',
    name: '자연 치료 드로잉',
    type: 'drawing',
    price: 3900,
    levels: 40,
    purchased: false,
    description: '나무, 꽃, 동물 그리기로 스트레스 완화',
    samples: ['🌳 큰 나무', '🌸 벚꽃', '🦋 나비'],
    category: '스트레스 완화'
  },
  {
    id: 'memory-coloring',
    name: '추억 컬러링',
    type: 'coloring',
    price: 2900,
    levels: 30,
    purchased: true,
    description: '가족 사진을 컬러링북으로 변환',
    samples: ['👨‍👩‍👧‍👦 가족사진', '🏠 우리집', '🎂 생일파티'],
    category: '기억력 강화'
  },
  {
    id: 'masterpiece',
    name: '명화 따라그리기',
    type: 'drawing',
    price: 4900,
    levels: 25,
    purchased: false,
    description: '유명 화가의 작품을 단계별로 따라그리기',
    samples: ['🌻 반고흐 해바라기', '🌊 호쿠사이 파도', '🎨 몬드리안 구성'],
    category: '집중력 향상'
  },
  {
    id: 'emotion-art',
    name: '감정 표현 아트',
    type: 'drawing',
    price: 3400,
    levels: 35,
    purchased: false,
    description: '감정을 색과 형태로 표현하는 치료적 드로잉',
    samples: ['😊 기쁨', '😌 평온', '💪 힘'],
    category: '정서 조절'
  },
  {
    id: 'photo-coloring',
    name: '사진 컬러링 변환',
    type: 'coloring',
    price: 1900,
    levels: 20,
    purchased: false,
    description: '내 사진을 AI로 컬러링북 스타일로 변환',
    samples: ['📷 내 사진', '🖼️ 풍경 사진', '🐕 반려동물'],
    category: '창의력 증진'
  }
];

export const initialGamePacks: GamePack[] = [
  {
    id: 'memory-master',
    name: '기억력 마스터',
    price: 3900,
    games: 12,
    purchased: false,
    description: '단계별 기억력 훈련 게임 모음',
    category: '기억력',
    preview: '패턴 기억, 순서 기억, 공간 기억'
  },
  {
    id: 'attention-pro',
    name: '집중력 프로',
    price: 2900,
    games: 8,
    purchased: true,
    description: '주의력과 집중력 강화 게임',
    category: '주의력',
    preview: '스트룹 테스트, 빠른 반응, 선택적 주의'
  },
  {
    id: 'spatial-genius',
    name: '공간 지각 천재',
    price: 4200,
    games: 15,
    purchased: false,
    description: '3D 공간 인지와 회전 능력 향상',
    category: '공간지각',
    preview: '도형 회전, 3D 퍼즐, 공간 추론'
  },
  {
    id: 'logic-puzzle',
    name: '논리 퍼즐 컬렉션',
    price: 3500,
    games: 10,
    purchased: false,
    description: '수학적 사고와 논리력 향상',
    category: '논리사고',
    preview: '스도쿠, 넘버링크, 논리 추론'
  }
];

export const createLeaderboardData = (gameCompletionTime: number): LeaderboardEntry[] => [
  { rank: 1, name: '김철수', score: 2150, time: 98 },
  { rank: 2, name: '이영희', score: 2050, time: 112 },
  { rank: 3, name: '박민수', score: 1980, time: 128 },
  { rank: 4, name: '나', score: 1850, time: gameCompletionTime, isMe: true },
  { rank: 5, name: '정다은', score: 1720, time: 147 },
  { rank: 6, name: '최영수', score: 1680, time: 152 },
  { rank: 7, name: '한지민', score: 1650, time: 168 }
];