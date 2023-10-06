import { getStorage, uploadString } from 'firebase/storage'
import {
  updateDoc,
  addDoc,
  doc,
  collection,
  firestore,
  deleteDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  setDoc,
} from '../../../firebase'

const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snapshot.ref)
    return url
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const addCulture = async (data) => {
  try {
    const { file, fileName } = data.cover_img || {}
    const cover_img = file
      ? await uploadFile(file, `images/events/${fileName}`)
      : ''
    const culture = {
      ...data,
      cover_img,
      createdAt: new Date(),
    }
    const docRef = await addDoc(collection(firestore, 'Culture'), culture)
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const updateCulture = async (data) => {
  try {
    let cover_img = ''
    if (data.cover_img.file) {
      const { file, fileName } = data.cover_img || {}
      const url = await uploadFile(file, `images/events/${fileName}`)
      cover_img = url
    }
    const docRef = await updateDoc(doc(firestore, 'Culture', data.id), {
      ...data,
      updatedAt: new Date(),
      cover_img: data.cover_img.file ? cover_img : data.cover_img.fileUrl,
    })
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const deleteCulture = async (id) => {
  try {
    const docRef = await deleteDoc(doc(firestore, 'Culture', id))
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

const storeThumbnailInFirebase = async (thumbnailDataUrl, fileName) => {
  const storage = getStorage()
  const storageRef = ref(storage)
  const thumbnailRef = ref(storageRef, fileName)

  try {
    await uploadString(thumbnailRef, thumbnailDataUrl, 'data_url')
    // console.log('Thumbnail uploaded to Firebase:', thumbnailRef.fullPath)
    const downloadURL = await getDownloadURL(thumbnailRef)
    return downloadURL
  } catch (error) {
    console.error('Error uploading thumbnail to Firebase:', error)
    throw error
  }
}

export const addLanguage = async (data) => {
  try {
    let cover_img = ''
    if (data.cover_img?.file) {
      cover_img = await uploadFile(
        data.cover_img.file,
        `images/languages/${data.cover_img?.fileName}`
      )
    }
    //upload multiple videos
    const videos = []
    for (const video of data.videos) {
      const { file, fileName } = video || {}
      const url = await uploadFile(file, `videos/languages/${fileName}`)

      const thumbnailUrl = await storeThumbnailInFirebase(
        video.thumbnail,
        `images/languages/${fileName}`
      )
      videos.push({
        fileUrl: url,
        thumbnail: thumbnailUrl,
      })
    }

    const language = {
      ...data,
      createdAt: new Date(),
      cover_img,
      videos,
    }
    const docRef = await addDoc(collection(firestore, 'Languages'), language)
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const updateLanguage = async (data) => {
  try {
    let cover_img = ''
    if (data.cover_img.file) {
      const { file, fileName } = data.cover_img || {}
      const url = await uploadFile(file, `images/languages/${fileName}`)
      cover_img = url
    }

    let existingVideos = data.videos.filter((video) => !video.id)
    let newVideos = []
    for (const video of data.videos) {
      const { file, fileName, id } = video || {}
      if (id) {
        const url = await uploadFile(file, `videos/languages/${fileName}`)
        const thumbnailUrl = await storeThumbnailInFirebase(
          video.thumbnail,
          `images/languages/${fileName}`
        )
        newVideos.push({
          fileUrl: url,
          thumbnail: thumbnailUrl,
        })
      }
    }
    const docRef = await updateDoc(doc(firestore, 'Languages', data.id), {
      ...data,
      updatedAt: new Date(),
      cover_img: data.cover_img.file ? cover_img : data.cover_img.fileUrl,
      videos: [...existingVideos, ...newVideos],
    })
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const deleteLanguage = async (id) => {
  try {
    const docRef = await deleteDoc(doc(firestore, 'Languages', id))
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const addResiliency = async (data) => {
  try {
    const docRef = await setDoc(doc(firestore, 'Resiliency', 'general'), {
      ...data,
      createdAt: new Date(),
    })
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}
export const addResiliencySubCat = async (data) => {
  try {
    const { file, fileName } = data.image || {}

    const cover_img = file
      ? await uploadFile(file, `images/resiliency/${fileName}`)
      : ''
    const pdfFile = data.pdf
      ? await uploadFile(data.pdf, `pdfs/resiliency/${data.pdf.name}`)
      : ''
    const subCat = {
      title: data.title,
      cover_img,
      pdf: {
        fileUrl: pdfFile,
        fileName: data.pdf?.name ?? '',
        fileSize: data.pdf?.size ?? '',
      },
    }

    const docRef = await addDoc(
      collection(firestore, 'Resiliency', 'general', data?.cat),
      subCat
    )
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw error
  }
}
export const updateResiliencySubCat = async (data) => {
  try {
    const docRef = await setDoc(doc(firestore, 'Resiliency', 'general'), {
      ...data,
      updatedAt: new Date(),
    })
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const updateDescription = async (data) => {
  try {
    const docRef = await updateDoc(
      doc(firestore, 'Resiliency', 'general'),
      data
    )
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const createThumbnailFromVideo = async (file) => {
  return new Promise((resolve) => {
    const videoUrl = URL.createObjectURL(file)
    const videoElement = document.createElement('video')
    videoElement.src = videoUrl

    videoElement.addEventListener('loadeddata', () => {
      videoElement.currentTime = 3

      const canvas = document.createElement('canvas')
      canvas.width = videoElement.videoWidth
      canvas.height = videoElement.videoHeight
      const ctx = canvas.getContext('2d')

      videoElement.addEventListener('seeked', () => {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)

        const thumbnailDataUrl = canvas.toDataURL('image/jpeg')

        videoElement.remove()
        // URL.revokeObjectURL(videoUrl);

        resolve({
          id: Date.now(),
          name: file.name,
          file,
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(2)}mb`,
          fileType: file.type,
          fileUrl: videoUrl,
          thumbnail: thumbnailDataUrl,
        })
      })
    })
  })
}
