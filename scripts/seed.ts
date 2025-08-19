
import { MongoClient, ObjectId } from 'mongodb';
import {
  mockUsers,
  mockClusters,
  mockServices,
  mockHosts,
  mockAlerts,
  mockAlertDefinitions,
  mockTasks,
  mockActivityLogs,
  mockLogEntries,
  mockPricingTiers,
  mockTestimonials,
  mockFaqs,
  DEFAULT_USER_ID,
  ADMIN_USER_ID,
  TEST_USER_ID,
} from './mock-data';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import type { DocumentationArticle, LegalDocument, User, Cluster } from '@amberops/lib';

config({ path: './.env' });

const docs: Omit<DocumentationArticle, 'id' | 'createdAt' | 'updatedAt'>[] = [
    { slug: 'dashboard', title: 'Dashboard Guide', content: '<h1>Dashboard Guide</h1><p>Your central hub for monitoring the overall health of your infrastructure.</p>' },
    { slug: 'clusters', title: 'Cluster & Host Management', content: '<h1>Cluster & Host Management</h1><p>Learn how to add, view, and manage your clusters and their associated hosts.</p>' },
    { slug: 'services', title: 'Service Management', content: '<h1>Service Management</h1><p>Guides on how to manage services like HDFS and YARN, including actions like start, stop, and restart.</p>' },
];

const legal: Omit<LegalDocument, 'updatedAt'>[] = [
  {
    type: 'terms',
    content: `
      <p>Welcome to AmberOps. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.</p>

      <h2 class="section-title">1. Acceptance of Terms</h2>
      <p>By creating an account, accessing, or using AmberOps services, you confirm that you have read, understood, and agree to these Terms of Service. If you do not agree, you must not use our platform.</p>

      <h2 class="section-title">2. Eligibility</h2>
      <p>You must be at least 18 years old or have the legal capacity to enter into agreements in your jurisdiction. By using AmberOps, you represent that you meet this requirement.</p>

      <h2 class="section-title">3. Accounts & Security</h2>
      <ul>
        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        <li>You agree to notify AmberOps immediately of any unauthorized access or use of your account.</li>
        <li>AmberOps is not liable for any losses due to unauthorized access caused by your failure to secure your account.</li>
      </ul>

      <h2 class="section-title">4. Use of Services</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use AmberOps for any unlawful or prohibited purpose.</li>
        <li>Attempt to gain unauthorized access to systems, networks, or data.</li>
        <li>Resell, sublicense, or misuse our services without written permission.</li>
      </ul>

      <h2 class="section-title">5. Intellectual Property</h2>
      <p>All content, features, and functionality of AmberOps—including software, text, graphics, and logos—are owned by AmberOps and protected by intellectual property laws. You may not copy, distribute, or create derivative works without our consent.</p>

      <h2 class="section-title">6. Payments & Subscriptions</h2>
      <p>If applicable, fees for premium services will be charged according to our pricing plans. All payments are non-refundable unless otherwise stated.</p>

      <h2 class="section-title">7. Termination</h2>
      <p>We may suspend or terminate your access if you violate these Terms. Upon termination, your right to use our services will immediately end.</p>

      <h2 class="section-title">8. Limitation of Liability</h2>
      <p>AmberOps is not liable for any indirect, incidental, or consequential damages resulting from the use of our platform.</p>

      <h2 class="section-title">9. Changes to Terms</h2>
      <p>We may update these Terms from time to time. Continued use of the platform constitutes acceptance of the revised Terms.</p>

      <h2 class="section-title">10. Contact</h2>
      <p>If you have questions regarding these Terms, contact us at <a href="mailto:support@amberops.com">support@amberops.com</a>.</p>
    `
  },
  {
    type: 'privacy',
    content: `
      <p>Your privacy is important to us. This Privacy Policy explains how AmberOps collects, uses, and protects your information.</p>

      <h2 class="section-title">1. Information We Collect</h2>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, contact details, and account credentials when you register.</li>
        <li><strong>Usage Data:</strong> Information on how you interact with our services, including IP address, browser type, and access times.</li>
        <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze site traffic.</li>
      </ul>

      <h2 class="section-title">2. How We Use Your Information</h2>
      <ul>
        <li>To provide, operate, and maintain our services.</li>
        <li>To personalize your experience and improve functionality.</li>
        <li>To send important updates, security alerts, or promotional messages (you may opt-out at any time).</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2 class="section-title">3. Sharing of Information</h2>
      <p>We do not sell or rent your personal information. We may share your data with:</p>
      <ul>
        <li>Trusted third-party service providers (e.g., hosting, analytics, payment processing).</li>
        <li>Authorities if required by law or to protect rights and safety.</li>
      </ul>

      <h2 class="section-title">4. Data Security</h2>
      <p>We implement reasonable technical and organizational measures to protect your personal data. However, no method of transmission or storage is completely secure.</p>

      <h2 class="section-title">5. Data Retention</h2>
      <p>We retain your data as long as your account is active or as necessary to provide services. You may request deletion of your account at any time.</p>

      <h2 class="section-title">6. Your Rights</h2>
      <ul>
        <li>Access, correct, or delete your personal data.</li>
        <li>Opt-out of marketing communications.</li>
        <li>Request a copy of your data (where applicable under law).</li>
      </ul>

      <h2 class="section-title">7. Children’s Privacy</h2>
      <p>AmberOps does not knowingly collect information from individuals under 13. If you believe we have inadvertently collected such data, please contact us immediately.</p>

      <h2 class="section-title">8. International Users</h2>
      <p>If you access AmberOps from outside your home country, your information may be transferred and processed across borders according to this policy.</p>

      <h2 class="section-title">9. Changes to this Policy</h2>
      <p>We may update this Privacy Policy periodically. We encourage you to review it regularly.</p>

      <h2 class="section-title">10. Contact</h2>
      <p>For questions about this Privacy Policy, contact us at <a href="mailto:privacy@amberops.com">privacy@amberops.com</a>.</p>
    `
  }
]

