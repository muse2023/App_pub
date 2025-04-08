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

type PlatformType = 'windows' | 'macos' | 'linux' | 'android';

interface VersionInfo {
  version: string;
  date: string;
  size: string;
  url: string;
}

interface MacOSVersionInfo extends VersionInfo {
  chipType: 'intel' | 'm';
}

interface ThirdPartyInfo {
  name: string;
  date: string;
  url: string;
}

type PlatformInfo = {
  windows: {
    exclusive: VersionInfo & { color: string };
    thirdParty: ThirdPartyInfo[];
  };
  macos: {
    exclusive: {
      intel: MacOSVersionInfo & { color: string };
      m: MacOSVersionInfo & { color: string };
    };
    thirdParty: ThirdPartyInfo[];
  };
  linux: {
    exclusive: VersionInfo & { color: string };
    thirdParty: ThirdPartyInfo[];
  };
  android: {
    exclusive: VersionInfo & { color: string };
    thirdParty: ThirdPartyInfo[];
  };
};

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

interface ThirdPartyCardProps {
  name: string;
  date: string;
  url: string;
}

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('windows');
  const platformData = PLATFORM_DATA[selectedPlatform];

  const renderExclusiveClient = () => {
    if (selectedPlatform === 'macos') {
      return (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 mb-4">
            <div className="flex items-center space-x-2">
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">专属客户端 (Intel)</span>
              <span className="font-medium text-blue-900">{PLATFORM_DATA.macos.exclusive.intel.version}</span>
            </div>
            <a 
              href={PLATFORM_DATA.macos.exclusive.intel.url}
              className="w-full sm:w-auto bg-gray-800 text-white px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition flex items-center justify-center sm:justify-start space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download for Intel</span>
            </a>
          </div>
          <div className="text-sm text-blue-800 mb-4">
            <p>Released: {PLATFORM_DATA.macos.exclusive.intel.date}</p>
            <p>Size: {PLATFORM_DATA.macos.exclusive.intel.size}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 mb-4">
            <div className="flex items-center space-x-2">
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">专属客户端 (M系列芯片)</span>
              <span className="font-medium text-blue-900">{PLATFORM_DATA.macos.exclusive.m.version}</span>
            </div>
            <a 
              href={PLATFORM_DATA.macos.exclusive.m.url}
              className="w-full sm:w-auto bg-gray-800 text-white px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition flex items-center justify-center sm:justify-start space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download for M Series</span>
            </a>
          </div>
          <div className="text-sm text-blue-800">
            <p>Released: {PLATFORM_DATA.macos.exclusive.m.date}</p>
            <p>Size: {PLATFORM_DATA.macos.exclusive.m.size}</p>
          </div>
        </>
      );
    }

    const exclusive = platformData.exclusive as VersionInfo & { color: string };
    return (
      <>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 mb-4">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">专属客户端</span>
            <span className="font-medium text-blue-900">{exclusive.version}</span>
          </div>
          <a 
            href={exclusive.url}
            className="w-full sm:w-auto bg-blue-600 text-white px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center sm:justify-start space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        </div>
        <div className="text-sm text-blue-800">
          <p>Released: {exclusive.date}</p>
          <p>Size: {exclusive.size}</p>
        </div>
      </>
    );
  };

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
              color={PLATFORM_DATA.windows.exclusive.color}
            />
            <PlatformButton
              icon={<Apple className="w-5 h-5" />}
              platform="macos"
              selected={selectedPlatform === 'macos'}
              onClick={() => setSelectedPlatform('macos')}
              color={PLATFORM_DATA.macos.exclusive.intel.color}
            />
            <PlatformButton
              icon={<Linux className="w-5 h-5" />}
              platform="linux"
              selected={selectedPlatform === 'linux'}
              onClick={() => setSelectedPlatform('linux')}
              color={PLATFORM_DATA.linux.exclusive.color}
            />
            <PlatformButton
              icon={<Smartphone className="w-5 h-5" />}
              platform="android"
              selected={selectedPlatform === 'android'}
              onClick={() => setSelectedPlatform('android')}
              color={PLATFORM_DATA.android.exclusive.color}
            />
          </div>

          {/* Latest Version */}
          <div className="bg-blue-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            {renderExclusiveClient()}
          </div>

          {/* Previous Versions */}
          <div>
            <div className="flex items-center space-x-2 text-gray-600 mb-4">
              <History className="w-4 h-4" />
              <span className="text-sm font-medium">第三方软件</span>
            </div>
            <div className="space-y-3">
              {platformData.thirdParty.map((software) => (
                <ThirdPartyCard
                  key={software.name}
                  name={software.name}
                  date={software.date}
                  url={software.url}
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

function ThirdPartyCard({ name, date, url }: ThirdPartyCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium text-gray-800">{name}</h4>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
        <div className="flex items-center space-x-4">
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

const PLATFORM_DATA: PlatformInfo = {
  windows: {
    exclusive: {
      version: "v0.1.0",
      date: "4, 20, 2025",
      size: "26.1 MB",
      url: "https://bigmeapp.blob.core.windows.net/app/BigME-0.1.0-windows-amd64-setup.exe",
      color: "bg-blue-600"
    },
    thirdParty: [
      { name: "Clash For Windows", date: "2024-02-15", url: "http://list.163cdn.us/ClashForWindows/Clash.for.Windows.Setup.0.20.39.exe" },
      { name: "Clash For Windows|汉化", date: "2024-01-10", url: "https://ghfast.top/https://github.com/Z-Siqi/Clash-for-Windows_Chinese/releases/download/CFW-V0.20.39_OPT-1/Clash.for.Windows.Setup.0.20.39_Opt-1.exe" },
    ]
  },
  macos: {
    exclusive: {
      intel: {
        version: "v0.1.0",
        date: "4, 20, 2025",
        size: "38.5 MB",
        url: "https://bigmeapp.blob.core.windows.net/app/BigME-0.1.0-macos-amd64.dmg",
        chipType: 'intel',
        color: "bg-gray-800"
      },
      m: {
        version: "v0.1.0",
        date: "4, 20, 2025",
        size: "35.2 MB",
        url: "https://bigmeapp.blob.core.windows.net/app/BigME-0.1.0-macos-arm64.dmg",
        chipType: 'm',
        color: "bg-gray-800"
      }
    },
    thirdParty: [
      { name: "Mihomo Party", date: "2024-02-15", url: "https://mihomo.party" }
    ]
  },
  linux: {
    exclusive: {
      version: "v0.1.0",
      date: "4, 20, 2025",
      size: "35.2 MB",
      url: "https://bigmeapp.blob.core.windows.net/app/BigME-0.1.0-linux-amd64.deb",
      color: "bg-orange-600"
    },
    thirdParty: [
      { name: "Shell Clash", date: "2024-02-15", url: "https://github.com/liyaoxuan/ShellClash" }
    ]
  },
  android: {
    exclusive: {
      version: "v0.1.0",
      date: "4, 20, 2025",
      size: "15.2 MB",
      url: "https://bigmeapp.blob.core.windows.net/app/BigME-0.1.0-android-arm64-v8a.apk",
      color: "bg-green-600"
    },
    thirdParty: [
      { name: "ClashMetaForAndroid", date: "2024-02-15", url: "http://114.66.63.182:5244/d/riolu%20download/%E7%AC%AC%E4%B8%89%E6%96%B9%E5%AE%A2%E6%88%B7%E7%AB%AF/Android/cmfa-2.11.5-meta-arm64-v8a-release.apk" }
    ]
  }
} as const;

export default App;