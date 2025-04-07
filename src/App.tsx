import React, { useState } from 'react';
import { 
  AppWindow as Windows, 
  Apple, 
  Smartphone, 
  History, 
  Download, 
  ChevronDown,
  Zap,
  Shield,
  Laptop,
  MonitorDown as Linux
} from 'lucide-react';

interface VersionInfo {
  version: string;
  date: string;
  size: string;
  url: string;
}

interface PlatformInfo {
  latest: VersionInfo & {
    color: string;
  };
  history: VersionInfo[];
}

const PLATFORM_DATA: Record<PlatformType, PlatformInfo> = {
  windows: {
    latest: {
      version: "v3.0.1",
      date: "March 20, 2024",
      size: "42.5 MB",
      url: "https://download.example.com/windows/3.0.1",
      color: "bg-blue-600"
    },
    history: [
      { version: "v2.9.0", date: "2024-02-15", size: "41.2 MB", url: "https://download.example.com/windows/2.9.0" },
      { version: "v2.8.2", date: "2024-01-10", size: "40.9 MB", url: "https://download.example.com/windows/2.8.2" },
      { version: "v2.8.1", date: "2023-12-20", size: "40.8 MB", url: "https://download.example.com/windows/2.8.1" }
    ]
  },
  macos: {
    latest: {
      version: "v3.0.1",
      date: "March 20, 2024",
      size: "38.5 MB",
      url: "https://download.example.com/macos/3.0.1",
      color: "bg-gray-800"
    },
    history: [
      { version: "v2.9.0", date: "2024-02-15", size: "37.2 MB", url: "https://download.example.com/macos/2.9.0" },
      { version: "v2.8.2", date: "2024-01-10", size: "36.9 MB", url: "https://download.example.com/macos/2.8.2" },
      { version: "v2.8.1", date: "2023-12-20", size: "36.8 MB", url: "https://download.example.com/macos/2.8.1" }
    ]
  },
  linux: {
    latest: {
      version: "v3.0.1",
      date: "March 20, 2024",
      size: "35.2 MB",
      url: "https://download.example.com/linux/3.0.1",
      color: "bg-orange-600"
    },
    history: [
      { version: "v2.9.0", date: "2024-02-15", size: "34.8 MB", url: "https://download.example.com/linux/2.9.0" },
      { version: "v2.8.2", date: "2024-01-10", size: "34.5 MB", url: "https://download.example.com/linux/2.8.2" },
      { version: "v2.8.1", date: "2023-12-20", size: "34.2 MB", url: "https://download.example.com/linux/2.8.1" }
    ]
  },
  android: {
    latest: {
      version: "v3.0.1",
      date: "March 20, 2024",
      size: "15.2 MB",
      url: "https://download.example.com/android/3.0.1",
      color: "bg-green-600"
    },
    history: [
      { version: "v2.9.0", date: "2024-02-15", size: "14.8 MB", url: "https://download.example.com/android/2.9.0" },
      { version: "v2.8.2", date: "2024-01-10", size: "14.5 MB", url: "https://download.example.com/android/2.8.2" },
      { version: "v2.8.1", date: "2023-12-20", size: "14.2 MB", url: "https://download.example.com/android/2.8.1" }
    ]
  }
} as const;

type PlatformType = 'windows' | 'macos' | 'linux' | 'android';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
}

interface PlatformButtonProps {
  icon: React.ReactNode;
  platform: PlatformType;
  selected: boolean;
  onClick: () => void;
  color: string;
}

interface VersionCardProps extends VersionInfo {}

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('windows');
  const platformData = PLATFORM_DATA[selectedPlatform];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex items-center space-x-2">
          <span className="text-2xl sm:text-3xl">🍚</span>
          <span className="text-lg sm:text-xl font-bold text-gray-800">BigME App</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Download BigME App</h1>
          <p className="text-gray-600 text-sm sm:text-base">选择你的平台然后开始！</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto mb-8 sm:mb-12">
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-blue-600" />}
            title="Fast"
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-blue-600" />}
            title="Secure"
          />
          <FeatureCard
            icon={<Laptop className="w-6 h-6 text-blue-600" />}
            title="Cross-platform"
          />
        </div>

        {/* Download Section */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
            <PlatformButton
              icon={<Windows className="w-5 h-5" />}
              platform="windows"
              selected={selectedPlatform === 'windows'}
              onClick={() => setSelectedPlatform('windows')}
              color={PLATFORM_DATA.windows.latest.color}
            />
            <PlatformButton
              icon={<Apple className="w-5 h-5" />}
              platform="macos"
              selected={selectedPlatform === 'macos'}
              onClick={() => setSelectedPlatform('macos')}
              color={PLATFORM_DATA.macos.latest.color}
            />
            <PlatformButton
              icon={<Linux className="w-5 h-5" />}
              platform="linux"
              selected={selectedPlatform === 'linux'}
              onClick={() => setSelectedPlatform('linux')}
              color={PLATFORM_DATA.linux.latest.color}
            />
            <PlatformButton
              icon={<Smartphone className="w-5 h-5" />}
              platform="android"
              selected={selectedPlatform === 'android'}
              onClick={() => setSelectedPlatform('android')}
              color={PLATFORM_DATA.android.latest.color}
            />
          </div>

          {/* Latest Version */}
          <div className="bg-blue-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 mb-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">最新</span>
                <span className="font-medium text-blue-900">{platformData.latest.version}</span>
              </div>
              <a 
                href={platformData.latest.url}
                className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center sm:justify-start space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            </div>
            <div className="text-sm text-blue-800">
              <p>Released: {platformData.latest.date}</p>
              <p>Size: {platformData.latest.size}</p>
            </div>
          </div>

          {/* Previous Versions */}
          <div>
            <div className="flex items-center space-x-2 text-gray-600 mb-4">
              <History className="w-4 h-4" />
              <span className="text-sm font-medium">Previous Versions</span>
            </div>
            <div className="space-y-3">
              {platformData.history.map((version) => (
                <VersionCard
                  key={version.version}
                  version={version.version}
                  date={version.date}
                  size={version.size}
                  url={version.url}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title }: FeatureCardProps) {
  return (
    <div className="p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300 text-center">
      <div className="mb-2 flex justify-center">{icon}</div>
      <h3 className="text-sm font-medium text-gray-800">{title}</h3>
    </div>
  );
}

function PlatformButton({ icon, platform, selected, onClick, color }: PlatformButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition ${
        selected 
          ? `${color} text-white shadow-md` 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span className="text-sm font-medium capitalize">{platform}</span>
    </button>
  );
}

function VersionCard({ version, date, size, url }: VersionCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium text-gray-800">{version}</h4>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-500">{size}</span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <ChevronDown className={`w-4 h-4 transform transition ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-end">
            <a
              href={url}
              className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded text-sm hover:bg-gray-300 transition flex items-center space-x-1.5"
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;