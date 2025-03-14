/**
 * API istekleri için yardımcı fonksiyonlar
 */
import Cookies from 'js-cookie';

/**
 * API isteği için gerekli headers'ı oluşturur
 * @param includeContentType Content-Type header'ını ekleyip eklemeyeceğini belirtir
 * @returns Headers nesnesi
 */
export const getAuthHeaders = (includeContentType = true) => {
  const headers: Record<string, string> = {};
  
  // Token'ı önce localStorage'dan, yoksa cookie'den al
  let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  if (!token) {
    const cookieToken = Cookies.get('token');
    if (cookieToken) {
      token = cookieToken;
    }
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

/**
 * GET isteği yapar
 * @param url İstek yapılacak URL
 * @returns Promise
 */
export const apiGet = async (url: string) => {
  const response = await fetch(url, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'İstek sırasında bir hata oluştu');
  }
  
  return response.json();
};

/**
 * POST isteği yapar
 * @param url İstek yapılacak URL
 * @param data Gönderilecek veri
 * @returns Promise
 */
export const apiPost = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || 'İstek sırasında bir hata oluştu');
  }
  
  return response.json();
};

/**
 * PUT isteği yapar
 * @param url İstek yapılacak URL
 * @param data Gönderilecek veri
 * @returns Promise
 */
export const apiPut = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || 'İstek sırasında bir hata oluştu');
  }
  
  return response.json();
};

/**
 * DELETE isteği yapar
 * @param url İstek yapılacak URL
 * @returns Promise
 */
export const apiDelete = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || 'İstek sırasında bir hata oluştu');
  }
  
  return response.json();
}; 