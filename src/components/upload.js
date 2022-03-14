

import { useEffect, useState } from 'react'
import { db, storage } from '../firebase';

export function useUpload() {
    return UploadFiles
}
export default function UploadFiles(file) {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (!file) return;
        const storageRef = storage.ref(`/cv/${file.name}`)
        const colllectionRef = db.collection("users")

        const uploadTask = storageRef.put(file)
        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(progress)

        }, (err) => {
            console.log(err)
            setError(err)
        },
            async () => {
                // Upload completed successfully, now we can get the download URL
                await uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL)
                });
            }
        )
    }, [file])

    return { progress, url, error }
}
