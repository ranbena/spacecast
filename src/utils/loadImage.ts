export function loadImage(url: string): Promise<string> {
    const img = new Image();
    return new Promise((resolve, reject) => {
        img.onload = () => resolve(url);
        img.onerror = () => reject();
        img.src = url;
    });
}