// Helper function to get password for a given user email
const getPasswordForUser = (email: string) => {
    switch (email) {
        case 'admin@amberops.com': return 'admin@amberops';
        case 'jay@gmail.com': return '123456';
        case 'test@example.com': return 'password';
        default: return 'password'; // Default password for other users
    }
}

// Helper function to get a static ObjectId for a given user email
const getObjectIdForUser = (email: string) => {
    switch (email) {
        case 'jay@gmail.com': return new ObjectId(DEFAULT_USER_ID);
        case 'admin@amberops.com': return new ObjectId(ADMIN_USER_ID);
        case 'test@example.com': return new ObjectId(TEST_USER_ID);
        default: return new ObjectId(); // Generate new ID for other users
    }
}

async function seedDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in the .env file');
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();

    // 1. Clear all existing data from collections
    console.log('Clearing existing data...');
    const collections = await db.listCollections().toArray();
    for (const collection of collections) {
      if (collection.name !== 'system.indexes') {
         await db.collection(collection.name).deleteMany({});
      }
    }
    console.log('All collections cleared.');

    // 2. Seed Users
    console.log('Seeding users...');
    const usersToInsert = await Promise.all(
        mockUsers.map(async (user) => ({
            ...user,
            _id: getObjectIdForUser(user.email), // Assign a static ID
            password: await bcrypt.hash(getPasswordForUser(user.email), 10),
            emailVerified: null, 
            createdAt: new Date(),
            updatedAt: new Date(),
            lastLogin: new Date(),
        }))
    );
    await db.collection('users').insertMany(usersToInsert);
    console.log('Users seeded.');
    const usersFromDb = await db.collection('users').find({}).toArray() as unknown as (User & {_id: ObjectId})[];

    // 3. Seed Data Associated with the Default User
    const defaultUser = usersFromDb.find(u => u.email === 'jay@gmail.com');
    if (!defaultUser) {
        throw new Error("Default user 'jay@gmail.com' not found after seeding.");
    }
    const defaultUserId = defaultUser._id.toString();

    const clustersWithUser = mockClusters.map(c => ({ ...c, userId: defaultUserId, _id: new ObjectId() }));
    
    console.log('Seeding clusters...');
    await db.collection('clusters').insertMany(clustersWithUser);
    console.log('Clusters seeded.');
    
    const clusterMap: { [key: string]: string } = {};
    clustersWithUser.forEach(cluster => {
        clusterMap[cluster.name] = cluster._id.toString();
    });

    // Now associate other data with the newly created cluster IDs
    const servicesWithUser = mockServices.map(s => ({ ...s, userId: defaultUserId, clusterId: clusterMap[s.clusterName] || new ObjectId().toString() }));
    const hostsWithUser = mockHosts.map(h => ({ ...h, userId: defaultUserId, clusterId: clusterMap[h.clusterName] || new ObjectId().toString() }));
    const alertsWithUser = mockAlerts.map(a => ({ ...a, userId: defaultUserId, clusterId: clusterMap[a.clusterName] || new ObjectId().toString(), timestamp: new Date(a.timestamp) }));
    const alertDefsWithUser = mockAlertDefinitions.map(d => ({ ...d, userId: d.userId === ADMIN_USER_ID ? ADMIN_USER_ID : defaultUserId }));
    const tasksWithUser = mockTasks.map((t, i) => ({ ...t, userId: defaultUserId, startTime: new Date(Date.now() - (i * 60000 * 15)) }));

    console.log('Seeding services...');
    await db.collection('services').insertMany(servicesWithUser.map(s => ({ ...s, _id: new ObjectId() })));
    console.log('Services seeded.');

    console.log('Seeding hosts...');
    await db.collection('hosts').insertMany(hostsWithUser.map(h => ({ ...h, _id: new ObjectId() })));
    console.log('Hosts seeded.');
    
    console.log('Seeding alerts...');
    await db.collection('alerts').insertMany(alertsWithUser.map(a => ({...a, _id: new ObjectId() })));
    console.log('Alerts seeded.');

    console.log('Seeding alertdefinitions...');
    await db.collection('alertdefinitions').insertMany(alertDefsWithUser.map(d => ({...d, _id: new ObjectId()})));
    console.log('Alert Definitions seeded.');
    
    console.log('Seeding tasks...');
    await db.collection('tasks').insertMany(tasksWithUser.map(t => ({...t, _id: new ObjectId()})));
    console.log('Tasks seeded.');
    
    // 4. Seed other non-user-specific data
    console.log('Seeding activitylogs...');
    const activityLogsToInsert = mockActivityLogs.map(log => {
        const user = usersFromDb.find(u => u.id === log.userId);
        return {
            ...log,
            timestamp: new Date(Date.now() - (Math.random() * 1000 * 60 * 60 * 24)),
            user: {
              id: user?.id,
              name: user?.name,
              email: user?.email,
              avatar: user?.avatar,
            },
        }
    });
    await db.collection('activitylogs').insertMany(activityLogsToInsert.map(a => ({...a, _id: new ObjectId() })));
    console.log('Activity Logs seeded.');
    
    console.log('Seeding logentries...');
    await db.collection('logentries').insertMany(mockLogEntries.map(l => ({...l, timestamp: new Date()})));
    console.log('Log Entries seeded.');

    console.log('Seeding documentations...');
    await db.collection('documentations').insertMany(docs.map(d => ({...d, createdAt: new Date(), updatedAt: new Date() })));
    console.log('Documentation seeded.');

    console.log('Seeding legals...');
    await db.collection('legals').insertMany(legal.map(l => ({...l, updatedAt: new Date() })));
    console.log('Legal documents seeded.');
    
    console.log('Seeding pricingtiers...');
    await db.collection('pricingtiers').insertMany(mockPricingTiers.map(t => ({...t, _id: new ObjectId()})));
    console.log('Pricing tiers seeded.');
    
    console.log('Seeding testimonials...');
    await db.collection('testimonials').insertMany(mockTestimonials.map(t => ({...t, _id: new ObjectId()})));
    console.log('Testimonials seeded.');
    
    console.log('Seeding faqs...');
    await db.collection('faqs').insertMany(mockFaqs.map(f => ({...f, _id: new ObjectId()})));
    console.log('FAQs seeded.');


    console.log('Database seeding completed successfully!');
  } catch (err) {
    console.error('Error during database seeding:', err);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

seedDatabase();

    
