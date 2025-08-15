import {
  fetchOverviewStats,
  fetchTimeSeries,
  fetchQualityStats,
  fetchCountryStats,
  fetchRecentDownloads,
  loginUser,
  registerUser,
  recordVideoDownload,
  checkDownloadStatus,
  fetchVideoFormats
} from '../src/api/api';

// Utilisation de jest.mock pour mocker fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('fetchOverviewStats calls correct endpoint', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ total: 1 }) });
    const data = await fetchOverviewStats();
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/stats/overview/'), expect.anything());
    expect(data).toEqual({ total: 1 });
  });

  it('fetchTimeSeries calls correct endpoint with period', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    await fetchTimeSeries('week');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('period=week'), expect.anything());
  });

  it('fetchQualityStats calls correct endpoint', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    await fetchQualityStats();
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/stats/by-quality/'), expect.anything());
  });

  it('fetchCountryStats calls correct endpoint', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    await fetchCountryStats();
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/stats/by-country/'), expect.anything());
  });

  it('fetchRecentDownloads calls correct endpoint', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    await fetchRecentDownloads();
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/stats/recent-downloads/'), expect.anything());
  });

  it('loginUser posts credentials and returns data', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ token: 'abc' }) });
    const data = await loginUser('user', 'pass');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api-token-auth/'), expect.objectContaining({ method: 'POST' }));
    expect(data).toEqual({ token: 'abc' });
  });

  it('registerUser posts registration and returns data', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1 }) });
    const data = await registerUser('user', 'email', 'pass');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/auth-register/'), expect.objectContaining({ method: 'POST' }));
    expect(data).toEqual({ id: 1 });
  });

  it('recordVideoDownload posts download data', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ status: 'ok' }) });
    const data = await recordVideoDownload('url', 'yt', 'mp4');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/downloads/record/'), expect.objectContaining({ method: 'POST' }));
    expect(data).toEqual({ status: 'ok' });
  });

  it('checkDownloadStatus calls correct endpoint', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ status: 'done' }) });
    const data = await checkDownloadStatus('id123');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/downloads/task-status/id123/'), expect.anything());
    expect(data).toEqual({ status: 'done' });
  });

  it('fetchVideoFormats posts video url', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ formats: [] }) });
    const data = await fetchVideoFormats('url');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/downloads/formats/'), expect.objectContaining({ method: 'POST' }));
    expect(data).toEqual({ formats: [] });
  });
});
