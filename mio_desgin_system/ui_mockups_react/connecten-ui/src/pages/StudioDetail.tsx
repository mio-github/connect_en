import React, { useState } from 'react'

interface StudioInfo {
  id: string
  name: string
  images: string[]
  rating: number
  reviewCount: number
  location: string
  address: string
  phone: string
  description: string
  features: string[]
  amenities: string[]
  access: string[]
  priceRange: string
  openHours: { [key: string]: string }
  genres: string[]
  instructors: Instructor[]
  lessonPlans: LessonPlan[]
  reviews: Review[]
}

interface Instructor {
  id: string
  name: string
  avatar: string
  specialties: string[]
  experience: string
  description: string
}

interface LessonPlan {
  id: string
  name: string
  genre: string
  level: string
  duration: string
  price: number
  description: string
  instructor: string
  schedule: { day: string; time: string }[]
  capacity: number
  currentBookings: number
}

interface Review {
  id: string
  customerName: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
  helpful: number
}

const StudioDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan | null>(null)

  // サンプルスタジオデータ
  const studio: StudioInfo = {
    id: 'studio1',
    name: 'En Dance Studio 渋谷本店',
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    rating: 4.8,
    reviewCount: 245,
    location: '渋谷駅徒歩3分',
    address: '東京都渋谷区渋谷1-2-3 渋谷ビル5F',
    phone: '03-1234-5678',
    description: '渋谷駅から徒歩3分の好立地にある総合ダンススタジオです。初心者から上級者まで、幅広いレベルの方にお楽しみいただけるレッスンを多数ご用意しております。最新の音響設備と鏡張りの広々としたスタジオで、快適にダンスを学べます。',
    features: [
      '駅徒歩3分の好立地',
      '最新音響設備完備',
      '広々とした鏡張りスタジオ',
      '更衣室・ロッカー完備',
      '無料WiFi',
      '冷暖房完備',
      '初心者歓迎',
      '体験レッスンあり'
    ],
    amenities: [
      'ロッカー',
      '更衣室',
      'シャワー室',
      '待合エリア',
      '自動販売機',
      '駐車場',
      '車椅子対応',
      'タオルレンタル'
    ],
    access: [
      'JR山手線 渋谷駅 東口より徒歩3分',
      '東京メトロ銀座線 渋谷駅 B5出口より徒歩2分',
      '京王井の頭線 渋谷駅 徒歩5分',
      '東急東横線 渋谷駅 徒歩4分'
    ],
    priceRange: '¥1,500 〜 ¥3,000',
    openHours: {
      '月曜日': '10:00 - 22:00',
      '火曜日': '10:00 - 22:00',
      '水曜日': '10:00 - 22:00',
      '木曜日': '10:00 - 22:00',
      '金曜日': '10:00 - 22:00',
      '土曜日': '9:00 - 21:00',
      '日曜日': '9:00 - 20:00'
    },
    genres: ['ヒップホップ', 'ジャズ', 'バレエ', 'K-POP', 'ストリート', 'ヨガ'],
    instructors: [
      {
        id: 'inst1',
        name: '山田 花子',
        avatar: '/api/placeholder/80/80',
        specialties: ['バレエ', 'ジャズダンス'],
        experience: '15年',
        description: 'ロイヤルバレエ学校出身。国内外での舞台経験豊富。優しく丁寧な指導で人気。'
      },
      {
        id: 'inst2',
        name: '佐藤 健太',
        avatar: '/api/placeholder/80/80',
        specialties: ['ヒップホップ', 'ストリート'],
        experience: '12年',
        description: 'ストリートダンス界の第一人者。数々のコンテストで優勝経験あり。'
      },
      {
        id: 'inst3',
        name: '鈴木 美咲',
        avatar: '/api/placeholder/80/80',
        specialties: ['K-POP', 'ガールズダンス'],
        experience: '8年',
        description: 'K-POPダンス専門。韓国での研修経験あり。楽しく踊ることを重視した指導。'
      }
    ],
    lessonPlans: [
      {
        id: 'lesson1',
        name: '初級バレエ',
        genre: 'バレエ',
        level: '初級',
        duration: '90分',
        price: 2200,
        description: 'バレエの基礎からしっかり学べるクラスです。姿勢改善や柔軟性向上にも効果的。',
        instructor: '山田 花子',
        schedule: [
          { day: '月曜日', time: '10:00-11:30' },
          { day: '水曜日', time: '19:00-20:30' },
          { day: '土曜日', time: '14:00-15:30' }
        ],
        capacity: 20,
        currentBookings: 15
      },
      {
        id: 'lesson2',
        name: 'ヒップホップ入門',
        genre: 'ヒップホップ',
        level: '入門',
        duration: '60分',
        price: 1800,
        description: 'ヒップホップの基本ステップから学べる入門クラス。音楽に合わせて楽しく踊ろう！',
        instructor: '佐藤 健太',
        schedule: [
          { day: '火曜日', time: '20:00-21:00' },
          { day: '木曜日', time: '19:00-20:00' },
          { day: '日曜日', time: '15:00-16:00' }
        ],
        capacity: 15,
        currentBookings: 12
      },
      {
        id: 'lesson3',
        name: 'K-POPダンス',
        genre: 'K-POP',
        level: '初級〜中級',
        duration: '75分',
        price: 2000,
        description: '人気K-POPアーティストの楽曲に合わせて踊るクラス。カバーダンスがメイン。',
        instructor: '鈴木 美咲',
        schedule: [
          { day: '金曜日', time: '20:00-21:15' },
          { day: '土曜日', time: '16:00-17:15' },
          { day: '日曜日', time: '17:00-18:15' }
        ],
        capacity: 18,
        currentBookings: 16
      }
    ],
    reviews: [
      {
        id: 'rev1',
        customerName: '田中 美咲',
        rating: 5,
        date: '2024-01-15',
        title: '最高のレッスンでした！',
        content: 'インストラクターの方がとても親切で、初心者の私でも楽しく踊ることができました。スタジオも清潔で設備も整っており、また通いたいと思います。',
        verified: true,
        helpful: 12
      },
      {
        id: 'rev2',
        customerName: '佐藤 健太',
        rating: 4,
        date: '2024-01-14',
        title: 'とても良い環境でした',
        content: '講師の技術レベルが高く、的確な指導をしていただけました。もう少しレッスン時間が長いと嬉しいです。',
        verified: true,
        helpful: 8
      },
      {
        id: 'rev3',
        customerName: '山田 花子',
        rating: 5,
        date: '2024-01-13',
        title: '駅から近くて便利',
        content: '渋谷駅から本当に近くて通いやすいです。レッスンの質も高く、先生方も優しくて素晴らしいスタジオです。',
        verified: false,
        helpful: 6
      }
    ]
  }

  const getRatingStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map(star => (
      <i
        key={star}
        className={`fas fa-star ${star <= rating ? 'star-filled' : 'star-empty'}`}
      ></i>
    ))
  }

  const handleBooking = (lesson: LessonPlan) => {
    setSelectedLesson(lesson)
    setShowBookingModal(true)
  }

  const getAvailabilityStatus = (currentBookings: number, capacity: number) => {
    const percentage = (currentBookings / capacity) * 100
    if (percentage >= 90) return { status: 'full', label: '満席間近', class: 'status-full' }
    if (percentage >= 70) return { status: 'busy', label: '残りわずか', class: 'status-busy' }
    return { status: 'available', label: '空きあり', class: 'status-available' }
  }

  return (
    <div className="studio-detail">
      {/* 戻るボタン */}
      <div className="breadcrumb">
        <button className="back-btn">
          <i className="fas fa-arrow-left"></i>
          スタジオ一覧に戻る
        </button>
      </div>

      {/* メイン画像ギャラリー */}
      <div className="image-gallery">
        <div className="main-image">
          <img src={studio.images[selectedImage]} alt={studio.name} />
          <div className="image-badges">
            <span className="badge popular-badge">人気</span>
            <span className="badge verified-badge">認証済み</span>
          </div>
        </div>
        <div className="thumbnail-list">
          {studio.images.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`${studio.name} ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>

      {/* スタジオ基本情報 */}
      <div className="studio-header">
        <div className="header-left">
          <h1 className="studio-name">{studio.name}</h1>
          <div className="studio-rating">
            <div className="rating-stars">
              {getRatingStars(Math.floor(studio.rating))}
            </div>
            <span className="rating-value">{studio.rating}</span>
            <span className="review-count">({studio.reviewCount}件のレビュー)</span>
          </div>
          <div className="studio-location">
            <i className="fas fa-map-marker-alt"></i>
            <span>{studio.location}</span>
          </div>
          <div className="studio-price">
            <span className="price-label">レッスン料金:</span>
            <span className="price-range">{studio.priceRange}</span>
          </div>
        </div>

        <div className="header-actions">
          <button className="favorite-btn">
            <i className="far fa-heart"></i>
            お気に入り
          </button>
          <button className="share-btn">
            <i className="fas fa-share-alt"></i>
            シェア
          </button>
          <button className="contact-btn">
            <i className="fas fa-phone"></i>
            電話で問い合わせ
          </button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          概要
        </button>
        <button
          className={`tab-btn ${activeTab === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          レッスン
        </button>
        <button
          className={`tab-btn ${activeTab === 'instructors' ? 'active' : ''}`}
          onClick={() => setActiveTab('instructors')}
        >
          講師
        </button>
        <button
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          レビュー
        </button>
        <button
          className={`tab-btn ${activeTab === 'access' ? 'active' : ''}`}
          onClick={() => setActiveTab('access')}
        >
          アクセス
        </button>
      </div>

      {/* タブコンテンツ */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="content-grid">
              <div className="main-content">
                <section className="description-section">
                  <h3>スタジオについて</h3>
                  <p>{studio.description}</p>
                </section>

                <section className="features-section">
                  <h3>特徴・設備</h3>
                  <div className="features-grid">
                    {studio.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <i className="fas fa-check"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="genres-section">
                  <h3>対応ジャンル</h3>
                  <div className="genres-list">
                    {studio.genres.map((genre, index) => (
                      <span key={index} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                </section>
              </div>

              <div className="sidebar-content">
                <div className="info-card">
                  <h4>基本情報</h4>
                  <div className="info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <div className="info-label">住所</div>
                      <div className="info-value">{studio.address}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-phone"></i>
                    <div>
                      <div className="info-label">電話番号</div>
                      <div className="info-value">{studio.phone}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-clock"></i>
                    <div>
                      <div className="info-label">営業時間</div>
                      <div className="hours-list">
                        {Object.entries(studio.openHours).map(([day, hours]) => (
                          <div key={day} className="hours-item">
                            <span className="day">{day}</span>
                            <span className="hours">{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="amenities-card">
                  <h4>設備・サービス</h4>
                  <div className="amenities-grid">
                    {studio.amenities.map((amenity, index) => (
                      <div key={index} className="amenity-item">
                        <i className="fas fa-check-circle"></i>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="lessons-content">
            <div className="lessons-header">
              <h3>レッスンプラン</h3>
              <p>レベルや目的に合わせて、様々なレッスンをご用意しています。</p>
            </div>
            <div className="lessons-grid">
              {studio.lessonPlans.map(lesson => {
                const availability = getAvailabilityStatus(lesson.currentBookings, lesson.capacity)
                return (
                  <div key={lesson.id} className="lesson-card">
                    <div className="lesson-header">
                      <h4 className="lesson-name">{lesson.name}</h4>
                      <div className="lesson-tags">
                        <span className="genre-tag">{lesson.genre}</span>
                        <span className="level-tag">{lesson.level}</span>
                      </div>
                    </div>

                    <div className="lesson-info">
                      <div className="info-row">
                        <i className="fas fa-user-graduate"></i>
                        <span>講師: {lesson.instructor}</span>
                      </div>
                      <div className="info-row">
                        <i className="fas fa-clock"></i>
                        <span>時間: {lesson.duration}</span>
                      </div>
                      <div className="info-row">
                        <i className="fas fa-users"></i>
                        <span>定員: {lesson.capacity}名</span>
                      </div>
                    </div>

                    <p className="lesson-description">{lesson.description}</p>

                    <div className="lesson-schedule">
                      <h5>開講スケジュール</h5>
                      <div className="schedule-list">
                        {lesson.schedule.map((slot, index) => (
                          <div key={index} className="schedule-item">
                            <span className="day">{slot.day}</span>
                            <span className="time">{slot.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lesson-footer">
                      <div className="price-info">
                        <span className="price">¥{lesson.price.toLocaleString()}</span>
                        <span className="price-unit">/1回</span>
                      </div>
                      <div className="availability-info">
                        <span className={`availability-status ${availability.class}`}>
                          {availability.label}
                        </span>
                        <span className="booking-count">
                          {lesson.currentBookings}/{lesson.capacity}
                        </span>
                      </div>
                      <button
                        className="book-btn"
                        onClick={() => handleBooking(lesson)}
                        disabled={lesson.currentBookings >= lesson.capacity}
                      >
                        <i className="fas fa-calendar-plus"></i>
                        予約する
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'instructors' && (
          <div className="instructors-content">
            <div className="instructors-header">
              <h3>講師紹介</h3>
              <p>経験豊富で情熱的な講師陣があなたをサポートします。</p>
            </div>
            <div className="instructors-grid">
              {studio.instructors.map(instructor => (
                <div key={instructor.id} className="instructor-card">
                  <div className="instructor-avatar">
                    <img src={instructor.avatar} alt={instructor.name} />
                  </div>
                  <div className="instructor-info">
                    <h4 className="instructor-name">{instructor.name}</h4>
                    <div className="instructor-specialties">
                      {instructor.specialties.map((specialty, index) => (
                        <span key={index} className="specialty-tag">{specialty}</span>
                      ))}
                    </div>
                    <div className="instructor-experience">
                      <i className="fas fa-calendar-alt"></i>
                      <span>指導歴 {instructor.experience}</span>
                    </div>
                    <p className="instructor-description">{instructor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-content">
            <div className="reviews-header">
              <h3>レビュー・口コミ</h3>
              <div className="reviews-summary">
                <div className="rating-summary">
                  <div className="avg-rating">
                    <span className="rating-value">{studio.rating}</span>
                    <div className="rating-stars">
                      {getRatingStars(Math.floor(studio.rating))}
                    </div>
                  </div>
                  <span className="total-reviews">{studio.reviewCount}件のレビュー</span>
                </div>
                <button className="write-review-btn">
                  <i className="fas fa-edit"></i>
                  レビューを書く
                </button>
              </div>
            </div>
            <div className="reviews-list">
              {studio.reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <span className="reviewer-name">{review.customerName}</span>
                      {review.verified && (
                        <span className="verified-badge">
                          <i className="fas fa-check-circle"></i>
                          認証済み
                        </span>
                      )}
                    </div>
                    <div className="review-meta">
                      <div className="rating-stars">
                        {getRatingStars(review.rating)}
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                  <h5 className="review-title">{review.title}</h5>
                  <p className="review-content">{review.content}</p>
                  <div className="review-actions">
                    <button className="helpful-btn">
                      <i className="fas fa-thumbs-up"></i>
                      役に立った ({review.helpful})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'access' && (
          <div className="access-content">
            <div className="access-header">
              <h3>アクセス・交通</h3>
            </div>
            <div className="access-grid">
              <div className="access-info">
                <h4>電車でのアクセス</h4>
                <div className="access-list">
                  {studio.access.map((access, index) => (
                    <div key={index} className="access-item">
                      <i className="fas fa-train"></i>
                      <span>{access}</span>
                    </div>
                  ))}
                </div>
                <div className="address-info">
                  <h4>住所</h4>
                  <p>{studio.address}</p>
                  <button className="map-btn">
                    <i className="fas fa-map"></i>
                    地図で確認
                  </button>
                </div>
              </div>
              <div className="map-placeholder">
                <div className="map-content">
                  <i className="fas fa-map-marked-alt"></i>
                  <p>地図表示エリア</p>
                  <p className="map-description">Googleマップ等の地図サービスが表示されます</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 予約モーダル */}
      {showBookingModal && selectedLesson && (
        <div className="modal-overlay">
          <div className="booking-modal">
            <div className="modal-header">
              <h3>レッスン予約</h3>
              <button
                className="close-btn"
                onClick={() => setShowBookingModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="booking-lesson-info">
                <h4>{selectedLesson.name}</h4>
                <p>講師: {selectedLesson.instructor}</p>
                <p>料金: ¥{selectedLesson.price.toLocaleString()}</p>
              </div>
              <div className="booking-form">
                <div className="form-group">
                  <label>希望日時を選択</label>
                  <select>
                    {selectedLesson.schedule.map((slot, index) => (
                      <option key={index} value={`${slot.day}-${slot.time}`}>
                        {slot.day} {slot.time}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>お名前</label>
                  <input type="text" placeholder="お名前を入力" />
                </div>
                <div className="form-group">
                  <label>電話番号</label>
                  <input type="tel" placeholder="電話番号を入力" />
                </div>
                <div className="form-group">
                  <label>メールアドレス</label>
                  <input type="email" placeholder="メールアドレスを入力" />
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowBookingModal(false)}
              >
                キャンセル
              </button>
              <button className="confirm-btn">
                予約を確定する
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .studio-detail {
          min-height: 100vh;
          background: #fafafa;
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .breadcrumb {
          margin-bottom: 24px;
        }

        .back-btn {
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 8px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #374151;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .back-btn:hover {
          background: #f9fafb;
          border-color: #ff9800;
          color: #ff9800;
        }

        .image-gallery {
          background: #ffffff;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .main-image {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-badges {
          position: absolute;
          top: 16px;
          left: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .badge {
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .popular-badge {
          background: #ef4444;
          color: white;
        }

        .verified-badge {
          background: #10b981;
          color: white;
        }

        .thumbnail-list {
          display: flex;
          gap: 12px;
        }

        .thumbnail {
          width: 80px;
          height: 60px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .thumbnail.active {
          border-color: #ff9800;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .studio-header {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .header-left {
          flex: 1;
        }

        .studio-name {
          font-size: 32px;
          font-weight: 700;
          color: #e65100;
          margin: 0 0 12px 0;
        }

        .studio-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .rating-stars {
          display: flex;
          gap: 2px;
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
          font-size: 18px;
        }

        .review-count {
          color: #6b7280;
        }

        .studio-location {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: #6b7280;
        }

        .studio-price {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .price-label {
          color: #6b7280;
        }

        .price-range {
          font-size: 18px;
          font-weight: 600;
          color: #e65100;
        }

        .header-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .favorite-btn, .share-btn, .contact-btn {
          padding: 10px 20px;
          border: 2px solid #ff9800;
          background: #ffffff;
          color: #ff9800;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .favorite-btn:hover, .share-btn:hover, .contact-btn:hover {
          background: #ff9800;
          color: white;
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
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
        }

        .tab-content {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }

        .description-section, .features-section, .genres-section {
          margin-bottom: 32px;
        }

        .description-section h3, .features-section h3, .genres-section h3 {
          font-size: 20px;
          font-weight: 600;
          color: #e65100;
          margin-bottom: 16px;
        }

        .description-section p {
          line-height: 1.7;
          color: #374151;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #374151;
        }

        .feature-item i {
          color: #10b981;
        }

        .genres-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .genre-tag {
          background: #fff3e0;
          color: #e65100;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid #ffcc80;
        }

        .info-card, .amenities-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .info-card h4, .amenities-card h4 {
          font-size: 16px;
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 16px;
        }

        .info-item {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .info-item i {
          color: #ff9800;
          width: 16px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .info-label {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .info-value {
          color: #374151;
          font-weight: 500;
        }

        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hours-item {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }

        .day {
          color: #6b7280;
        }

        .hours {
          color: #374151;
          font-weight: 500;
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .amenity-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #374151;
        }

        .amenity-item i {
          color: #10b981;
          font-size: 12px;
        }

        .lessons-header, .instructors-header, .reviews-header, .access-header {
          margin-bottom: 24px;
        }

        .lessons-header h3, .instructors-header h3, .reviews-header h3, .access-header h3 {
          font-size: 24px;
          font-weight: 600;
          color: #e65100;
          margin-bottom: 8px;
        }

        .lessons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .lesson-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s ease;
        }

        .lesson-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: #ff9800;
        }

        .lesson-header {
          margin-bottom: 16px;
        }

        .lesson-name {
          font-size: 18px;
          font-weight: 600;
          color: #0d1117;
          margin: 0 0 8px 0;
        }

        .lesson-tags {
          display: flex;
          gap: 6px;
        }

        .level-tag {
          background: #dbeafe;
          color: #1e40af;
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
        }

        .lesson-info {
          margin-bottom: 12px;
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
          color: #ff9800;
          width: 16px;
        }

        .lesson-description {
          color: #374151;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .lesson-schedule h5 {
          font-size: 14px;
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 8px;
        }

        .schedule-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 16px;
        }

        .schedule-item {
          display: flex;
          justify-content: space-between;
          padding: 4px 8px;
          background: #ffffff;
          border-radius: 4px;
          font-size: 12px;
        }

        .lesson-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .price-info {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .price {
          font-size: 18px;
          font-weight: 700;
          color: #e65100;
        }

        .price-unit {
          font-size: 12px;
          color: #6b7280;
        }

        .availability-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .availability-status {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 8px;
          text-transform: uppercase;
        }

        .status-available {
          background: #d1fae5;
          color: #065f46;
        }

        .status-busy {
          background: #fef3c7;
          color: #92400e;
        }

        .status-full {
          background: #fee2e2;
          color: #dc2626;
        }

        .booking-count {
          font-size: 11px;
          color: #6b7280;
        }

        .book-btn {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .book-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
        }

        .book-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .instructors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .instructor-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }

        .instructor-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 16px;
          border: 3px solid #ff9800;
        }

        .instructor-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .instructor-name {
          font-size: 18px;
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 8px;
        }

        .instructor-specialties {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .specialty-tag {
          background: #fff3e0;
          color: #e65100;
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
        }

        .instructor-experience {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
          color: #6b7280;
          font-size: 14px;
        }

        .instructor-description {
          color: #374151;
          line-height: 1.5;
          font-size: 14px;
          text-align: left;
        }

        .reviews-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding: 20px;
          background: #f9fafb;
          border-radius: 12px;
        }

        .rating-summary {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .avg-rating {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .avg-rating .rating-value {
          font-size: 32px;
          font-weight: 700;
          color: #e65100;
        }

        .total-reviews {
          color: #6b7280;
        }

        .write-review-btn {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .review-item {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .reviewer-name {
          font-weight: 600;
          color: #0d1117;
        }

        .verified-badge {
          background: #d1fae5;
          color: #065f46;
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .review-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .review-date {
          font-size: 12px;
          color: #6b7280;
        }

        .review-title {
          font-size: 16px;
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 8px;
        }

        .review-content {
          color: #374151;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .review-actions {
          display: flex;
          gap: 12px;
        }

        .helpful-btn {
          background: none;
          border: 1px solid #d1d5db;
          color: #6b7280;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s ease;
        }

        .helpful-btn:hover {
          background: #f3f4f6;
          border-color: #ff9800;
          color: #ff9800;
        }

        .access-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .access-list {
          margin-bottom: 24px;
        }

        .access-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
          color: #374151;
        }

        .access-item i {
          color: #ff9800;
          width: 16px;
        }

        .address-info h4 {
          font-size: 16px;
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 8px;
        }

        .map-btn {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
        }

        .map-placeholder {
          background: #f3f4f6;
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-content {
          text-align: center;
          color: #6b7280;
        }

        .map-content i {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .map-description {
          font-size: 14px;
          margin-top: 8px;
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

        .booking-modal {
          background: #ffffff;
          border-radius: 16px;
          width: 90%;
          max-width: 500px;
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

        .booking-lesson-info {
          background: #f9fafb;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .booking-lesson-info h4 {
          margin: 0 0 8px 0;
          color: #0d1117;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #374151;
        }

        .form-group select,
        .form-group input {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
        }

        .form-group select:focus,
        .form-group input:focus {
          outline: none;
          border-color: #ff9800;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px 24px;
          border-top: 1px solid #e5e7eb;
        }

        .cancel-btn {
          padding: 10px 20px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          border-radius: 6px;
          cursor: pointer;
          color: #6b7280;
          font-weight: 500;
        }

        .confirm-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .studio-detail {
            padding: 16px;
          }

          .studio-header {
            flex-direction: column;
            gap: 20px;
          }

          .header-actions {
            flex-direction: row;
            justify-content: space-between;
          }

          .content-grid, .access-grid {
            grid-template-columns: 1fr;
          }

          .lessons-grid, .instructors-grid {
            grid-template-columns: 1fr;
          }

          .tab-navigation {
            flex-wrap: wrap;
          }

          .tab-btn {
            flex: none;
            min-width: 100px;
          }
        }
      `}</style>
    </div>
  )
}

export default StudioDetail