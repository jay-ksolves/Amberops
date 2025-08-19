
import type { Cluster, Service, Host, Alert, AlertDefinition, ConfigVersion, Task, LogEntry, User, ActivityLog, PricingTier, Testimonial, FAQ } from '@amberops/lib/types';

// --- User IDs for Seed Data ---
// We define these IDs statically so we can consistently associate data with the same users.
// These MUST be valid 24-character hex strings for MongoDB ObjectId.
export const DEFAULT_USER_ID = '665f5a9e3f9e9d6a2e4e1b2c';
export const ADMIN_USER_ID = '665f5a9e3f9e9d6a2e4e1b2d';
export const TEST_USER_ID = '665f5a9e3f9e9d6a2e4e1b2e';

const generateHistoricalData = (days: number, cpuMax: number, memMax: number, diskMax: number, netMax: number) => {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      cpu: Math.floor(Math.random() * (cpuMax - 20) + 20),
      memory: Math.floor(Math.random() * (memMax - 20) + 20),
      disk: Math.floor(Math.random() * (diskMax - 10) + 10),
      network: Math.floor(Math.random() * (netMax - 5) + 5),
    });
  }
  return data;
};


export const mockUsers: Omit<User, 'id' | 'lastLogin'>[] = [
  { name: 'Default User', email: 'jay@gmail.com', role: 'Viewer', avatar: `https://avatar.vercel.sh/jay.png` },
  { name: 'Admin User', email: 'admin@amberops.com', role: 'Admin', avatar: `https://avatar.vercel.sh/admin.png` },
  { name: 'Test User', email: 'test@example.com', role: 'Viewer', avatar: `https://avatar.vercel.sh/test.png` },
];

export const mockClusters: Omit<Cluster, 'id'>[] = [
  {
    userId: DEFAULT_USER_ID,
    name: 'Production Cluster',
    status: 'healthy',
    hostCount: 25,
    serviceCount: 12,
    alertCount: 0,
    cpuUsage: 45,
    memoryUsage: 60,
    storageUsage: 75,
    networkUsage: 30,
    healthMetrics: {
      cpu: { value: 45, trend: 'stable' },
      memory: { value: 60, trend: 'up' },
      disk: { value: 75, trend: 'stable' },
    },
    historicalData: generateHistoricalData(30, 60, 70, 80, 40),
  },
  {
    userId: DEFAULT_USER_ID,
    name: 'Development Cluster',
    status: 'degraded',
    hostCount: 10,
    serviceCount: 8,
    alertCount: 2,
    cpuUsage: 88,
    memoryUsage: 72,
    storageUsage: 50,
    networkUsage: 15,
    healthMetrics: {
      cpu: { value: 88, trend: 'up' },
      memory: { value: 72, trend: 'down' },
      disk: { value: 50, trend: 'stable' },
    },
    historicalData: generateHistoricalData(30, 95, 80, 60, 25),
  },
  {
    userId: DEFAULT_USER_ID,
    name: 'Staging Environment',
    status: 'unhealthy',
    hostCount: 15,
    serviceCount: 10,
    alertCount: 5,
    cpuUsage: 95,
    memoryUsage: 85,
    storageUsage: 90,
    networkUsage: 70,
     healthMetrics: {
      cpu: { value: 95, trend: 'up' },
      memory: { value: 85, trend: 'up' },
      disk: { value: 90, trend: 'up' },
    },
    historicalData: generateHistoricalData(30, 100, 90, 95, 80),
  },
];

export const mockServices: Omit<Service, 'id'>[] = [
  { userId: DEFAULT_USER_ID, name: 'HDFS', status: 'started', clusterId: 'cluster-1', clusterName: 'Production Cluster', runningHosts: 20, totalHosts: 25, version: '3.1.3' },
  { userId: DEFAULT_USER_ID, name: 'YARN', status: 'started', clusterId: 'cluster-1', clusterName: 'Production Cluster', runningHosts: 20, totalHosts: 25, version: '3.1.3' },
  { userId: DEFAULT_USER_ID, name: 'Kafka', status: 'stopped', clusterId: 'cluster-2', clusterName: 'Development Cluster', runningHosts: 0, totalHosts: 10, version: '2.8.0' },
  { userId: DEFAULT_USER_ID, name: 'Spark', status: 'maintenance', clusterId: 'cluster-3', clusterName: 'Staging Environment', runningHosts: 10, totalHosts: 15, version: '3.1.2' },
];

