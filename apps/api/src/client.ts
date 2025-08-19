
import type { User, Cluster, Service, Host, Alert, AlertDefinition, Task, ActivityLog, LogEntry, ConfigVersion, DocumentationArticle, LegalDocument, PricingTier, Testimonial, FAQ } from '@amberops/lib';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3004/api/v1';

// Function to get the JWT from localStorage
const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') {
        return null;
    }
    const token = localStorage.getItem('amberops_jwt');
    return token;
};

// A centralized API client.
const apiClient = {
  get: async <T>(url: string, isPublic = false): Promise<T> => {
    const token = getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    
    if (token && !isPublic) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  post: async <T, U>(url: string, data: T, isPublic = false): Promise<U> => {
    const token = getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
     if (token && !isPublic) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  put: async <T, U>(url: string, data: T, isPublic = false): Promise<U> => {
    const token = getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token && !isPublic) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  delete: async (url: string, isPublic = false): Promise<void> => {
    const token = getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token && !isPublic) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return;
  },
};


// --- PROTECTED ROUTES (prefixed with /app) ---
export const fetchUsers = (isAdmin = false): Promise<User[]> => apiClient.get(`/app/users`);
export const addUser = (userData: Omit<User, 'id' | 'lastLogin' | 'avatar' >): Promise<User> => apiClient.post(`/app/users`, userData);
export const updateUser = (userId: string, userData: Partial<User>): Promise<User> => apiClient.put(`/app/users/${userId}`, userData);
export const deleteUser = (userId: string): Promise<void> => apiClient.delete(`/app/users/${userId}`);

export const fetchClusters = (): Promise<Cluster[]> => apiClient.get(`/app/clusters`);
export const addCluster = (clusterData: Omit<Cluster, 'id'>): Promise<Cluster> => apiClient.post(`/app/clusters`, clusterData);
export const fetchClusterById = (id: string): Promise<Cluster> => apiClient.get(`/app/clusters/${id}`);

export const fetchServices = (): Promise<Service[]> => apiClient.get(`/app/services`);
export const addService = (serviceData: Omit<Service, 'id'>): Promise<Service> => apiClient.post(`/app/services`, serviceData);
export const fetchServiceById = (id: string): Promise<Service> => apiClient.get(`/app/services/${id}`);

export const fetchHosts = (): Promise<Host[]> => apiClient.get(`/app/hosts`);
export const fetchHostById = (id: string): Promise<Host> => apiClient.get(`/app/hosts/${id}`);

export const fetchAlerts = (): Promise<Alert[]> => apiClient.get(`/app/alerts`);
export const updateAlert = (alertId: string, alertData: Partial<Alert>): Promise<Alert> => apiClient.put(`/app/alerts/${alertId}`, alertData);
export const fetchAlertById = (id: string): Promise<Alert> => apiClient.get(`/app/alerts/${id}`);

export const fetchAlertDefinitions = (): Promise<AlertDefinition[]> => apiClient.get(`/app/alert-definitions`);
export const addAlertDefinition = (definitionData: Omit<AlertDefinition, 'id'>): Promise<AlertDefinition> => apiClient.post(`/app/alert-definitions`, definitionData);
export const updateAlertDefinition = (id: string, definitionData: Partial<AlertDefinition>): Promise<AlertDefinition> => apiClient.put(`/app/alert-definitions/${id}`, definitionData);
export const deleteAlertDefinition = (id: string): Promise<void> => apiClient.delete(`/app/alert-definitions/${id}`);

export const fetchTasks = (): Promise<Task[]> => apiClient.get(`/app/tasks`);
export const addTask = (taskData: Omit<Task, 'id' | 'startTime' | 'duration' | 'progress'>): Promise<Task> => apiClient.post(`/app/tasks`, taskData);

export const fetchActivityLogs = (): Promise<ActivityLog[]> => apiClient.get(`/app/activity`);
export const fetchLogEntries = (): Promise<LogEntry[]> => apiClient.get(`/app/logs`);
export const fetchConfigVersions = (): Promise<ConfigVersion[]> => Promise.resolve([]);


// --- PUBLIC ROUTES (prefixed with /public) ---
export const fetchDocumentationArticles = (): Promise<DocumentationArticle[]> => apiClient.get(`/public/documentation`, true);
export const addDocumentationArticle = (articleData: Omit<DocumentationArticle, 'id' | 'createdAt' | 'updatedAt'>): Promise<DocumentationArticle> => apiClient.post(`/public/documentation`, articleData, true);
export const updateDocumentationArticle = (slug: string, articleData: Partial<DocumentationArticle>): Promise<DocumentationArticle> => apiClient.put(`/public/documentation/${slug}`, articleData, true);
export const deleteDocumentationArticle = (slug: string): Promise<void> => apiClient.delete(`/public/documentation/${slug}`, true);

export const fetchLegalDocument = (type: 'terms' | 'privacy'): Promise<LegalDocument> => apiClient.get(`/public/legal/${type}`, true);
export const updateLegalDocument = (type: 'terms' | 'privacy', data: { content: string }): Promise<LegalDocument> => apiClient.put(`/public/legal/${type}`, data, true);

export const fetchPricingTiers = (): Promise<PricingTier[]> => apiClient.get(`/public/pricing`, true);
export const addPricingTier = (tierData: Omit<PricingTier, 'id'>): Promise<PricingTier> => apiClient.post(`/public/pricing`, tierData, true);
export const updatePricingTier = (tierId: string, tierData: Partial<PricingTier>): Promise<PricingTier> => apiClient.put(`/public/pricing/${tierId}`, tierData, true);
export const deletePricingTier = (tierId: string): Promise<void> => apiClient.delete(`/public/pricing/${tierId}`, true);

export const fetchTestimonials = (): Promise<Testimonial[]> => apiClient.get(`/public/testimonials`, true);
export const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>): Promise<Testimonial> => apiClient.post(`/public/testimonials`, testimonialData, true);
export const updateTestimonial = (id: string, testimonialData: Partial<Testimonial>): Promise<Testimonial> => apiClient.put(`/public/testimonials/${id}`, testimonialData, true);
export const deleteTestimonial = (id: string): Promise<void> => apiClient.delete(`/public/testimonials/${id}`, true);

export const fetchFaqs = (): Promise<FAQ[]> => apiClient.get(`/public/faqs`, true);
export const addFaq = (faqData: Omit<FAQ, 'id'>): Promise<FAQ> => apiClient.post(`/public/faqs`, faqData, true);
export const updateFaq = (id: string, faqData: Partial<FAQ>): Promise<FAQ> => apiClient.put(`/public/faqs/${id}`, faqData, true);
export const deleteFaq = (id: string): Promise<void> => apiClient.delete(`/public/faqs/${id}`, true);
