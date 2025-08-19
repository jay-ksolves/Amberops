
export type Cluster = {
  id: string;
  userId: string;
  name: string;
  status: 'healthy' | 'unhealthy' | 'degraded';
  hostCount: number;
  serviceCount: number;
  alertCount: number;
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  networkUsage: number;
  healthMetrics: {
    cpu: { value: number; trend: 'up' | 'down' | 'stable' };
    memory: { value: number; trend: 'up' | 'down' | 'stable' };
    disk: { value: number; trend: 'up' | 'down' | 'stable' };
  };
  historicalData: {
    date: string;
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  }[];
};

export type Service = {
  id: string;
  userId: string;
  name: string;
  status: 'started' | 'stopped' | 'maintenance';
  clusterId: string;
  clusterName: string;
  runningHosts: number;
  totalHosts: number;
  version: string;
};

export type Host = {
  id: string;
  userId: string;
  name: string;
  ip: string;
  status: 'healthy' | 'unhealthy' | 'restarting' | 'maintenance';
  clusterId: string;
  clusterName: string;
  cpuCores: number;
  memoryTotalGb: number;
  memoryUsedGb: number;
  storageTotalGb: number;
  storageUsedGb: number;
  os: string;
  lastHeartbeat: string;
};

export type Alert = {
  id: string;
  userId: string;
  name: string;
  severity: 'critical' | 'warning' | 'info';
  status: 'triggered' | 'acknowledged' | 'resolved';
  clusterId: string;
  clusterName: string;
  serviceName: string;
  hostName?: string;
  timestamp: Date;
  description: string;
  relatedLogs: string;
};

export type AlertDefinition = {
  id: string;
  userId: string;
  name: string;
  description: string;
  service: string;
  type: 'METRIC' | 'PORT' | 'SCRIPT';
  enabled: boolean;
};

export type ConfigVersion = {
  version: number;
  author: string;
  date: Date;
  notes: string;
};

export type Task = {
  id: number;
  userId: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  progress: number;
  startTime: Date;
  duration: string;
  user: string;
  target?: string;
  subRows?: Task[];
};

export type LogEntry = {
  timestamp: Date;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  host: string;
  component: string;
  message: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Operator' | 'Viewer';
  lastLogin: Date;
  avatar: string;
};

export type ActivityLog = {
    id: string;
    userId: string;
    user: User;
    action: 'LOGIN' | 'CREATE' | 'UPDATE' | 'DELETE' | 'RESTART' | 'ACKNOWLEDGE';
    details: string;
    timestamp: Date;
};

export type DocumentationArticle = {
    id: string;
    title: string;
    slug: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

export type LegalDocument = {
    type: 'terms' | 'privacy';
    content: string;
    updatedAt: Date;
};

export type PricingTier = {
    id: string;
    title: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    isFeatured: boolean;
};

export type Testimonial = {
    id: string;
    name: string;
    role: string;
    quote: string;
    avatar: string;
};

export type FAQ = {
    id: string;
    question: string;
    answer: string;
};
