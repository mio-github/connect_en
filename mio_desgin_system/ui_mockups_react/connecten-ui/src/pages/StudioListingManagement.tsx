import React, { useState } from 'react';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Modal } from '../components/UI/Modal';

interface StudioListing {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  images: string[];
  videos: string[];
  amenities: string[];
  genres: string[];
  priceRange: string;
  rating: number;
  reviewCount: number;
  status: 'active' | 'pending' | 'inactive';
  plan: 'free' | 'basic' | 'premium';
}

export const StudioListingManagement: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('basic');
  const [listing, setListing] = useState<StudioListing>({
    id: '1',
    name: 'En Dance Studio 渋谷校',
    description: '渋谷駅徒歩3分の好立地にあるダンススタジオです。初心者から上級者まで、幅広いレベルのレッスンを提供しています。',
    address: '東京都渋谷区渋谷1-1-1',
    phone: '03-1234-5678',
    email: 'shibuya@endance.com',
    website: 'https://endance.com',
    images: ['studio1.jpg', 'studio2.jpg', 'studio3.jpg'],
    videos: ['intro.mp4'],
    amenities: ['更衣室', 'シャワー', '駐車場', 'WiFi', '託児所'],
    genres: ['ヒップホップ', 'ジャズダンス', 'バレエ', 'K-POP'],
    priceRange: '¥2,000 - ¥5,000',
    rating: 4.7,
    reviewCount: 89,
    status: 'active',
    plan: 'premium'
  });

  const tabs = [
    { id: 'basic', label: '基本情報', icon: 'fas fa-info-circle' },
    { id: 'media', label: '写真・動画', icon: 'fas fa-images' },
    { id: 'amenities', label: '設備・サービス', icon: 'fas fa-star' },
    { id: 'seo', label: 'SEO設定', icon: 'fas fa-search' },
    { id: 'analytics', label: 'パフォーマンス', icon: 'fas fa-chart-line' }
  ];

  const handleSave = () => {
    console.log('保存処理', listing);
    setIsEditModalOpen(false);
  };

  const handleImageUpload = () => {
    console.log('画像アップロード処理');
  };

  const handleVideoUpload = () => {
    console.log('動画アップロード処理');
  };

  const getPlanBadge = (plan: string) => {
    const planConfig = {
      free: { label: '無料プラン', className: 'plan-free' },
      basic: { label: 'ベーシック', className: 'plan-basic' },
      premium: { label: 'プレミアム', className: 'plan-premium' }
    };

    const config = planConfig[plan as keyof typeof planConfig] || planConfig.free;
    return <span className={`plan-badge ${config.className}`}>{config.label}</span>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: '公開中', className: 'status-active' },
      pending: { label: '審査中', className: 'status-pending' },
      inactive: { label: '非公開', className: 'status-inactive' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <span className={`status-badge ${config.className}`}>{config.label}</span>;
  };

  return (
    <div className="studio-listing-management">
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <h1>
              <i className="fas fa-edit text-orange-500"></i>
              スタジオページ管理
            </h1>
            <p className="header-subtitle">
              マーケットプレイスでのスタジオ情報を管理
            </p>
          </div>
          <div className="header-actions">
            <Button variant="secondary">
              <i className="fas fa-eye"></i> プレビュー
            </Button>
            <Button variant="primary" onClick={() => setIsEditModalOpen(true)}>
              <i className="fas fa-edit"></i> 編集
            </Button>
          </div>
        </div>
      </div>

      {/* 現在の掲載状況 */}
      <div className="listing-status-card">
        <div className="status-header">
          <h3>掲載状況</h3>
          <div className="status-badges">
            {getStatusBadge(listing.status)}
            {getPlanBadge(listing.plan)}
          </div>
        </div>
        <div className="status-metrics">
          <div className="metric">
            <div className="metric-value">{listing.rating}⭐</div>
            <div className="metric-label">平均評価</div>
          </div>
          <div className="metric">
            <div className="metric-value">{listing.reviewCount}</div>
            <div className="metric-label">レビュー数</div>
          </div>
          <div className="metric">
            <div className="metric-value">2,847</div>
            <div className="metric-label">月間表示回数</div>
          </div>
          <div className="metric">
            <div className="metric-value">156</div>
            <div className="metric-label">今月の予約</div>
          </div>
        </div>
      </div>

      {/* 現在の掲載内容プレビュー */}
      <div className="listing-preview">
        <h3>掲載内容プレビュー</h3>
        <div className="preview-card">
          <div className="preview-header">
            <div className="studio-image">
              <i className="fas fa-image text-4xl text-gray-400"></i>
              <div className="image-overlay">
                <span>{listing.images.length}枚の写真</span>
              </div>
            </div>
            <div className="studio-info">
              <h4>{listing.name}</h4>
              <div className="studio-meta">
                <span className="address">
                  <i className="fas fa-map-marker-alt"></i> {listing.address}
                </span>
                <span className="price-range">
                  <i className="fas fa-yen-sign"></i> {listing.priceRange}
                </span>
              </div>
              <div className="genres">
                {listing.genres.map((genre, index) => (
                  <span key={index} className="genre-tag">{genre}</span>
                ))}
              </div>
              <p className="description">{listing.description}</p>
            </div>
          </div>
          <div className="preview-amenities">
            <h5>設備・サービス</h5>
            <div className="amenities-list">
              {listing.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">
                  <i className="fas fa-check"></i> {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 編集モーダル */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="スタジオ情報編集">
        <div className="edit-modal-content">
          {/* タブナビゲーション */}
          <div className="tab-navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${selectedTab === tab.id ? 'active' : ''}`}
                onClick={() => setSelectedTab(tab.id)}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </div>

          {/* タブコンテンツ */}
          <div className="tab-content">
            {selectedTab === 'basic' && (
              <div className="basic-info-form">
                <div className="form-row">
                  <Input
                    label="スタジオ名"
                    value={listing.name}
                    onChange={(e) => setListing({...listing, name: e.target.value})}
                    placeholder="スタジオ名を入力"
                  />
                </div>
                <div className="form-row">
                  <label>説明文</label>
                  <textarea
                    value={listing.description}
                    onChange={(e) => setListing({...listing, description: e.target.value})}
                    placeholder="スタジオの特徴や魅力を説明してください"
                    rows={4}
                  />
                </div>
                <div className="form-row">
                  <Input
                    label="住所"
                    value={listing.address}
                    onChange={(e) => setListing({...listing, address: e.target.value})}
                    placeholder="住所を入力"
                  />
                </div>
                <div className="form-row-group">
                  <Input
                    label="電話番号"
                    value={listing.phone}
                    onChange={(e) => setListing({...listing, phone: e.target.value})}
                    placeholder="03-1234-5678"
                  />
                  <Input
                    label="メールアドレス"
                    value={listing.email}
                    onChange={(e) => setListing({...listing, email: e.target.value})}
                    placeholder="contact@studio.com"
                  />
                </div>
              </div>
            )}

            {selectedTab === 'media' && (
              <div className="media-form">
                <div className="media-section">
                  <h4>写真管理</h4>
                  <div className="image-upload-area">
                    <div className="upload-zone">
                      <i className="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                      <p>画像をドラッグ&ドロップまたはクリックして選択</p>
                      <Button variant="outline" onClick={handleImageUpload}>
                        <i className="fas fa-plus"></i> 画像を追加
                      </Button>
                    </div>
                    <div className="current-images">
                      {listing.images.map((image, index) => (
                        <div key={index} className="image-item">
                          <div className="image-placeholder">
                            <i className="fas fa-image"></i>
                          </div>
                          <div className="image-actions">
                            <button className="action-btn">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="action-btn delete">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="media-section">
                  <h4>動画管理</h4>
                  <div className="video-upload-area">
                    <Button variant="outline" onClick={handleVideoUpload}>
                      <i className="fas fa-video"></i> 動画をアップロード
                    </Button>
                    <p className="upload-note">
                      推奨: MP4形式、最大100MB、横向き推奨
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'amenities' && (
              <div className="amenities-form">
                <div className="amenities-section">
                  <h4>ダンスジャンル</h4>
                  <div className="checkbox-grid">
                    {['ヒップホップ', 'ジャズダンス', 'バレエ', 'K-POP', 'ブレイキング', '社交ダンス', 'フラダンス', 'ベリーダンス'].map((genre) => (
                      <label key={genre} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={listing.genres.includes(genre)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setListing({...listing, genres: [...listing.genres, genre]});
                            } else {
                              setListing({...listing, genres: listing.genres.filter(g => g !== genre)});
                            }
                          }}
                        />
                        <span>{genre}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="amenities-section">
                  <h4>設備・サービス</h4>
                  <div className="checkbox-grid">
                    {['更衣室', 'シャワー', '駐車場', 'WiFi', '託児所', 'ロッカー', '空調完備', '鏡完備', '音響設備', 'レンタルシューズ'].map((amenity) => (
                      <label key={amenity} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={listing.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setListing({...listing, amenities: [...listing.amenities, amenity]});
                            } else {
                              setListing({...listing, amenities: listing.amenities.filter(a => a !== amenity)});
                            }
                          }}
                        />
                        <span>{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'seo' && (
              <div className="seo-form">
                <div className="seo-section">
                  <h4>検索エンジン最適化</h4>
                  <div className="form-row">
                    <Input
                      label="メタタイトル"
                      placeholder="検索結果に表示されるタイトル"
                    />
                    <div className="char-count">0/60文字</div>
                  </div>
                  <div className="form-row">
                    <label>メタディスクリプション</label>
                    <textarea
                      placeholder="検索結果に表示される説明文"
                      rows={3}
                    />
                    <div className="char-count">0/160文字</div>
                  </div>
                  <div className="form-row">
                    <Input
                      label="キーワード"
                      placeholder="カンマ区切りでキーワードを入力"
                    />
                  </div>
                </div>

                <div className="seo-preview">
                  <h4>検索結果プレビュー</h4>
                  <div className="search-preview">
                    <div className="preview-title">{listing.name} | ダンススタジオ</div>
                    <div className="preview-url">https://connecten.com/studio/shibuya</div>
                    <div className="preview-description">{listing.description}</div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'analytics' && (
              <div className="analytics-form">
                <div className="analytics-section">
                  <h4>掲載パフォーマンス</h4>
                  <div className="performance-grid">
                    <div className="performance-card">
                      <div className="performance-value">2,847</div>
                      <div className="performance-label">今月の表示回数</div>
                      <div className="performance-change positive">+12.5%</div>
                    </div>
                    <div className="performance-card">
                      <div className="performance-value">156</div>
                      <div className="performance-label">今月の予約数</div>
                      <div className="performance-change positive">+8.3%</div>
                    </div>
                    <div className="performance-card">
                      <div className="performance-value">5.5%</div>
                      <div className="performance-label">コンバージョン率</div>
                      <div className="performance-change negative">-0.2%</div>
                    </div>
                  </div>
                </div>

                <div className="optimization-suggestions">
                  <h4>最適化提案</h4>
                  <div className="suggestion-list">
                    <div className="suggestion-item">
                      <i className="fas fa-lightbulb text-yellow-500"></i>
                      <div>
                        <div className="suggestion-title">写真を追加してください</div>
                        <div className="suggestion-desc">スタジオの写真が3枚以下です。10枚以上の写真でコンバージョン率が20%向上します。</div>
                      </div>
                    </div>
                    <div className="suggestion-item">
                      <i className="fas fa-star text-blue-500"></i>
                      <div>
                        <div className="suggestion-title">レビューへの返信を増やしましょう</div>
                        <div className="suggestion-desc">レビューへの返信率が30%です。80%以上で信頼度が向上します。</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              キャンセル
            </Button>
            <Button variant="primary" onClick={handleSave}>
              <i className="fas fa-save"></i> 保存
            </Button>
          </div>
        </div>
      </Modal>

      <style jsx>{`
        .studio-listing-management {
          padding: 24px;
          background: #fafafa;
          min-height: 100vh;
        }

        .page-header {
          background: linear-gradient(135deg, #fff3e0 0%, #ffffff 100%);
          border: 2px solid #ff9800;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 0 4px 20px rgba(255, 152, 0, 0.1);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .header-title h1 {
          font-size: 32px;
          font-weight: 700;
          color: #e65100;
          margin: 0 0 8px 0;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-subtitle {
          font-size: 16px;
          color: #bf360c;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 16px;
        }

        .listing-status-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .status-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #0d1117;
          margin: 0;
        }

        .status-badges {
          display: flex;
          gap: 12px;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.status-active {
          background: #dcfce7;
          color: #15803d;
        }

        .status-badge.status-pending {
          background: #fef3c7;
          color: #d97706;
        }

        .status-badge.status-inactive {
          background: #fee2e2;
          color: #dc2626;
        }

        .plan-badge {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .plan-badge.plan-free {
          background: #f3f4f6;
          color: #6b7280;
        }

        .plan-badge.plan-basic {
          background: #dbeafe;
          color: #2563eb;
        }

        .plan-badge.plan-premium {
          background: #fef3c7;
          color: #d97706;
        }

        .status-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .metric {
          text-align: center;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #0d1117;
          margin-bottom: 4px;
        }

        .metric-label {
          font-size: 12px;
          color: #6b7785;
        }

        .listing-preview {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }

        .listing-preview h3 {
          font-size: 20px;
          font-weight: 600;
          color: #0d1117;
          margin: 0 0 20px 0;
        }

        .preview-card {
          border: 2px solid #f3f4f6;
          border-radius: 12px;
          overflow: hidden;
        }

        .preview-header {
          display: flex;
          gap: 20px;
          padding: 20px;
        }

        .studio-image {
          width: 200px;
          height: 150px;
          background: #f8f9fa;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }

        .image-overlay {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }

        .studio-info {
          flex: 1;
        }

        .studio-info h4 {
          font-size: 24px;
          font-weight: 700;
          color: #0d1117;
          margin: 0 0 12px 0;
        }

        .studio-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #6b7785;
        }

        .genres {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .genre-tag {
          background: #e9ecef;
          color: #495057;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .description {
          color: #6b7785;
          line-height: 1.5;
          margin: 0;
        }

        .preview-amenities {
          padding: 20px;
          border-top: 1px solid #f3f4f6;
          background: #f8f9fa;
        }

        .preview-amenities h5 {
          font-size: 16px;
          font-weight: 600;
          color: #0d1117;
          margin: 0 0 12px 0;
        }

        .amenities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .amenity-tag {
          background: white;
          color: #15803d;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          border: 1px solid #dcfce7;
        }

        .edit-modal-content {
          width: 800px;
          max-width: 90vw;
        }

        .tab-navigation {
          display: flex;
          border-bottom: 2px solid #f3f4f6;
          margin-bottom: 24px;
        }

        .tab-button {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: none;
          color: #6b7785;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .tab-button.active {
          color: #ff9800;
          border-bottom: 3px solid #ff9800;
        }

        .tab-button:hover {
          color: #ff9800;
        }

        .tab-content {
          min-height: 400px;
        }

        .form-row {
          margin-bottom: 20px;
        }

        .form-row label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #0d1117;
        }

        .form-row textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-family: inherit;
          resize: vertical;
        }

        .form-row-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .char-count {
          text-align: right;
          font-size: 12px;
          color: #6b7785;
          margin-top: 4px;
        }

        .image-upload-area {
          border: 2px dashed #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          margin-bottom: 20px;
        }

        .upload-zone p {
          margin: 12px 0;
          color: #6b7785;
        }

        .current-images {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }

        .image-item {
          position: relative;
          background: #f8f9fa;
          border-radius: 8px;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-actions {
          position: absolute;
          top: 8px;
          right: 8px;
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .image-item:hover .image-actions {
          opacity: 1;
        }

        .action-btn {
          width: 24px;
          height: 24px;
          border: none;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn.delete {
          background: #dc2626;
        }

        .video-upload-area {
          text-align: center;
          padding: 24px;
          border: 2px dashed #e5e7eb;
          border-radius: 12px;
        }

        .upload-note {
          margin-top: 8px;
          font-size: 12px;
          color: #6b7785;
        }

        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .checkbox-item:hover {
          background: #f8f9fa;
        }

        .checkbox-item input {
          margin: 0;
        }

        .search-preview {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid #4285f4;
        }

        .preview-title {
          color: #1a0dab;
          font-size: 18px;
          margin-bottom: 4px;
        }

        .preview-url {
          color: #006621;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .preview-description {
          color: #545454;
          font-size: 14px;
          line-height: 1.4;
        }

        .performance-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .performance-card {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          text-align: center;
        }

        .performance-value {
          font-size: 24px;
          font-weight: 700;
          color: #0d1117;
          margin-bottom: 4px;
        }

        .performance-label {
          font-size: 12px;
          color: #6b7785;
          margin-bottom: 8px;
        }

        .performance-change {
          font-size: 12px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .performance-change.positive {
          background: #dcfce7;
          color: #15803d;
        }

        .performance-change.negative {
          background: #fee2e2;
          color: #dc2626;
        }

        .suggestion-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .suggestion-item {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #ff9800;
        }

        .suggestion-title {
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 4px;
        }

        .suggestion-desc {
          font-size: 14px;
          color: #6b7785;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #f3f4f6;
        }

        @media (max-width: 768px) {
          .studio-listing-management {
            padding: 16px;
          }

          .header-content {
            flex-direction: column;
            gap: 16px;
          }

          .status-metrics {
            grid-template-columns: repeat(2, 1fr);
          }

          .preview-header {
            flex-direction: column;
          }

          .studio-image {
            width: 100%;
            height: 200px;
          }

          .checkbox-grid {
            grid-template-columns: 1fr;
          }

          .performance-grid {
            grid-template-columns: 1fr;
          }

          .form-row-group {
            grid-template-columns: 1fr;
          }

          .edit-modal-content {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};