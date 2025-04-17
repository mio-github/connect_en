import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 既存のデータをクリアする
    await prisma.salesData.deleteMany({});
    await prisma.memberData.deleteMany({});
    await prisma.lessonData.deleteMany({});

    // 売上データのサンプルを作成
    const salesData = [
      { month: '1月', year: 2023, revenue: 1250000, expenses: 980000 },
      { month: '2月', year: 2023, revenue: 1380000, expenses: 1050000 },
      { month: '3月', year: 2023, revenue: 1420000, expenses: 1080000 },
      { month: '4月', year: 2023, revenue: 1320000, expenses: 990000 },
      { month: '5月', year: 2023, revenue: 1480000, expenses: 1100000 },
      { month: '6月', year: 2023, revenue: 1520000, expenses: 1150000 },
    ];

    // 会員データのサンプルを作成
    const memberData = [
      { month: '1月', year: 2023, newMembers: 24, totalMembers: 320, retention: 95 },
      { month: '2月', year: 2023, newMembers: 18, totalMembers: 335, retention: 94 },
      { month: '3月', year: 2023, newMembers: 22, totalMembers: 354, retention: 96 },
      { month: '4月', year: 2023, newMembers: 16, totalMembers: 368, retention: 95 },
      { month: '5月', year: 2023, newMembers: 20, totalMembers: 385, retention: 93 },
      { month: '6月', year: 2023, newMembers: 25, totalMembers: 406, retention: 94 },
    ];

    // レッスン利用データのサンプルを作成
    const lessonData = [
      { lessonId: '1', month: '6月', year: 2023, reservations: 156, attendance: 92, satisfaction: 4.7 },
      { lessonId: '2', month: '6月', year: 2023, reservations: 124, attendance: 88, satisfaction: 4.5 },
      { lessonId: '3', month: '6月', year: 2023, reservations: 98, attendance: 95, satisfaction: 4.8 },
      { lessonId: '4', month: '6月', year: 2023, reservations: 76, attendance: 90, satisfaction: 4.6 },
      { lessonId: '5', month: '6月', year: 2023, reservations: 112, attendance: 86, satisfaction: 4.4 },
    ];

    // データをデータベースに登録
    await prisma.salesData.createMany({
      data: salesData,
    });

    await prisma.memberData.createMany({
      data: memberData,
    });

    await prisma.lessonData.createMany({
      data: lessonData,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'サンプルデータを初期化しました',
      data: {
        salesData: await prisma.salesData.findMany(),
        memberData: await prisma.memberData.findMany(),
        lessonData: await prisma.lessonData.findMany(),
      }
    });
  } catch (error) {
    console.error('データ初期化エラー:', error);
    return NextResponse.json({ success: false, error: 'データの初期化に失敗しました' }, { status: 500 });
  }
} 