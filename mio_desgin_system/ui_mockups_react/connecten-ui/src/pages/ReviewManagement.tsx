import React, { useState } from 'react'

interface Review {
  id: string
  customerName: string
  customerAvatar?: string
  studioName: string
  lessonName: string
  rating: number
  title: string
  content: string
  date: string
  status: 'published' | 'pending' | 'rejected' | 'flagged'
  isVerified: boolean
  helpfulCount: number
  reportCount: number
  response?: {
    content: string
    author: string
    date: string
  }
}

interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: { [key: number]: number }
  pendingReviews: number
  flaggedReviews: number
}

const ReviewManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showResponseModal, setShowResponseModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [responseText, setResponseText] = useState('')

  // Sample review data
  const reviews: Review[] = [
    {
      id: 'rev001',
      customerName: '田中 美咲',
      customerAvatar: '/api/placeholder/32/32',
      studioName: 'En Dance Studio 渋谷本店',
      lessonName: 'ヒップホップ初級クラス',
      rating: 5,
      title: '最高のレッスンでした！',
      content: 'インストラクターの方がとても親切で、初心者の私でも楽しく踊ることができました。スタジオも清潔で設備も整っており、また通いたいと思います。',
      date: '2024-01-15',
      status: 'published',
      isVerified: true,
      helpfulCount: 12,
      reportCount: 0,
      response: {
        content: 'ご利用いただき、ありがとうございます。今後もより良いレッスンを提供できるよう努めてまいります。',
        author: 'En Dance Studio',
        date: '2024-01-16'
      }
    },
    {
      id: 'rev002',
      customerName: '佐藤 健太',
      studioName: 'En Dance Studio 渋谷本店',
      lessonName: 'ジャズダンス中級クラス',
      rating: 4,
      title: 'とても良い環境でした',
      content: '講師の技術レベルが高く、的確な指導をしていただけました。もう少しレッスン時間が長いと嬉しいです。',
      date: '2024-01-14',
      status: 'published',
      isVerified: true,
      helpfulCount: 8,
      reportCount: 0
    },
    {
      id: 'rev003',
      customerName: '山田 花子',
      studioName: 'En Dance Studio 渋谷本店',
      lessonName: 'バレエ基礎クラス',
      rating: 3,
      title: '普通でした',
      content: 'レッスン内容は悪くないのですが、更衣室がもう少し広いと良いと思います。',
      date: '2024-01-13',
      status: 'pending',
      isVerified: false,
      helpfulCount: 2,
      reportCount: 1
    },
    {
      id: 'rev004',
      customerName: '鈴木 太郎',
      studioName: 'En Dance Studio 渋谷本店',
      lessonName: 'ストリートダンス上級クラス',
      rating: 1,
      title: '期待外れでした',
      content: '講師の態度が悪く、不快な思いをしました。二度と利用しません。',
      date: '2024-01-12',
      status: 'flagged',
      isVerified: false,
      helpfulCount: 0,
      reportCount: 3
    }
  ]

  const reviewStats: ReviewStats = {
    totalReviews: 847,
    averageRating: 4.2,
    ratingDistribution: {
      5: 420,
      4: 268,
      3: 98,
      2: 38,
      1: 23
    },
    pendingReviews: 12,
    flaggedReviews: 3
  }

  const filteredReviews = reviews.filter(review => {
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus
    const matchesSearch = review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.studioName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleStatusChange = (reviewId: string, newStatus: string) => {
    console.log(`Changing review ${reviewId} status to ${newStatus}`)
  }

  const handleResponse = (review: Review) => {
    setSelectedReview(review)
    setResponseText(review.response?.content || '')
    setShowResponseModal(true)
  }

  const submitResponse = () => {
    if (selectedReview && responseText.trim()) {
      console.log(`Submitting response for review ${selectedReview.id}: ${responseText}`)
      setShowResponseModal(false)
      setResponseText('')
      setSelectedReview(null)
    }
  }

  const getRatingStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map(star => (
      <i
        key={star}
        className={`fas fa-star ${star <= rating ? 'star-filled' : 'star-empty'}`}
      ></i>
    ))
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: '公開中', class: 'status-published' },
      pending: { label: '承認待ち', class: 'status-pending' },
      rejected: { label: '非承認', class: 'status-rejected' },
      flagged: { label: 'フラグ付き', class: 'status-flagged' }
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <span className={`status-badge ${config.class}`}>{config.label}</span>
  }

  return (
    <div className="review-management">
      {/* ヘッダー */}
      <div className="review-header">
        <div className="header-content">
          <h1 className="page-title">
            <i className="fas fa-star"></i>
            口コミ・レビュー管理【ホットペッパー型】
          </h1>
          <div className="marketplace-badge">
            <span className="badge-text">★ ホットペッパー</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="顧客名、スタジオ名、レビュー内容で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="export-btn">
            <i className="fas fa-download"></i>
            レビューエクスポート
          </button>
        </div>
      </div>

      {/* 統計サマリー */}
      <div className="stats-section">
        <div className="stats-card marketplace-card">
          <div className="stats-header">
            <h3>総合評価</h3>
          </div>
          <div className="rating-summary">
            <div className="average-rating">
              <span className="rating-value">{reviewStats.averageRating}</span>
              <div className="rating-stars">
                {getRatingStars(Math.round(reviewStats.averageRating))}
              </div>
              <span className="total-reviews">({reviewStats.totalReviews.toLocaleString()}件のレビュー)</span>
            </div>
            <div className="rating-distribution">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="rating-row">
                  <span className="rating-label">{rating}つ星</span>
                  <div className="rating-bar">
                    <div
                      className="rating-fill"
                      style={{ width: `${(reviewStats.ratingDistribution[rating] / reviewStats.totalReviews) * 100}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{reviewStats.ratingDistribution[rating]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-item marketplace-card">
            <div className="stat-icon marketplace-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{reviewStats.pendingReviews}</div>
              <div className="stat-label">承認待ちレビュー</div>
            </div>
          </div>

          <div className="stat-item marketplace-card">
            <div className="stat-icon marketplace-icon">
              <i className="fas fa-flag"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{reviewStats.flaggedReviews}</div>
              <div className="stat-label">フラグ付きレビュー</div>
            </div>
          </div>

          <div className="stat-item marketplace-card">
            <div className="stat-icon marketplace-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">+12%</div>
              <div className="stat-label">今月のレビュー増加率</div>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターとタブ */}
      <div className="filter-section">
        <div className="filter-tabs">
          <button
            className={`tab-btn ${selectedTab === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedTab('all')}
          >
            すべて
          </button>
          <button
            className={`tab-btn ${selectedTab === 'pending' ? 'active' : ''}`}
            onClick={() => setSelectedTab('pending')}
          >
            承認待ち
            <span className="tab-badge">{reviewStats.pendingReviews}</span>
          </button>
          <button
            className={`tab-btn ${selectedTab === 'flagged' ? 'active' : ''}`}
            onClick={() => setSelectedTab('flagged')}
          >
            フラグ付き
            <span className="tab-badge">{reviewStats.flaggedReviews}</span>
          </button>
        </div>

        <div className="filter-controls">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">すべてのステータス</option>
            <option value="published">公開中</option>
            <option value="pending">承認待ち</option>
            <option value="rejected">非承認</option>
            <option value="flagged">フラグ付き</option>
          </select>
        </div>
      </div>

      {/* レビューリスト */}
      <div className="reviews-list">
        {filteredReviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="customer-info">
                {review.customerAvatar && (
                  <img src={review.customerAvatar} alt="" className="customer-avatar" />
                )}
                <div className="customer-details">
                  <div className="customer-name">
                    {review.customerName}
                    {review.isVerified && (
                      <i className="fas fa-check-circle verified-badge" title="認証済み"></i>
                    )}
                  </div>
                  <div className="review-meta">
                    <span className="studio-name">{review.studioName}</span>
                    <span className="lesson-name">{review.lessonName}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
              </div>
              <div className="review-status">
                {getStatusBadge(review.status)}
              </div>
            </div>

            <div className="review-content">
              <div className="review-rating">
                <div className="rating-stars">
                  {getRatingStars(review.rating)}
                </div>
                <span className="rating-value">({review.rating}/5)</span>
              </div>
              <h4 className="review-title">{review.title}</h4>
              <p className="review-text">{review.content}</p>
            </div>

            <div className="review-metrics">
              <div className="metric-item">
                <i className="fas fa-thumbs-up"></i>
                <span>役に立った: {review.helpfulCount}</span>
              </div>
              {review.reportCount > 0 && (
                <div className="metric-item warning">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>報告: {review.reportCount}</span>
                </div>
              )}
            </div>

            {review.response && (
              <div className="studio-response">
                <div className="response-header">
                  <i className="fas fa-reply"></i>
                  <span>スタジオからの返信</span>
                  <span className="response-date">{review.response.date}</span>
                </div>
                <p className="response-content">{review.response.content}</p>
              </div>
            )}

            <div className="review-actions">
              {review.status === 'pending' && (
                <>
                  <button
                    className="action-btn approve-btn"
                    onClick={() => handleStatusChange(review.id, 'published')}
                  >
                    <i className="fas fa-check"></i>
                    承認
                  </button>
                  <button
                    className="action-btn reject-btn"
                    onClick={() => handleStatusChange(review.id, 'rejected')}
                  >
                    <i className="fas fa-times"></i>
                    非承認
                  </button>
                </>
              )}
              {review.status === 'flagged' && (
                <button
                  className="action-btn resolve-btn"
                  onClick={() => handleStatusChange(review.id, 'published')}
                >
                  <i className="fas fa-check-circle"></i>
                  問題解決済み
                </button>
              )}
              <button
                className="action-btn response-btn"
                onClick={() => handleResponse(review)}
              >
                <i className="fas fa-reply"></i>
                {review.response ? '返信編集' : '返信する'}
              </button>
              <button className="action-btn flag-btn">
                <i className="fas fa-flag"></i>
                フラグ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 返信モーダル */}
      {showResponseModal && selectedReview && (
        <div className="modal-overlay">
          <div className="response-modal">
            <div className="modal-header">
              <h3>レビューへの返信</h3>
              <button
                className="close-btn"
                onClick={() => setShowResponseModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-content">
              <div className="original-review">
                <div className="review-summary">
                  <div className="rating-stars">
                    {getRatingStars(selectedReview.rating)}
                  </div>
                  <h4>{selectedReview.title}</h4>
                  <p>{selectedReview.content}</p>
                </div>
              </div>

              <div className="response-form">
                <label>返信内容</label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="お客様のレビューに対する返信を入力してください..."
                  rows={5}
                ></textarea>
                <div className="character-count">
                  {responseText.length} / 500文字
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowResponseModal(false)}
              >
                キャンセル
              </button>
              <button
                className="submit-btn"
                onClick={submitResponse}
                disabled={!responseText.trim()}
              >
                返信を送信
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .review-management {
          padding: 24px;
          background: #fafafa;
          min-height: 100vh;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          background: linear-gradient(135deg, #fff3e0 0%, #ffffff 100%);
          padding: 24px;
          border-radius: 16px;
          border: 2px solid #ff9800;
          box-shadow: 0 4px 20px rgba(255, 152, 0, 0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #e65100;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .marketplace-badge {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
        }

        .header-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-box i {
          position: absolute;
          left: 12px;
          color: #6b7280;
        }

        .search-box input {
          padding: 10px 16px 10px 40px;
          border: 2px solid #ffcc80;
          border-radius: 8px;
          background: #ffffff;
          width: 300px;
          font-size: 14px;
        }

        .export-btn {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
          transition: all 0.2s ease;
        }

        .export-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.4);
        }

        .stats-section {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 24px;
          margin-bottom: 32px;
        }

        .stats-card {
          background: linear-gradient(135deg, #ffffff, #fff8f0);
          border: 2px solid #ffcc80;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.15);
        }

        .marketplace-card {
          transition: all 0.3s ease;
        }

        .marketplace-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 152, 0, 0.25);
          border-color: #ff9800;
        }

        .stats-header h3 {
          margin: 0 0 20px 0;
          color: #e65100;
          font-weight: 600;
        }

        .rating-summary {
          display: flex;
          gap: 24px;
        }

        .average-rating {
          text-align: center;
        }

        .rating-value {
          font-size: 48px;
          font-weight: 700;
          color: #e65100;
          display: block;
          line-height: 1;
          margin-bottom: 8px;
        }

        .rating-stars {
          display: flex;
          gap: 2px;
          justify-content: center;
          margin-bottom: 8px;
        }

        .star-filled {
          color: #fbbf24;
        }

        .star-empty {
          color: #d1d5db;
        }

        .total-reviews {
          font-size: 12px;
          color: #6b7280;
        }

        .rating-distribution {
          flex: 1;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .rating-label {
          width: 50px;
          font-size: 12px;
          color: #6b7280;
        }

        .rating-bar {
          flex: 1;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }

        .rating-fill {
          height: 100%;
          background: #ff9800;
          transition: width 0.3s ease;
        }

        .rating-count {
          width: 40px;
          text-align: right;
          font-size: 12px;
          color: #6b7280;
        }

        .stats-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 20px;
        }

        .marketplace-icon {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #e65100;
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: #bf360c;
          font-weight: 500;
        }

        .filter-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          background: #ffffff;
          padding: 20px 24px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .filter-tabs {
          display: flex;
          gap: 8px;
        }

        .tab-btn {
          padding: 8px 16px;
          border: 2px solid #e5e7eb;
          background: #ffffff;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          color: #6b7280;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tab-btn.active {
          border-color: #ff9800;
          background: #fff3e0;
          color: #e65100;
        }

        .tab-badge {
          background: #ff9800;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 600;
        }

        .filter-controls {
          display: flex;
          gap: 12px;
        }

        .status-filter {
          padding: 8px 16px;
          border: 2px solid #ffcc80;
          border-radius: 8px;
          background: #ffffff;
          color: #e65100;
          font-weight: 500;
          cursor: pointer;
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .review-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }

        .review-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .customer-info {
          display: flex;
          gap: 12px;
        }

        .customer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .customer-details {
          flex: 1;
        }

        .customer-name {
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .verified-badge {
          color: #10b981;
          font-size: 14px;
        }

        .review-meta {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #6b7280;
        }

        .review-status {
          display: flex;
          align-items: center;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-published {
          background: #d1fae5;
          color: #065f46;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-rejected {
          background: #fee2e2;
          color: #dc2626;
        }

        .status-flagged {
          background: #fecaca;
          color: #b91c1c;
        }

        .review-content {
          margin-bottom: 16px;
        }

        .review-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .rating-value {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .review-title {
          font-size: 16px;
          font-weight: 600;
          color: #0d1117;
          margin: 0 0 8px 0;
        }

        .review-text {
          color: #374151;
          line-height: 1.6;
          margin: 0;
        }

        .review-metrics {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f3f4f6;
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #6b7280;
        }

        .metric-item.warning {
          color: #dc2626;
        }

        .studio-response {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .response-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
        }

        .response-date {
          margin-left: auto;
        }

        .response-content {
          color: #374151;
          line-height: 1.5;
          margin: 0;
        }

        .review-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 6px 12px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s ease;
        }

        .approve-btn {
          border-color: #10b981;
          color: #065f46;
        }

        .approve-btn:hover {
          background: #d1fae5;
        }

        .reject-btn {
          border-color: #ef4444;
          color: #dc2626;
        }

        .reject-btn:hover {
          background: #fee2e2;
        }

        .resolve-btn {
          border-color: #3b82f6;
          color: #1e40af;
        }

        .resolve-btn:hover {
          background: #dbeafe;
        }

        .response-btn {
          border-color: #ff9800;
          color: #e65100;
        }

        .response-btn:hover {
          background: #fff3e0;
        }

        .flag-btn {
          border-color: #6b7280;
          color: #6b7280;
        }

        .flag-btn:hover {
          background: #f3f4f6;
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

        .response-modal {
          background: #ffffff;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
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

        .original-review {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .review-summary h4 {
          margin: 8px 0 4px 0;
          color: #0d1117;
        }

        .review-summary p {
          margin: 0;
          color: #6b7280;
          line-height: 1.5;
        }

        .response-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .response-form label {
          font-weight: 500;
          color: #374151;
        }

        .response-form textarea {
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          resize: vertical;
          font-family: inherit;
          line-height: 1.5;
        }

        .response-form textarea:focus {
          outline: none;
          border-color: #ff9800;
        }

        .character-count {
          text-align: right;
          font-size: 12px;
          color: #6b7280;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px 24px;
          border-top: 1px solid #e5e7eb;
        }

        .cancel-btn {
          padding: 8px 20px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          color: #6b7280;
        }

        .submit-btn {
          padding: 8px 20px;
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 1024px) {
          .stats-section {
            grid-template-columns: 1fr;
          }

          .rating-summary {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }

          .filter-section {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .search-box input {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .review-management {
            padding: 16px;
          }

          .review-header {
            flex-direction: column;
            gap: 16px;
          }

          .header-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .page-title {
            font-size: 20px;
          }

          .review-card {
            padding: 16px;
          }

          .customer-info {
            flex-direction: column;
            gap: 8px;
          }

          .review-actions {
            justify-content: space-between;
          }

          .modal-content {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  )
}

export default ReviewManagement