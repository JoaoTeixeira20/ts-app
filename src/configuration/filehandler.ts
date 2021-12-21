export const handleFileRead = async (file: Blob): Promise<string | ArrayBuffer | null> => {

    let reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.readAsText(file, 'utf-8');

        reader.onload = function () {
            resolve(reader.result);
        };

        reader.onerror = function () {
            reject(reader.error);
        };
    })
}