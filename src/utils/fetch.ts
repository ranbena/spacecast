export async function fetchAndParse<T extends Object>(url: string): Promise<T> {
  const response = await window.fetch(url);
  const data: T = await response.json();
  return data;
}
