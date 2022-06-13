export function loadImage(url: string, img = new Image()): Promise<string> {
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(url);
    img.onerror = () => reject();
    img.src = url;
  });
}
