export async function convertFileToBase(file: any) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64String = reader.result;
        resolve(base64String);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read the file.'));
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    })
}