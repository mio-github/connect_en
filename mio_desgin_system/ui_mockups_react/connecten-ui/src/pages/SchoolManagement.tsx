import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { Button } from '../components/UI/Button';
import '../styles/SchoolManagement.css';

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: 'active' | 'maintenance' | 'closed';
  studios: Studio[];
  businessHours: BusinessHours;
}

interface Studio {
  id: string;
  name: string;
  type: string;
  area: number;
  capacity: number;
  hourlyRate: number;
  equipment: string[];
}

interface BusinessHours {
  weekday: { open: string; close: string };
  weekend: { open: string; close: string };
}

export const SchoolManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'locations' | 'studios' | 'equipment' | 'settings'>('locations');
  const [showModal, setShowModal] = useState(false);

  const sampleLocations: Location[] = [
    {
      id: '1',
      name: 'SHIBUYA',
      address: '東京都渋谷区道玄坂2-10-12 新大宗ビル4号館B1F',
      phone: '03-6416-1340',
      email: 'shibuya@endance.studio',
      status: 'active',
      businessHours: {
        weekday: { open: '10:00', close: '22:00' },
        weekend: { open: '10:00', close: '22:00' }
      },
      studios: [
        {
          id: 's1',
          name: 'Studio A',
          type: '大スタジオ',
          area: 120,
          capacity: 30,
          hourlyRate: 8000,
          equipment: ['鏡張り', '音響設備', 'バレエバー']
        }
      ]
    },
    {
      id: '2',
      name: 'SCRAMBLE',
      address: '東京都渋谷区宇田川町36-22 ノア渋谷パートⅡ7F',
      phone: '03-6416-1340',
      email: 'scramble@endance.studio',
      status: 'active',
      businessHours: {
        weekday: { open: '10:00', close: '22:00' },
        weekend: { open: '10:00', close: '22:00' }
      },
      studios: [
        {
          id: 's2',
          name: 'Studio A',
          type: '中スタジオ',
          area: 90,
          capacity: 25,
          hourlyRate: 7000,
          equipment: ['鏡張り', '音響設備']
        }
      ]
    },
    {
      id: '3',
      name: 'YOKOHAMA',
      address: '神奈川県横浜市西区南幸2-20-5 東伸24ビル8F',
      phone: '045-620-5575',
      email: 'yokohama@endance.studio',
      status: 'active',
      businessHours: {
        weekday: { open: '10:00', close: '22:00' },
        weekend: { open: '10:00', close: '22:00' }
      },
      studios: [
        {
          id: 's3',
          name: 'Studio A',
          type: '大スタジオ',
          area: 110,
          capacity: 28,
          hourlyRate: 7500,
          equipment: ['鏡張り', '音響設備', 'バレエバー']
        }
      ]
    },
    {
      id: '4',
      name: 'YOKOHAMA2',
      address: '神奈川県横浜市西区南幸2-11-1 横浜MSビル8F',
      phone: '045-620-5575',
      email: 'yokohama2@endance.studio',
      status: 'active',
      businessHours: {
        weekday: { open: '10:00', close: '22:00' },
        weekend: { open: '10:00', close: '22:00' }
      },
      studios: [
        {
          id: 's4',
          name: 'Studio A',
          type: '中スタジオ',
          area: 85,
          capacity: 22,
          hourlyRate: 6500,
          equipment: ['鏡張り', '音響設備']
        }
      ]
    },
    {
      id: '5',
      name: 'ASHIKAGA',
      address: '栃木県足利市通3-2589',
      phone: '0284-64-9101',
      email: 'ashikaga@endance.studio',
      status: 'active',
      businessHours: {
        weekday: { open: '10:00', close: '22:00' },
        weekend: { open: '10:00', close: '22:00' }
      },
      studios: [
        {
          id: 's5',
          name: 'Studio A',
          type: '大スタジオ',
          area: 130,
          capacity: 32,
          hourlyRate: 6000,
          equipment: ['鏡張り', '音響設備', 'バレエバー']
        }
      ]
    },
    {
      id: '6',
      name: 'ISESAKI',
      address: '群馬県伊勢崎市宮子町3555-1 ベイシア伊勢崎モール1F',
      phone: '0270-61-5520',
      email: 'isesaki@endance.studio',
      status: 'active',
      businessHours: {
        weekday: { open: '10:00', close: '22:00' },
        weekend: { open: '10:00', close: '22:00' }
      },
      studios: [
        {
          id: 's6',
          name: 'Studio A',
          type: '大スタジオ',
          area: 125,
          capacity: 30,
          hourlyRate: 6000,
          equipment: ['鏡張り', '音響設備', 'バレエバー']
        }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: '営業中', className: 'badge-success' },
      maintenance: { label: 'メンテナンス中', className: 'badge-warning' },
      closed: { label: '休業中', className: 'badge-error' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <span className={`status-badge ${config.className}`}>{config.label}</span>;
  };

  const handleAddLocation = () => {
    setShowModal(true);
  };

  const handleExportData = () => {
    console.log('データをエクスポート中...');
    // 実装: エクスポート処理
  };

  return (
    <Layout>
      <div className="school-management">
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">スクール・施設管理</h1>
            <p className="page-subtitle">拠点情報とスタジオの管理</p>
          </div>
          <div className="page-actions">
            <Button variant="secondary" onClick={handleExportData}>
              <i className="fas fa-download"></i> エクスポート
            </Button>
            <Button variant="primary" onClick={handleAddLocation}>
              <i className="fas fa-plus"></i> 拠点追加
            </Button>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="tab-navigation">
          <button
            className={`tab-item ${activeTab === 'locations' ? 'active' : ''}`}
            onClick={() => setActiveTab('locations')}
          >
            拠点一覧
          </button>
          <button
            className={`tab-item ${activeTab === 'studios' ? 'active' : ''}`}
            onClick={() => setActiveTab('studios')}
          >
            スタジオ管理
          </button>
          <button
            className={`tab-item ${activeTab === 'equipment' ? 'active' : ''}`}
            onClick={() => setActiveTab('equipment')}
          >
            設備・備品
          </button>
          <button
            className={`tab-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            基本設定
          </button>
        </div>

        {/* 拠点一覧タブ */}
        {activeTab === 'locations' && (
          <div className="tab-content">
            <div className="locations-grid">
              {sampleLocations.map((location) => (
                <div key={location.id} className="location-card">
                  <div className="location-header">
                    <div className="location-title">
                      <h3>{location.name}</h3>
                      {getStatusBadge(location.status)}
                    </div>
                    <div className="location-actions">
                      <button className="action-btn" title="編集">✏️</button>
                      <button className="action-btn" title="詳細">👁️</button>
                    </div>
                  </div>

                  <div className="location-details">
                    <div className="detail-item">
                      <span className="detail-label">所在地</span>
                      <span className="detail-value">{location.address}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">電話番号</span>
                      <span className="detail-value">{location.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">営業時間</span>
                      <span className="detail-value">
                        平日 {location.businessHours.weekday.open}-{location.businessHours.weekday.close} / 
                        週末 {location.businessHours.weekend.open}-{location.businessHours.weekend.close}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">スタジオ数</span>
                      <span className="detail-value">{location.studios.length}スタジオ</span>
                    </div>
                  </div>

                  {/* スタジオ一覧 */}
                  <div className="studios-grid">
                    {location.studios.map((studio) => (
                      <div key={studio.id} className="studio-card">
                        <div className="studio-header">
                          <span className="studio-name">{studio.name}</span>
                          <span className="studio-type">{studio.type}</span>
                        </div>
                        <div className="studio-info">
                          <div className="studio-stat">
                            <span className="stat-label">面積</span>
                            <span className="stat-value">{studio.area}㎡</span>
                          </div>
                          <div className="studio-stat">
                            <span className="stat-label">定員</span>
                            <span className="stat-value">{studio.capacity}名</span>
                          </div>
                          <div className="studio-stat">
                            <span className="stat-label">料金/時間</span>
                            <span className="stat-value">¥{studio.hourlyRate.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="equipment-tags">
                          {studio.equipment.map((item, index) => (
                            <span key={index} className="equipment-tag">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 営業時間詳細 */}
                  <div className="business-hours">
                    <h4 className="hours-title">営業時間詳細</h4>
                    <div className="hours-grid">
                      {['月', '火', '水', '木', '金'].map((day) => (
                        <div key={day} className="hours-row">
                          <span className="hours-day">{day}曜日</span>
                          <span className="hours-time">
                            {location.businessHours.weekday.open} - {location.businessHours.weekday.close}
                          </span>
                        </div>
                      ))}
                      {['土', '日'].map((day) => (
                        <div key={day} className="hours-row">
                          <span className="hours-day">{day}曜日</span>
                          <span className="hours-time">
                            {location.businessHours.weekend.open} - {location.businessHours.weekend.close}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 他のタブコンテンツ（プレースホルダー） */}
        {activeTab === 'studios' && (
          <div className="tab-content">
            <div className="placeholder-content">
              <h3>スタジオ管理</h3>
              <p>スタジオの詳細管理機能を実装予定</p>
            </div>
          </div>
        )}

        {activeTab === 'equipment' && (
          <div className="tab-content">
            <div className="placeholder-content">
              <h3>設備・備品管理</h3>
              <p>設備や備品の管理機能を実装予定</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="tab-content">
            <div className="placeholder-content">
              <h3>基本設定</h3>
              <p>システムの基本設定を実装予定</p>
            </div>
          </div>
        )}

        {/* 拠点追加モーダル（プレースホルダー） */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>新規拠点追加</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>拠点追加フォームを実装予定</p>
              </div>
              <div className="modal-footer">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  キャンセル
                </Button>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                  拠点を追加
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};