export const mockHosts: Omit<Host, 'id'>[] = [
  { userId: DEFAULT_USER_ID, name: 'master-01.prod.amberops.io', ip: '10.0.1.10', status: 'healthy', clusterId: 'cluster-1', clusterName: 'Production Cluster', cpuCores: 16, memoryTotalGb: 64, memoryUsedGb: 30, storageTotalGb: 1024, storageUsedGb: 400, os: 'CentOS 7', lastHeartbeat: '2 minutes ago' },
  { userId: DEFAULT_USER_ID, name: 'worker-01.prod.amberops.io', ip: '10.0.1.11', status: 'healthy', clusterId: 'cluster-1', clusterName: 'Production Cluster', cpuCores: 8, memoryTotalGb: 32, memoryUsedGb: 24, storageTotalGb: 512, storageUsedGb: 300, os: 'CentOS 7', lastHeartbeat: '1 minute ago' },
  { userId: DEFAULT_USER_ID, name: 'dev-master-01.dev.amberops.io', ip: '192.168.1.5', status: 'unhealthy', clusterId: 'cluster-2', clusterName: 'Development Cluster', cpuCores: 8, memoryTotalGb: 32, memoryUsedGb: 28, storageTotalGb: 256, storageUsedGb: 128, os: 'Ubuntu 20.04', lastHeartbeat: '30 minutes ago' },
  { userId: DEFAULT_USER_ID, name: 'staging-node-01.staging.amberops.io', ip: '172.16.0.100', status: 'maintenance', clusterId: 'cluster-3', clusterName: 'Staging Environment', cpuCores: 12, memoryTotalGb: 48, memoryUsedGb: 10, storageTotalGb: 768, storageUsedGb: 50, os: 'RHEL 8', lastHeartbeat: '5 hours ago' },
];

export const mockAlerts: Omit<Alert, 'id'>[] = [
  { userId: DEFAULT_USER_ID, name: 'HDFS Storage Capacity', severity: 'critical', status: 'triggered', clusterId: 'cluster-3', clusterName: 'Staging Environment', serviceName: 'HDFS', timestamp: new Date('2024-05-21T10:00:00Z'), description: 'HDFS storage capacity is above 90%.', relatedLogs: 'Log file for HDFS shows disk full errors.' },
  { userId: DEFAULT_USER_ID, name: 'Node Manager Health', severity: 'warning', status: 'acknowledged', clusterId: 'cluster-2', clusterName: 'Development Cluster', serviceName: 'YARN', hostName: 'dev-master-01.dev.amberops.io', timestamp: new Date('2024-05-21T09:30:00Z'), description: 'NodeManager on dev-master-01 is unhealthy.', relatedLogs: 'Heartbeat missed for NodeManager.' },
  { userId: DEFAULT_USER_ID, name: 'Kafka Broker Down', severity: 'critical', status: 'triggered', clusterId: 'cluster-2', clusterName: 'Development Cluster', serviceName: 'Kafka', timestamp: new Date('2024-05-21T11:00:00Z'), description: 'Kafka broker is down on host kafka-03.', relatedLogs: 'Connection refused on port 9092.'},
  { userId: DEFAULT_USER_ID, name: 'High CPU Usage', severity: 'warning', status: 'resolved', clusterId: 'cluster-1', clusterName: 'Production Cluster', serviceName: 'Spark', hostName: 'worker-01.prod.amberops.io', timestamp: new Date('2024-05-20T14:00:00Z'), description: 'CPU utilization has been over 80% for 10 minutes.', relatedLogs: 'Process list shows high CPU usage by Spark executor.' },
];

export const mockAlertDefinitions: Omit<AlertDefinition, 'id'>[] = [
    { userId: DEFAULT_USER_ID, name: 'HDFS Blocks Health', description: 'Checks for corrupt or missing HDFS blocks.', service: 'HDFS', type: 'METRIC', enabled: true },
    { userId: DEFAULT_USER_ID, name: 'NodeManager Health', description: 'Monitors the health of YARN NodeManagers.', service: 'YARN', type: 'METRIC', enabled: true },
    { userId: ADMIN_USER_ID, name: 'Kafka Under-replicated Partitions', description: 'Alerts if Kafka partitions are under-replicated.', service: 'Kafka', type: 'METRIC', enabled: false },
    { userId: ADMIN_USER_ID, name: 'Spark Job Failure', description: 'Triggers on Spark job failures.', service: 'Spark', type: 'SCRIPT', enabled: true },
    { userId: DEFAULT_USER_ID, name: 'Zookeeper Port Check', description: 'Checks if Zookeeper client port is open.', service: 'Zookeeper', type: 'PORT', enabled: true },
];

export const mockConfigVersions: ConfigVersion[] = [
    { version: 12, author: 'admin', date: new Date('2024-05-21T11:00:00Z'), notes: 'Increased yarn container memory.' },
    { version: 11, author: 'jdoe', date: new Date('2024-05-20T15:30:00Z'), notes: 'Updated spark job properties.' },
    { version: 10, author: 'admin', date: new Date('2024-05-19T09:00:00Z'), notes: 'Initial setup for staging cluster.' },
];

