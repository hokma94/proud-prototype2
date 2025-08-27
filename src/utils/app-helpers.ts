export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getHomeHeaderMessage = (dailyProgress: { drawing: boolean; game: boolean }) => {
  if (!dailyProgress.drawing && !dailyProgress.game) {
    return {
      title: "오늘의 미션을 시작해보세요!",
      subtitle: "드로잉과 미니게임이 기다리고 있어요"
    };
  } else if (dailyProgress.drawing && !dailyProgress.game) {
    return {
      title: "드로잉 완료! 🎨",
      subtitle: "이제 미니게임으로 두뇌를 활성화해보세요"
    };
  } else if (!dailyProgress.drawing && dailyProgress.game) {
    return {
      title: "게임 완료! 🧩",
      subtitle: "드로잉으로 창의력을 발휘해보세요"
    };
  } else {
    return {
      title: "오늘 미션 완료! 🎉",
      subtitle: "내일도 함께 두뇌 건강을 관리해봐요"
    };
  }
};

export const getMondrianPieceStyle = (pieceIndex: number): string => {
  const artPieces = [
    `background: #dc143c; border-right: 8px solid #000; border-bottom: 8px solid #000;`,
    `background: #f5f5f5; border-bottom: 8px solid #000; border-left: 4px solid #000;`,
    `background: #0066cc; border-right: 8px solid #000; border-bottom: 4px solid #000; border-top: 4px solid #000;`,
    `background: #f5f5f5; border-left: 4px solid #000; border-bottom: 4px solid #000; border-top: 4px solid #000;`,
    `background: #ffd700; border-right: 8px solid #000; border-top: 4px solid #000; border-bottom: 8px solid #000;`,
    `background: #f5f5f5; border-left: 4px solid #000; border-top: 4px solid #000; border-bottom: 8px solid #000;`,
    `background: #f5f5f5; border-right: 8px solid #000; border-top: 4px solid #000;`,
    `background: linear-gradient(to bottom, #dc143c 0%, #dc143c 60%, #f5f5f5 60%, #f5f5f5 100%); border-left: 4px solid #000; border-top: 4px solid #000;`
  ];
  return artPieces[pieceIndex] || artPieces[0];
};

export const parseMondrianStyle = (styleString: string) => {
  const styles: any = {};
  
  if (styleString.includes('background:')) {
    const bgMatch = styleString.match(/background:\s*([^;]+);/);
    if (bgMatch) styles.background = bgMatch[1].trim();
  }
  
  if (styleString.includes('border-right:')) {
    const brMatch = styleString.match(/border-right:\s*([^;]+);/);
    if (brMatch) styles.borderRight = brMatch[1].trim();
  }
  
  if (styleString.includes('border-left:')) {
    const blMatch = styleString.match(/border-left:\s*([^;]+);/);
    if (blMatch) styles.borderLeft = blMatch[1].trim();
  }
  
  if (styleString.includes('border-top:')) {
    const btMatch = styleString.match(/border-top:\s*([^;]+);/);
    if (btMatch) styles.borderTop = btMatch[1].trim();
  }
  
  if (styleString.includes('border-bottom:')) {
    const bbMatch = styleString.match(/border-bottom:\s*([^;]+);/);
    if (bbMatch) styles.borderBottom = bbMatch[1].trim();
  }
  
  return styles;
};

export const getGameDetails = (gameId: string) => {
  const gameDetails = {
    memory: {
      fullDescription: '시각적 기억력과 집중력을 동시에 향상시키는 클래식 카드 매칭 게임입니다. 몬드리안의 아름다운 기하학적 명화 조각들을 감상하며 두뇌를 훈련하세요.',
      benefits: ['단기 기억력 향상', '시각적 인지 능력 강화', '집중력 지속시간 연장', '패턴 인식 능력 발달'],
      difficulty: ['쉬움: 4x2 카드', '보통: 4x4 카드', '어려움: 6x4 카드'],
      avgTime: '2-5분',
      myBestScore: 1850,
      weeklyAvg: 1650,
      completionRate: 92
    },
    attention: {
      fullDescription: '스트룹 효과를 활용한 집중력 강화 게임입니다. 글자의 의미와 색깔이 다를 때 올바른 답을 빠르게 선택하여 주의 집중력을 훈련합니다.',
      benefits: ['선택적 주의력 향상', '인지 유연성 강화', '반응 속도 개선', '간섭 억제 능력 발달'],
      difficulty: ['쉬움: 단색 단어', '보통: 2색 혼합', '어려움: 다색 혼합'],
      avgTime: '3-6분',
      myBestScore: 950,
      weeklyAvg: 820,
      completionRate: 88
    },
    spatial: {
      fullDescription: '3차원 공간 인지능력을 기르는 도형 퍼즐 게임입니다. 다양한 도형을 회전하고 조합하여 정확한 위치에 배치하는 훈련을 합니다.',
      benefits: ['공간 지각능력 향상', '3D 사고력 발달', '문제해결 능력 강화', '수학적 사고력 증진'],
      difficulty: ['쉬움: 2D 도형', '보통: 3D 기본', '어려움: 복합 3D'],
      avgTime: '4-8분',
      myBestScore: 2100,
      weeklyAvg: 1900,
      completionRate: 85
    },
    sudoku: {
      fullDescription: '논리적 사고력과 추론 능력을 기르는 숫자 퍼즐 게임입니다. 스도쿠와 넘버링크 등 다양한 논리 퍼즐로 체계적 사고를 훈련합니다.',
      benefits: ['논리적 사고력 향상', '추론 능력 강화', '체계적 접근법 학습', '인내심과 집중력 증진'],
      difficulty: ['쉬움: 4x4 스도쿠', '보통: 6x6 스도쿠', '어려움: 9x9 스도쿠'],
      avgTime: '5-12분',
      myBestScore: 1200,
      weeklyAvg: 1050,
      completionRate: 78
    },
    pattern: {
      fullDescription: '순서와 패턴을 기억하고 재현하는 기억력 훈련 게임입니다. 시각적, 청각적 패턴을 통해 순차 기억 능력을 향상시킵니다.',
      benefits: ['순차 기억력 향상', '패턴 인식 능력 발달', '작업 기억 용량 증가', '시퀀스 처리 능력 강화'],
      difficulty: ['쉬움: 3-4 단계', '보통: 5-7 단계', '어려움: 8-12 단계'],
      avgTime: '3-7분',
      myBestScore: 1750,
      weeklyAvg: 1580,
      completionRate: 90
    },
    connect: {
      fullDescription: '숫자를 순서대로 하나의 선으로 연결하는 공간 인지 게임입니다. 최적의 경로를 찾아 효율적으로 연결하는 능력을 기릅니다.',
      benefits: ['경로 계획 능력 향상', '시각적 추적 능력 강화', '공간 방향감각 발달', '효율성 사고 증진'],
      difficulty: ['쉬움: 1-15 연결', '보통: 1-25 연결', '어려움: 1-40 연결'],
      avgTime: '2-6분',
      myBestScore: 1950,
      weeklyAvg: 1800,
      completionRate: 87
    }
  };

  return gameDetails[gameId as keyof typeof gameDetails] || gameDetails.memory;
};