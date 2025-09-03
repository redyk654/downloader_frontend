export const API_BASE = 'https://rimeo-djangoapi.chris-you.com';

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('authToken');
  return token
    ? { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
};

interface FetchWithAuthOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface ErrorData {
  error_details?: string;
  non_field_errors?: string[];
  [key: string]: any;
}

const fetchWithAuth = async <T = any>(url: string, options: FetchWithAuthOptions = {}): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...getAuthHeaders(), ...(options.headers || {}) },
    });

    if (!response.ok) {
      let errorMsg = 'Erreur réseau';
      let errorData: ErrorData = {};
      try {
        errorData = await response.json();
        errorMsg = errorData.error_details || errorData.non_field_errors?.[0] || errorMsg;
      } catch {}
      if (response.status === 401 || response.status === 403) {
        errorMsg = "Unauthorized access. Please log in again.";
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin');
      }
      throw new Error(errorMsg);
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};

const fetchWithoutAuth = async <T = any>(url: string, options: FetchWithAuthOptions = {}): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
    if (!response.ok) {
      let errorMsg = 'Network error. Please try again.';
      let errorData: ErrorData = {};
      try {
        errorData = await response.json();
        errorMsg = errorData.error_details || errorData.non_field_errors?.[0] || errorMsg;
      } catch {}
      throw new Error(errorMsg);
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};

// --- Fonctions API spécifiques ---

// Récupération des statistiques
export const fetchOverviewStats = async () => {
  return await fetchWithAuth(`${API_BASE}/api/stats/overview/`);
};

export const fetchTimeSeries = async (period = 'day') => {
  return await fetchWithAuth(`${API_BASE}/api/stats/timeseries/?period=${period}`);
};

export const fetchQualityStats = async () => {
  return await fetchWithAuth(`${API_BASE}/api/stats/by-quality/`);
};

export const fetchCountryStats = async () => {
  return await fetchWithAuth(`${API_BASE}/api/stats/by-country/`);
};

export const fetchRecentDownloads = async () => {
  // À adapter selon ton API réelle
  return await fetchWithAuth(`${API_BASE}/api/stats/recent-downloads/`);
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE}/api-token-auth/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      let errorData: ErrorData = {};
      try {
        errorData = await response.json();
      } catch {}
      throw new Error(errorData.non_field_errors?.[0] || 'Erreur de connexion.');
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE}/api/auth-register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email }),
    });
    if (!response.ok) {
      let errorMsg = "Erreur d'inscription.";
      try {
        // Essaye de parser le JSON
        const errorData = await response.json();
        if (typeof errorData === 'object' && errorData !== null) {
          // Concatène tous les messages d’erreur du serveur
          errorMsg = Object.values(errorData)
            .map(val => Array.isArray(val) ? val.join(', ') : val)
            .join(' | ') || errorMsg;
        } else if (typeof errorData === 'string') {
          errorMsg = errorData;
        }
      } catch {
        // Si le JSON n'est pas exploitable, essaye de lire le texte brut
        try {
          const text = await response.text();
          if (text) errorMsg = text;
        } catch {}
      }
      throw new Error(errorMsg);
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};


// Enregistrement d'un téléchargement vidéo
export const recordVideoDownload = async (videoUrl: string, origineVideo: string, formatPreference: string) => {
  return await fetchWithoutAuth(`${API_BASE}/api/downloads/record/`, {
    method: 'POST',
    body: JSON.stringify({ video_url: videoUrl, origine_video: origineVideo, format_preference: formatPreference }),
  });
};

// Verifier le status d'un téléchargement
export const checkDownloadStatus = async (downloadId: string) => {
  return await fetchWithoutAuth(`${API_BASE}/api/downloads/task-status/${downloadId}/`);
};

// Récupération des formats disponibles pour une vidéo
export const fetchVideoFormats = async (videoUrl: string) => {
  return await fetchWithoutAuth(`${API_BASE}/api/downloads/formats/`, {
    method: 'POST',
    body: JSON.stringify({ video_url: videoUrl }),
  });
}