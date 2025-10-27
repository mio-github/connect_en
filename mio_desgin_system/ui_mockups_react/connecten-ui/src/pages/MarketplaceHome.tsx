import React, { useState } from 'react'

interface Studio {
  id: string
  name: string
  image: string
  rating: number
  reviewCount: number
  location: string
  genres: string[]
  distance: string
  price: string
  discount?: string
  badges: string[]
  isNew?: boolean
  isPopular?: boolean
}

interface SearchFilter {
  area: string
  genre: string
  price: string
  date: string
  time: string
}

const MarketplaceHome: React.FC = () => {
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    area: '',
    genre: '',
    price: '',
    date: '',
    time: ''
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // サンプルスタジオデータ
  const studios: Studio[] = [
    {
      id: 'studio1',
      name: 'En Dance Studio 渋谷本店',
      image: '/api/placeholder/300/200',
      rating: 4.8,
      reviewCount: 245,
      location: '渋谷駅徒歩3分',
      genres: ['ヒップホップ', 'ジャズ', 'バレエ'],
      distance: '0.3km',
      price: '¥1,500〜',
      discount: '初回50%OFF',
      badges: ['人気', '新規特典'],
      isNew: false,
      isPopular: true
    },
    {
      id: 'studio2',
      name: 'Urban Dance Academy',
      image: '/api/placeholder/300/200',
      rating: 4.6,
      reviewCount: 189,
      location: '新宿駅徒歩5分',
      genres: ['ストリート', 'ブレイク', 'ハウス'],
      distance: '1.2km',
      price: '¥1,800〜',
      badges: ['体験無料'],
      isNew: true,
      isPopular: false
    },
    {
      id: 'studio3',
      name: 'Grace Ballet Studio',
      image: '/api/placeholder/300/200',
      rating: 4.9,
      reviewCount: 312,
      location: '表参道駅徒歩2分',
      genres: ['バレエ', 'コンテンポラリー'],
      distance: '0.8km',
      price: '¥2,200〜',
      discount: '体験¥500',
      badges: ['高評価', '駅近'],
      isNew: false,
      isPopular: true
    },
    {
      id: 'studio4',
      name: 'K-POP Dance Factory',
      image: '/api/placeholder/300/200',
      rating: 4.7,
      reviewCount: 167,
      location: '原宿駅徒歩4分',
      genres: ['K-POP', 'ガールズ', 'カバーダンス'],
      distance: '1.0km',
      price: '¥1,600〜',
      badges: ['K-POP専門'],
      isNew: true,
      isPopular: true
    },
    {
      id: 'studio5',
      name: 'Yoga & Dance Harmony',
      image: '/api/placeholder/300/200',
      rating: 4.5,
      reviewCount: 134,
      location: '恵比寿駅徒歩6分',
      genres: ['ヨガ', 'ピラティス', 'リラックス'],
      distance: '1.5km',
      price: '¥1,200〜',
      discount: '初月半額',
      badges: ['リラックス', '女性専用'],
      isNew: false,
      isPopular: false
    },
    {
      id: 'studio6',
      name: 'Pro Dance Studio Tokyo',
      image: '/api/placeholder/300/200',
      rating: 4.4,
      reviewCount: 98,
      location: '六本木駅徒歩3分',
      genres: ['プロ向け', 'コマーシャル', 'オーディション'],
      distance: '2.1km',
      price: '¥2,800〜',
      badges: ['プロ向け', '実績豊富'],
      isNew: false,
      isPopular: false
    }
  ]

  const popularGenres = [
    { name: 'ヒップホップ', icon: '🎤', count: 45 },
    { name: 'K-POP', icon: '🌟', count: 32 },
    { name: 'バレエ', icon: '🩰', count: 28 },
    { name: 'ジャズダンス', icon: '🎵', count: 25 },
    { name: 'ヨガ', icon: '🧘‍♀️', count: 22 },
    { name: 'ストリート', icon: '🏙️', count: 18 }
  ]

  const areas = [
    '渋谷・原宿・表参道',
    '新宿・池袋・高田馬場',
    '恵比寿・六本木・赤坂',
    '品川・五反田・大崎',
    '銀座・有楽町・築地',
    '上野・浅草・押上',
    '横浜・みなとみらい',
    '吉祥寺・下北沢・三軒茶屋'
  ]

  const getRatingStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map(star => (
      <i
        key={star}
        className={`fas fa-star ${star <= rating ? 'star-filled' : 'star-empty'}`}
      ></i>
    ))
  }

  const handleSearch = () => {
    console.log('検索実行:', { searchQuery, searchFilter })
  }

  const handleStudioClick = (studioId: string) => {
    console.log('スタジオ詳細へ:', studioId)
  }

  const handleBooking = (studioId: string) => {
    console.log('予約開始:', studioId)
  }

  return (
    <div className="marketplace-home">
      {/* ヒーローセクション */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            あなたにぴったりの
            <span className="title-highlight">ダンススタジオ</span>
            を見つけよう
          </h1>
          <p className="hero-description">
            渋谷・新宿・原宿エリアを中心に、300以上のダンススタジオから<br />
            あなたの目的とレベルに合ったレッスンを簡単検索・予約
          </p>

          {/* 検索バー */}
          <div className="search-section">
            <div className="search-bar">
              <div className="search-input">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="スタジオ名、ジャンル、エリアで検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="search-filters">
                <select
                  value={searchFilter.area}
                  onChange={(e) => setSearchFilter({...searchFilter, area: e.target.value})}
                >
                  <option value="">エリアを選択</option>
                  {areas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>

                <select
                  value={searchFilter.genre}
                  onChange={(e) => setSearchFilter({...searchFilter, genre: e.target.value})}
                >
                  <option value="">ジャンルを選択</option>
                  {popularGenres.map(genre => (
                    <option key={genre.name} value={genre.name}>{genre.name}</option>
                  ))}
                </select>

                <select
                  value={searchFilter.price}
                  onChange={(e) => setSearchFilter({...searchFilter, price: e.target.value})}
                >
                  <option value="">料金</option>
                  <option value="1000">¥1,000以下</option>
                  <option value="1500">¥1,500以下</option>
                  <option value="2000">¥2,000以下</option>
                  <option value="3000">¥3,000以下</option>
                </select>
              </div>

              <button className="search-btn" onClick={handleSearch}>
                <i className="fas fa-search"></i>
                検索
              </button>
            </div>
          </div>

          {/* 人気ジャンル */}
          <div className="popular-genres">
            <span className="genres-label">人気ジャンル:</span>
            <div className="genre-tags">
              {popularGenres.slice(0, 4).map(genre => (
                <button key={genre.name} className="genre-tag">
                  <span className="genre-icon">{genre.icon}</span>
                  {genre.name}
                  <span className="genre-count">({genre.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* スタジオリスト */}
      <div className="studios-section">
        <div className="section-header">
          <div className="header-left">
            <h2 className="section-title">おすすめスタジオ</h2>
            <span className="results-count">{studios.length}件のスタジオが見つかりました</span>
          </div>

          <div className="header-controls">
            <div className="sort-controls">
              <select>
                <option value="popular">人気順</option>
                <option value="rating">評価順</option>
                <option value="distance">距離順</option>
                <option value="price">料金順</option>
              </select>
            </div>

            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="fas fa-th"></i>
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
        </div>

        <div className={`studios-grid ${viewMode}`}>
          {studios.map(studio => (
            <div key={studio.id} className="studio-card">
              <div className="studio-image">
                <img src={studio.image} alt={studio.name} />
                <div className="studio-badges">
                  {studio.isNew && <span className="badge new-badge">NEW</span>}
                  {studio.isPopular && <span className="badge popular-badge">人気</span>}
                  {studio.discount && <span className="badge discount-badge">{studio.discount}</span>}
                </div>
                <button className="favorite-btn">
                  <i className="far fa-heart"></i>
                </button>
              </div>

              <div className="studio-content">
                <div className="studio-header">
                  <h3 className="studio-name" onClick={() => handleStudioClick(studio.id)}>
                    {studio.name}
                  </h3>
                  <div className="studio-rating">
                    <div className="rating-stars">
                      {getRatingStars(Math.floor(studio.rating))}
                    </div>
                    <span className="rating-value">{studio.rating}</span>
                    <span className="review-count">({studio.reviewCount})</span>
                  </div>
                </div>

                <div className="studio-info">
                  <div className="location-info">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{studio.location}</span>
                    <span className="distance">({studio.distance})</span>
                  </div>

                  <div className="genre-list">
                    {studio.genres.slice(0, 3).map(genre => (
                      <span key={genre} className="genre-chip">{genre}</span>
                    ))}
                    {studio.genres.length > 3 && (
                      <span className="genre-more">+{studio.genres.length - 3}</span>
                    )}
                  </div>

                  <div className="price-info">
                    <span className="price">{studio.price}</span>
                    <span className="price-unit">/1レッスン</span>
                  </div>
                </div>

                <div className="studio-tags">
                  {studio.badges.map(badge => (
                    <span key={badge} className="studio-tag">{badge}</span>
                  ))}
                </div>

                <div className="studio-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleStudioClick(studio.id)}
                  >
                    詳細を見る
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBooking(studio.id)}
                  >
                    <i className="fas fa-calendar-plus"></i>
                    予約する
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marketplace-home {
          min-height: 100vh;
          background: #fafafa;
        }

        .hero-section {
          background: linear-gradient(135deg, #fff3e0 0%, #ffffff 100%);
          border-bottom: 2px solid #ff9800;
          padding: 60px 24px;
          text-align: center;
        }

        .hero-content {
          max-width: 1000px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 700;
          color: #e65100;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .title-highlight {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 18px;
          color: #6b7280;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .search-section {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(255, 152, 0, 0.1);
          border: 2px solid #ffcc80;
          margin-bottom: 32px;
        }

        .search-bar {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .search-input {
          position: relative;
          flex: 1;
        }

        .search-input i {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #ff9800;
          font-size: 18px;
        }

        .search-input input {
          width: 100%;
          padding: 16px 16px 16px 50px;
          border: 2px solid #ffcc80;
          border-radius: 12px;
          font-size: 16px;
          background: #ffffff;
        }

        .search-input input:focus {
          outline: none;
          border-color: #ff9800;
          box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
        }

        .search-filters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        .search-filters select {
          padding: 12px 16px;
          border: 2px solid #ffcc80;
          border-radius: 8px;
          background: #ffffff;
          color: #374151;
          font-size: 14px;
          cursor: pointer;
        }

        .search-btn {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          align-self: center;
        }

        .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 152, 0, 0.3);
        }

        .popular-genres {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .genres-label {
          font-weight: 600;
          color: #374151;
        }

        .genre-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .genre-tag {
          background: #fff3e0;
          border: 1px solid #ffcc80;
          border-radius: 20px;
          padding: 6px 12px;
          font-size: 14px;
          color: #e65100;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .genre-tag:hover {
          background: #ff9800;
          color: white;
        }

        .genre-icon {
          font-size: 16px;
        }

        .genre-count {
          font-size: 12px;
          opacity: 0.8;
        }

        .studios-section {
          padding: 40px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .section-title {
          font-size: 32px;
          font-weight: 700;
          color: #e65100;
          margin: 0;
        }

        .results-count {
          font-size: 14px;
          color: #6b7280;
        }

        .header-controls {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .sort-controls select {
          padding: 8px 12px;
          border: 2px solid #ffcc80;
          border-radius: 6px;
          background: #ffffff;
          color: #374151;
          cursor: pointer;
        }

        .view-controls {
          display: flex;
          gap: 4px;
          border: 2px solid #ffcc80;
          border-radius: 6px;
          overflow: hidden;
        }

        .view-btn {
          padding: 8px 12px;
          border: none;
          background: #ffffff;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-btn.active {
          background: #ff9800;
          color: white;
        }

        .studios-grid {
          display: grid;
          gap: 24px;
        }

        .studios-grid.grid {
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        }

        .studios-grid.list {
          grid-template-columns: 1fr;
        }

        .studio-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .studio-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(255, 152, 0, 0.15);
          border-color: #ff9800;
        }

        .studio-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .studio-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .studio-card:hover .studio-image img {
          transform: scale(1.05);
        }

        .studio-badges {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .new-badge {
          background: #10b981;
          color: white;
        }

        .popular-badge {
          background: #ef4444;
          color: white;
        }

        .discount-badge {
          background: #f59e0b;
          color: white;
        }

        .favorite-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .favorite-btn:hover {
          background: #ff9800;
          color: white;
        }

        .studio-content {
          padding: 20px;
        }

        .studio-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .studio-name {
          font-size: 18px;
          font-weight: 600;
          color: #0d1117;
          margin: 0;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .studio-name:hover {
          color: #ff9800;
        }

        .studio-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
        }

        .rating-stars {
          display: flex;
          gap: 1px;
        }

        .star-filled {
          color: #fbbf24;
        }

        .star-empty {
          color: #d1d5db;
        }

        .rating-value {
          font-weight: 600;
          color: #374151;
        }

        .review-count {
          color: #6b7280;
        }

        .studio-info {
          margin-bottom: 16px;
        }

        .location-info {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
          font-size: 14px;
          color: #6b7280;
        }

        .distance {
          color: #9ca3af;
          font-size: 12px;
        }

        .genre-list {
          display: flex;
          gap: 6px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .genre-chip {
          background: #f3f4f6;
          color: #374151;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
        }

        .genre-more {
          background: #e5e7eb;
          color: #6b7280;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
        }

        .price-info {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .price {
          font-size: 16px;
          font-weight: 700;
          color: #e65100;
        }

        .price-unit {
          font-size: 12px;
          color: #6b7280;
        }

        .studio-tags {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .studio-tag {
          background: #fff3e0;
          color: #e65100;
          padding: 3px 8px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 500;
          border: 1px solid #ffcc80;
        }

        .studio-actions {
          display: flex;
          gap: 8px;
        }

        .btn {
          flex: 1;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-secondary {
          background: #f9fafb;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .btn-secondary:hover {
          background: #f3f4f6;
        }

        .btn-primary {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          box-shadow: 0 2px 8px rgba(255, 152, 0, 0.2);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 32px;
          }

          .hero-description {
            font-size: 16px;
          }

          .search-section {
            padding: 20px;
          }

          .search-filters {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .header-controls {
            justify-content: space-between;
          }

          .studios-grid.grid {
            grid-template-columns: 1fr;
          }

          .studio-header {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }

          .studio-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default MarketplaceHome