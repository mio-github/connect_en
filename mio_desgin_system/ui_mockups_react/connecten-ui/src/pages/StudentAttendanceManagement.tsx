import React, { useState } from 'react'

interface Student {
  id: string
  name: string
  avatar?: string
  membershipType: string
  enrolledClasses: string[]
  attendanceRate: number
  lastAttendance: string
  phone: string
  email: string
}

interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  className: string
  instructor: string
  date: string
  time: string
  status: 'present' | 'absent' | 'late' | 'excused'
  note?: string
}

interface ClassSession {
  id: string
  className: string
  instructor: string
  date: string
  time: string
  studio: string
  capacity: number
  enrolled: number
  attendees: number
  status: 'upcoming' | 'ongoing' | 'completed'
}

const StudentAttendanceManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('today')
  const [selectedClass, setSelectedClass] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null)

  // サンプルデータ
  const students: Student[] = [
    {
      id: 'std001',
      name: '田中 美咲',
      avatar: '/api/placeholder/40/40',
      membershipType: '月8回コース',
      enrolledClasses: ['ヒップホップ初級', 'ジャズダンス'],
      attendanceRate: 92.5,
      lastAttendance: '2024-01-15',
      phone: '090-1234-5678',
      email: 'tanaka@example.com'
    },
    {
      id: 'std002',
      name: '佐藤 健太',
      membershipType: '月4回コース',
      enrolledClasses: ['ストリートダンス'],
      attendanceRate: 78.3,
      lastAttendance: '2024-01-12',
      phone: '090-2345-6789',
      email: 'sato@example.com'
    },
    {
      id: 'std003',
      name: '山田 花子',
      membershipType: '無制限コース',
      enrolledClasses: ['バレエ基礎', 'ヨガ', 'ピラティス'],
      attendanceRate: 95.7,
      lastAttendance: '2024-01-16',
      phone: '090-3456-7890',
      email: 'yamada@example.com'
    }
  ]

  const todaySessions: ClassSession[] = [
    {
      id: 'ses001',
      className: 'ヒップホップ初級',
      instructor: '佐藤 健太',
      date: '2024-01-16',
      time: '19:00-20:00',
      studio: 'Studio A',
      capacity: 15,
      enrolled: 12,
      attendees: 0,
      status: 'upcoming'
    },
    {
      id: 'ses002',
      className: 'バレエ基礎',
      instructor: '山田 花子',
      date: '2024-01-16',
      time: '20:15-21:45',
      studio: 'Studio B',
      capacity: 20,
      enrolled: 18,
      attendees: 16,
      status: 'ongoing'
    },
    {
      id: 'ses003',
      className: 'ジャズダンス',
      instructor: '高橋 真一',
      date: '2024-01-16',
      time: '18:00-19:00',
      studio: 'Studio A',
      capacity: 15,
      enrolled: 14,
      attendees: 13,
      status: 'completed'
    }
  ]

  const recentAttendance: AttendanceRecord[] = [
    {
      id: 'att001',
      studentId: 'std001',
      studentName: '田中 美咲',
      className: 'ヒップホップ初級',
      instructor: '佐藤 健太',
      date: '2024-01-15',
      time: '19:00',
      status: 'present'
    },
    {
      id: 'att002',
      studentId: 'std002',
      studentName: '佐藤 健太',
      className: 'ストリートダンス',
      instructor: '田中 太郎',
      date: '2024-01-15',
      time: '20:00',
      status: 'late',
      note: '15分遅刻'
    },
    {
      id: 'att003',
      studentId: 'std003',
      studentName: '山田 花子',
      className: 'バレエ基礎',
      instructor: '山田 花子',
      date: '2024-01-15',
      time: '18:30',
      status: 'absent',
      note: '体調不良による欠席連絡あり'
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      present: { label: '出席', class: 'status-present' },
      absent: { label: '欠席', class: 'status-absent' },
      late: { label: '遅刻', class: 'status-late' },
      excused: { label: '公欠', class: 'status-excused' },
      upcoming: { label: '開始前', class: 'status-upcoming' },
      ongoing: { label: '進行中', class: 'status-ongoing' },
      completed: { label: '終了', class: 'status-completed' }
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <span className={`status-badge ${config.class}`}>{config.label}</span>
  }

  const handleMarkAttendance = (session: ClassSession) => {
    setSelectedSession(session)
    setShowAttendanceModal(true)
  }

  const getAttendanceRateClass = (rate: number) => {
    if (rate >= 90) return 'rate-excellent'
    if (rate >= 80) return 'rate-good'
    if (rate >= 70) return 'rate-warning'
    return 'rate-danger'
  }

  return (
    <div className="attendance-management">
      {/* ヘッダー */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <i className="fas fa-user-check"></i>
            出席管理
          </h1>
          <p className="page-description">生徒の出席状況を管理し、出席率を追跡します</p>
        </div>

        <div className="header-actions">
          <button className="action-btn export-btn">
            <i className="fas fa-download"></i>
            出席データエクスポート
          </button>
          <button className="action-btn refresh-btn">
            <i className="fas fa-sync-alt"></i>
            更新
          </button>
        </div>
      </div>

      {/* サマリーカード */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="card-content">
            <div className="card-value">847</div>
            <div className="card-label">総生徒数</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon present">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="card-content">
            <div className="card-value">29</div>
            <div className="card-label">今日の出席者</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">
            <i className="fas fa-percentage"></i>
          </div>
          <div className="card-content">
            <div className="card-value">87.3%</div>
            <div className="card-label">今日の出席率</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon warning">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="card-content">
            <div className="card-value">8</div>
            <div className="card-label">出席率低下者</div>
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${selectedTab === 'today' ? 'active' : ''}`}
          onClick={() => setSelectedTab('today')}
        >
          <i className="fas fa-calendar-day"></i>
          今日のクラス
        </button>
        <button
          className={`tab-btn ${selectedTab === 'students' ? 'active' : ''}`}
          onClick={() => setSelectedTab('students')}
        >
          <i className="fas fa-users"></i>
          生徒出席状況
        </button>
        <button
          className={`tab-btn ${selectedTab === 'history' ? 'active' : ''}`}
          onClick={() => setSelectedTab('history')}
        >
          <i className="fas fa-history"></i>
          出席履歴
        </button>
        <button
          className={`tab-btn ${selectedTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setSelectedTab('analytics')}
        >
          <i className="fas fa-chart-bar"></i>
          出席分析
        </button>
      </div>

      {/* コンテンツエリア */}
      <div className="content-area">
        {selectedTab === 'today' && (
          <div className="today-classes">
            <div className="section-header">
              <h3>今日のクラス一覧</h3>
              <div className="filters">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="all">すべてのクラス</option>
                  <option value="upcoming">開始前</option>
                  <option value="ongoing">進行中</option>
                  <option value="completed">終了</option>
                </select>
              </div>
            </div>

            <div className="classes-grid">
              {todaySessions.map(session => (
                <div key={session.id} className="class-card">
                  <div className="class-header">
                    <h4 className="class-name">{session.className}</h4>
                    {getStatusBadge(session.status)}
                  </div>

                  <div className="class-info">
                    <div className="info-row">
                      <i className="fas fa-user-tie"></i>
                      <span>講師: {session.instructor}</span>
                    </div>
                    <div className="info-row">
                      <i className="fas fa-clock"></i>
                      <span>時間: {session.time}</span>
                    </div>
                    <div className="info-row">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>場所: {session.studio}</span>
                    </div>
                  </div>

                  <div className="attendance-stats">
                    <div className="stat-item">
                      <span className="stat-label">登録者数</span>
                      <span className="stat-value">{session.enrolled}/{session.capacity}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">出席者数</span>
                      <span className="stat-value">{session.attendees}/{session.enrolled}</span>
                    </div>
                    <div className="attendance-rate">
                      <span className="rate-label">出席率</span>
                      <span className="rate-value">
                        {session.enrolled > 0 ? Math.round((session.attendees / session.enrolled) * 100) : 0}%
                      </span>
                    </div>
                  </div>

                  <div className="class-actions">
                    <button
                      className="action-btn mark-attendance"
                      onClick={() => handleMarkAttendance(session)}
                      disabled={session.status === 'upcoming'}
                    >
                      <i className="fas fa-check"></i>
                      出席確認
                    </button>
                    <button className="action-btn view-details">
                      <i className="fas fa-list"></i>
                      詳細
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'students' && (
          <div className="students-attendance">
            <div className="section-header">
              <h3>生徒出席状況</h3>
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="生徒名で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="students-list">
              {students.map(student => (
                <div key={student.id} className="student-card">
                  <div className="student-header">
                    <div className="student-info">
                      {student.avatar && (
                        <img src={student.avatar} alt="" className="student-avatar" />
                      )}
                      <div className="student-details">
                        <h4 className="student-name">{student.name}</h4>
                        <p className="membership-type">{student.membershipType}</p>
                      </div>
                    </div>
                    <div className={`attendance-rate ${getAttendanceRateClass(student.attendanceRate)}`}>
                      <span className="rate-value">{student.attendanceRate}%</span>
                      <span className="rate-label">出席率</span>
                    </div>
                  </div>

                  <div className="student-stats">
                    <div className="stat-row">
                      <span className="stat-label">履修クラス:</span>
                      <div className="class-tags">
                        {student.enrolledClasses.map((className, index) => (
                          <span key={index} className="class-tag">{className}</span>
                        ))}
                      </div>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">最終出席:</span>
                      <span className="stat-value">{student.lastAttendance}</span>
                    </div>
                  </div>

                  <div className="student-actions">
                    <button className="action-btn view-history">
                      <i className="fas fa-history"></i>
                      出席履歴
                    </button>
                    <button className="action-btn contact">
                      <i className="fas fa-phone"></i>
                      連絡
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'history' && (
          <div className="attendance-history">
            <div className="section-header">
              <h3>出席履歴</h3>
              <div className="date-filters">
                <input type="date" />
                <span>〜</span>
                <input type="date" />
                <button className="filter-btn">絞り込み</button>
              </div>
            </div>

            <div className="history-table">
              <div className="table-header">
                <div className="header-cell">日時</div>
                <div className="header-cell">生徒名</div>
                <div className="header-cell">クラス</div>
                <div className="header-cell">講師</div>
                <div className="header-cell">出席状況</div>
                <div className="header-cell">備考</div>
              </div>
              {recentAttendance.map(record => (
                <div key={record.id} className="table-row">
                  <div className="table-cell">
                    <div className="date-time">
                      <span className="date">{record.date}</span>
                      <span className="time">{record.time}</span>
                    </div>
                  </div>
                  <div className="table-cell">
                    <span className="student-name">{record.studentName}</span>
                  </div>
                  <div className="table-cell">
                    <span className="class-name">{record.className}</span>
                  </div>
                  <div className="table-cell">
                    <span className="instructor-name">{record.instructor}</span>
                  </div>
                  <div className="table-cell">
                    {getStatusBadge(record.status)}
                  </div>
                  <div className="table-cell">
                    <span className="note">{record.note || '-'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="attendance-analytics">
            <div className="analytics-grid">
              <div className="analytics-card">
                <h4>出席率推移</h4>
                <div className="chart-placeholder">
                  <i className="fas fa-chart-line"></i>
                  <p>出席率の推移グラフ</p>
                </div>
              </div>

              <div className="analytics-card">
                <h4>クラス別出席率</h4>
                <div className="chart-placeholder">
                  <i className="fas fa-chart-bar"></i>
                  <p>クラス別出席率の比較</p>
                </div>
              </div>

              <div className="analytics-card">
                <h4>曜日別出席傾向</h4>
                <div className="chart-placeholder">
                  <i className="fas fa-chart-pie"></i>
                  <p>曜日別の出席傾向</p>
                </div>
              </div>

              <div className="analytics-card">
                <h4>出席率低下者</h4>
                <div className="low-attendance-list">
                  <div className="list-item">
                    <span className="student-name">田中 次郎</span>
                    <span className="rate warning">65%</span>
                  </div>
                  <div className="list-item">
                    <span className="student-name">山田 三郎</span>
                    <span className="rate danger">48%</span>
                  </div>
                  <div className="list-item">
                    <span className="student-name">佐藤 四郎</span>
                    <span className="rate warning">72%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 出席確認モーダル */}
      {showAttendanceModal && selectedSession && (
        <div className="modal-overlay">
          <div className="attendance-modal">
            <div className="modal-header">
              <h3>出席確認 - {selectedSession.className}</h3>
              <button
                className="close-btn"
                onClick={() => setShowAttendanceModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="class-info-summary">
                <p>日時: {selectedSession.date} {selectedSession.time}</p>
                <p>講師: {selectedSession.instructor}</p>
                <p>場所: {selectedSession.studio}</p>
              </div>

              <div className="attendance-list">
                <div className="list-header">
                  <span>生徒名</span>
                  <span>出席状況</span>
                  <span>操作</span>
                </div>
                {/* 実際の実装では登録済み生徒のリストを表示 */}
                <div className="attendance-item">
                  <span className="student-name">田中 美咲</span>
                  <select className="status-select">
                    <option value="present">出席</option>
                    <option value="absent">欠席</option>
                    <option value="late">遅刻</option>
                    <option value="excused">公欠</option>
                  </select>
                  <input type="text" placeholder="備考" className="note-input" />
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowAttendanceModal(false)}
              >
                キャンセル
              </button>
              <button className="save-btn">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .attendance-management {
          padding: 24px;
          background: #fafafa;
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .header-content h1 {
          font-size: 28px;
          font-weight: 700;
          color: #0d1117;
          margin: 0 0 8px 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .page-description {
          color: #6b7280;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          padding: 8px 16px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .export-btn {
          color: #059669;
          border-color: #059669;
        }

        .export-btn:hover {
          background: #ecfdf5;
        }

        .refresh-btn {
          color: #3b82f6;
          border-color: #3b82f6;
        }

        .refresh-btn:hover {
          background: #eff6ff;
        }

        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .summary-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #6b7280;
        }

        .card-icon.present {
          background: #d1fae5;
          color: #059669;
        }

        .card-icon.warning {
          background: #fef3c7;
          color: #d97706;
        }

        .card-value {
          font-size: 24px;
          font-weight: 700;
          color: #0d1117;
          line-height: 1;
          margin-bottom: 4px;
        }

        .card-label {
          font-size: 14px;
          color: #6b7280;
        }

        .tab-navigation {
          background: #ffffff;
          border-radius: 12px;
          padding: 8px;
          margin-bottom: 24px;
          display: flex;
          gap: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .tab-btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: transparent;
          color: #6b7280;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .tab-btn.active {
          background: #3b82f6;
          color: white;
        }

        .content-area {
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #0d1117;
          margin: 0;
        }

        .classes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }

        .class-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          background: #f9fafb;
          transition: all 0.2s ease;
        }

        .class-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .class-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .class-name {
          font-size: 16px;
          font-weight: 600;
          color: #0d1117;
          margin: 0;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-present {
          background: #d1fae5;
          color: #065f46;
        }

        .status-absent {
          background: #fee2e2;
          color: #dc2626;
        }

        .status-late {
          background: #fef3c7;
          color: #92400e;
        }

        .status-excused {
          background: #e0e7ff;
          color: #3730a3;
        }

        .status-upcoming {
          background: #f3f4f6;
          color: #6b7280;
        }

        .status-ongoing {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-completed {
          background: #d1fae5;
          color: #065f46;
        }

        .class-info {
          margin-bottom: 16px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          font-size: 14px;
          color: #6b7280;
        }

        .info-row i {
          width: 16px;
          color: #9ca3af;
        }

        .attendance-stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
          padding: 12px;
          background: #ffffff;
          border-radius: 6px;
        }

        .stat-item, .attendance-rate {
          text-align: center;
        }

        .stat-label, .rate-label {
          display: block;
          font-size: 11px;
          color: #9ca3af;
          margin-bottom: 4px;
        }

        .stat-value, .rate-value {
          font-weight: 600;
          color: #0d1117;
        }

        .class-actions {
          display: flex;
          gap: 8px;
        }

        .mark-attendance {
          background: #059669;
          color: white;
          border-color: #059669;
        }

        .mark-attendance:hover:not(:disabled) {
          background: #047857;
        }

        .mark-attendance:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .view-details {
          color: #3b82f6;
          border-color: #3b82f6;
        }

        .view-details:hover {
          background: #eff6ff;
        }

        .search-box {
          position: relative;
          width: 300px;
        }

        .search-box i {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-box input {
          width: 100%;
          padding: 8px 16px 8px 40px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }

        .students-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .student-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          background: #f9fafb;
        }

        .student-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .student-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .student-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .student-name {
          font-size: 16px;
          font-weight: 600;
          color: #0d1117;
          margin: 0 0 4px 0;
        }

        .membership-type {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        .attendance-rate {
          text-align: center;
          padding: 8px 12px;
          border-radius: 6px;
        }

        .rate-excellent {
          background: #d1fae5;
          color: #065f46;
        }

        .rate-good {
          background: #fef3c7;
          color: #92400e;
        }

        .rate-warning {
          background: #fed7aa;
          color: #c2410c;
        }

        .rate-danger {
          background: #fee2e2;
          color: #dc2626;
        }

        .rate-value {
          display: block;
          font-weight: 700;
          font-size: 16px;
        }

        .rate-label {
          font-size: 11px;
          opacity: 0.8;
        }

        .student-stats {
          margin-bottom: 16px;
        }

        .stat-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .stat-label {
          color: #6b7280;
          min-width: 80px;
        }

        .stat-value {
          color: #0d1117;
        }

        .class-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .class-tag {
          background: #e0e7ff;
          color: #3730a3;
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 500;
        }

        .student-actions {
          display: flex;
          gap: 8px;
        }

        .view-history {
          color: #6b7280;
          border-color: #d1d5db;
        }

        .contact {
          color: #059669;
          border-color: #059669;
        }

        .contact:hover {
          background: #ecfdf5;
        }

        .date-filters {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .date-filters input {
          padding: 6px 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 14px;
        }

        .filter-btn {
          padding: 6px 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .history-table {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .table-header, .table-row {
          display: grid;
          grid-template-columns: 120px 150px 150px 120px 100px 1fr;
          gap: 16px;
          padding: 12px 16px;
          align-items: center;
        }

        .table-header {
          background: #f9fafb;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        .table-row {
          border-bottom: 1px solid #f3f4f6;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .date-time {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .date {
          font-size: 12px;
          color: #374151;
        }

        .time {
          font-size: 11px;
          color: #9ca3af;
        }

        .note {
          font-size: 12px;
          color: #6b7280;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .analytics-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          background: #f9fafb;
        }

        .analytics-card h4 {
          font-size: 16px;
          font-weight: 600;
          color: #0d1117;
          margin: 0 0 16px 0;
        }

        .chart-placeholder {
          height: 200px;
          background: #ffffff;
          border: 2px dashed #d1d5db;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          text-align: center;
        }

        .chart-placeholder i {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .low-attendance-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #ffffff;
          border-radius: 6px;
        }

        .list-item .rate {
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
        }

        .list-item .rate.warning {
          background: #fef3c7;
          color: #92400e;
        }

        .list-item .rate.danger {
          background: #fee2e2;
          color: #dc2626;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .attendance-modal {
          background: #ffffff;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header h3 {
          margin: 0;
          color: #0d1117;
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #6b7280;
          font-size: 16px;
        }

        .modal-content {
          padding: 24px;
        }

        .class-info-summary {
          background: #f9fafb;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 20px;
        }

        .class-info-summary p {
          margin: 4px 0;
          font-size: 14px;
          color: #374151;
        }

        .attendance-list {
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          overflow: hidden;
        }

        .list-header {
          display: grid;
          grid-template-columns: 1fr 120px 1fr;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        .attendance-item {
          display: grid;
          grid-template-columns: 1fr 120px 1fr;
          gap: 12px;
          padding: 12px;
          align-items: center;
          border-bottom: 1px solid #f3f4f6;
        }

        .attendance-item:last-child {
          border-bottom: none;
        }

        .status-select, .note-input {
          padding: 4px 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 12px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px 24px;
          border-top: 1px solid #e5e7eb;
        }

        .cancel-btn {
          padding: 8px 16px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          border-radius: 6px;
          cursor: pointer;
          color: #6b7280;
          font-weight: 500;
        }

        .save-btn {
          padding: 8px 16px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .attendance-management {
            padding: 16px;
          }

          .page-header {
            flex-direction: column;
            gap: 16px;
          }

          .header-actions {
            align-self: stretch;
          }

          .summary-cards {
            grid-template-columns: repeat(2, 1fr);
          }

          .classes-grid {
            grid-template-columns: 1fr;
          }

          .tab-navigation {
            flex-direction: column;
          }

          .table-header, .table-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .section-header {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }

          .search-box {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default StudentAttendanceManagement