export const mockTasks: Omit<Task, 'id' | 'startTime'>[] = [
    { userId: DEFAULT_USER_ID, name: 'Restart HDFS DataNodes', status: 'running', progress: 75, duration: '5m 30s', user: 'admin', target: 'All DataNodes' },
    { userId: DEFAULT_USER_ID, name: 'Run Service Check on YARN', status: 'completed', progress: 100, duration: '2m 15s', user: 'admin', target: 'YARN' },
    { userId: DEFAULT_USER_ID, name: 'Deploy Kafka Client Configs', status: 'failed', progress: 50, duration: '1m 05s', user: 'jdoe', target: 'Kafka Brokers' },
    { userId: DEFAULT_USER_ID, name: 'Add new host to cluster', status: 'pending', progress: 0, duration: '0m 0s', user: 'admin', target: 'worker-04.prod' },
];

export const mockLogEntries: Omit<LogEntry, 'timestamp'>[] = [
    { level: 'INFO', host: 'master-01.prod', component: 'HDFS.NameNode', message: 'Block replication successful for block blk_12345' },
    { level: 'WARN', host: 'worker-02.prod', component: 'YARN.NodeManager', message: 'High memory usage detected: 92%' },
    { level: 'ERROR', host: 'kafka-03.dev', component: 'Kafka.Broker', message: 'Failed to connect to Zookeeper ensemble at zk-01:2181' },
    { level: 'DEBUG', host: 'master-01.prod', component: 'AmbariServer', message: 'Received heartbeat from worker-01.prod' },
];

export const mockActivityLogs: Omit<ActivityLog, 'id' | 'timestamp' | 'user'>[] = [
    { userId: DEFAULT_USER_ID, action: 'RESTART', details: 'Restarted HDFS on Production Cluster' },
    { userId: DEFAULT_USER_ID, action: 'ACKNOWLEDGE', details: 'Acknowledged Alert: Node Manager Health' },
    { userId: ADMIN_USER_ID, action: 'LOGIN', details: 'User alice@amberops.io logged in' },
    { userId: ADMIN_USER_ID, action: 'UPDATE', details: 'Updated user role for charlie@amberops.io to Viewer' },
    { userId: ADMIN_USER_ID, action: 'DELETE', details: 'Deleted cluster: temp-cluster-5' },
];

export const mockPricingTiers: Omit<PricingTier, 'id'>[] = [
    {
        title: "Hobby",
        price: "0",
        period: "/month",
        description: "For personal projects & small teams.",
        features: ["1 Cluster", "Up to 5 Hosts", "Community Support", "Core Features"],
        isFeatured: false,
    },
    {
        title: "Pro Tier Access",
        price: "99",
        period: "/month",
        description: "For growing businesses and production use. Unlock powerful features to scale your operations.",
        features: ["Up to 5 Clusters", "Up to 50 Hosts", "Priority Email Support", "Advanced AI Features", "Weekly Health Reports"],
        isFeatured: true,
    },
    {
        title: "Enterprise",
        price: "Custom",
        period: "",
        description: "For large-scale, critical deployments.",
        features: ["Unlimited Clusters", "Unlimited Hosts", "Dedicated SLA & Support", "On-premise Deployment"],
        isFeatured: false,
    }
];

export const mockTestimonials: Omit<Testimonial, 'id'>[] = [
  {
    quote: "AmberOps has revolutionized how we manage our data clusters. The AI-powered troubleshooting is like having another senior engineer on the team. We've reduced downtime by over 30%.",
    name: 'Sarah L.',
    role: 'Lead DevOps Engineer',
    avatar: 'https://avatar.vercel.sh/sarah',
  },
  {
    quote: "The interface is just... better. It's fast, intuitive, and I can find what I need in seconds. I can't imagine going back to the old Ambari UI.",
    name: 'Mike R.',
    role: 'Platform Engineering Manager',
    avatar: 'https://avatar.vercel.sh/mike',
  },
   {
    quote: "As a data analyst, I don't want to fight with the tooling. AmberOps gives me the quick insights I need on service health without having to dive into complex configs. It just works.",
    name: 'Chen W.',
    role: 'Senior Data Analyst',
    avatar: 'https://avatar.vercel.sh/chen',
  },
];

export const mockFaqs: Omit<FAQ, 'id'>[] = [
    {
        question: "What is AmberOps?",
        answer: "AmberOps is a modern, fast, and intuitive frontend replacement for the standard Apache Ambari web UI. It's designed to streamline cluster management with a better user experience and powerful AI-driven features."
    },
    {
        question: "Can I connect my existing Ambari-managed cluster?",
        answer: "Yes! AmberOps is designed to work with your existing Ambari backend. You can add your cluster by providing your Ambari server URL and credentials, and AmberOps will act as a new, more powerful interface for it."
    },
    {
        question: "Is there a free plan?",
        answer: "Absolutely. Our 'Hobby' plan is free forever and is perfect for individuals and small teams to manage a single cluster with up to 5 hosts. You can explore all the core features without any cost."
    },
    {
        question: "How does the AI assistance work?",
        answer: "We use state-of-the-art large language models (LLMs) from Google (Gemini) to analyze your cluster's metrics and alert data. The AI can then generate a natural-language summaries of cluster health and provide step-by-step troubleshooting guides for specific alerts, helping you resolve issues faster."
    }
];
