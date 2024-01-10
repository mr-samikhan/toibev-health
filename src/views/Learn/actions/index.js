import { getStorage, uploadString } from 'firebase/storage'
import {
  doc,
  ref,
  addDoc,
  setDoc,
  storage,
  updateDoc,
  firestore,
  deleteDoc,
  collection,
  uploadBytes,
  getDownloadURL,
  getDocs,
} from '../../../firebase'

const UNIQUE_STRING = Math.random().toString(36).substr(2, 9)

const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, `${path}_${UNIQUE_STRING}`)
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
    // let cover_img = ''
    // if (data.cover_img?.file) {
    //   cover_img = await uploadFile(
    //     data.cover_img.file,
    //     `images/languages/${data.cover_img?.fileName}`
    //   )
    // }
    //upload multiple videos
    // const videos = []
    // for (const video of data.videos) {
    //   const { file, fileName } = video || {}
    //   const url = await uploadFile(file, `videos/languages/${fileName}`)

    //   const thumbnailUrl = await storeThumbnailInFirebase(
    //     video.thumbnail,
    //     `images/languages/${fileName}`
    //   )
    //   videos.push({
    //     fileUrl: url,
    //     thumbnail: thumbnailUrl,
    //   })
    // }
    //end

    //upload audio image file
    const words = []
    for (const word of data.words) {
      const { image, audio, title } = word || {}

      const imageUrl = await uploadFile(
        image.file,
        `images/languages/${image.fileName}`
      )
      const audioUrl = await uploadFile(
        audio.file,
        `audio/languages/${audio.fileName}`
      )
      words.push({
        title,
        image: {
          fileUrl: imageUrl,
          fileName: image.fileName,
          fileSize: image.fileSize,
        },
        audio: {
          fileUrl: audioUrl,
          fileName: audio.fileName,
          fileSize: audio.fileSize,
        },
      })
    }
    // end

    const language = {
      ...data,
      createdAt: new Date(),
      words,
      // cover_img,
      // videos,
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
    const words = []

    await Promise.all(
      data.words.map(async (word) => {
        let { image, audio, title } = word || {}

        if (image?.file === undefined || image?.file === '') {
          image = {
            fileUrl: image?.fileUrl,
            fileName: image?.fileName,
            fileSize: image?.fileSize,
          }
        }

        if (audio?.file === undefined || audio?.file === '') {
          audio = {
            fileUrl: audio?.fileUrl,
            fileName: audio?.fileName,
            fileSize: audio?.fileSize,
          }
        }

        if (image?.file !== undefined) {
          const imgUrl = await uploadFile(
            image.file,
            `images/languages/${image.fileName}`
          )
          word.image = {
            fileUrl: imgUrl,
            fileName: image.fileName,
            fileSize: image.fileSize,
          }
        }

        if (audio?.file !== undefined) {
          const audioUrl = await uploadFile(
            audio.file,
            `audio/languages/${audio.fileName}`
          )
          word.audio = {
            fileUrl: audioUrl,
            fileName: audio.fileName,
            fileSize: audio.fileSize,
          }
        }

        words.push({ ...word, title })
      })
    )
    const docRef = await updateDoc(doc(firestore, 'Languages', data.id), {
      ...data,
      updatedAt: new Date(),
      words,
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

export const updateResiliency = async ({
  data,
  newCollectionName,
  oldCollectionName,
}) => {
  try {
    const collectionName = newCollectionName?.split(' ').join('_').toLowerCase()
    const oldCollectionName_ = oldCollectionName
      ?.split(' ')
      .join('_')
      .toLowerCase()

    //get collection data
    const collectionRef = collection(
      firestore,
      'Resiliency',
      'general',
      oldCollectionName_
    )
    const querySnapshot = await getDocs(collectionRef)
    if (querySnapshot.docs.length > 0) {
      const existingRecs = querySnapshot.docs.map((doc) => doc.data())

      //add collection here
      const firestoreCollection = collection(
        firestore,
        'Resiliency',
        'general',
        collectionName
      )

      // Delete each document in the collection
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref)
      })

      for (const item of existingRecs) {
        try {
          await addDoc(firestoreCollection, item)
          // console.log('Document successfully added!')
        } catch (error) {
          console.error('Error adding document: ', error)
        }
      }
      const index = data.menu.findIndex(
        (item) => item.title === oldCollectionName
      )

      if (index !== -1) {
        data.menu[index].title = newCollectionName
        data.menu[index].value = collectionName
      }

      // update doc here
      const resiliencyDocRef = doc(firestore, 'Resiliency', 'general')
      await updateDoc(
        resiliencyDocRef,
        {
          ['menu']: data.menu,
        },
        {
          merge: true,
        }
      )
    } else {
      //only update menu
      const index = data.menu.findIndex(
        (item) => item.title === oldCollectionName
      )

      if (index !== -1) {
        data.menu[index].title = newCollectionName
        data.menu[index].value = collectionName
      }
      const resiliencyDocRef = doc(firestore, 'Resiliency', 'general')
      await updateDoc(
        resiliencyDocRef,
        {
          ['menu']: data.menu,
        },
        {
          merge: true,
        }
      )
    }
    return true
  } catch (error) {
    console.log('error', error)
    return error
  }
}

export const deleteResiliency = async ({ collectionName, data }) => {
  try {
    const oldCollectionName_ = collectionName
      ?.split(' ')
      .join('_')
      .toLowerCase()
    const index = data.menu.findIndex((item) => item.title === collectionName)

    if (index !== -1) {
      data.menu.splice(index, 1)
    }
    const collectionRef = collection(
      firestore,
      'Resiliency',
      'general',
      oldCollectionName_
    )
    const querySnapshot = await getDocs(collectionRef)
    if (querySnapshot.docs.length > 0) {
      // Delete each document in the collection
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref)
      })
      const resiliencyDocRef = doc(firestore, 'Resiliency', 'general')
      await updateDoc(
        resiliencyDocRef,
        {
          ['menu']: data.menu,
        },
        {
          merge: true,
        }
      )
    } else {
      //only update menu

      const resiliencyDocRef = doc(firestore, 'Resiliency', 'general')
      await updateDoc(
        resiliencyDocRef,
        {
          ['menu']: data.menu,
        },
        {
          merge: true,
        }
      )
    }
    return true
  } catch (error) {
    console.log('error', error)
    return error
  }
}

export const addResiliencySubCat = async (data) => {
  try {
    const { file, fileName } = data.cover_img || {}

    const cover_img = file
      ? await uploadFile(file, `images/resiliency-subCat/${fileName}`)
      : ''

    const pdfFile = data.pdf.file
      ? await uploadFile(
          data.pdf.file,
          `pdfs/resiliency-subCat/${data.pdf.fileName}`
        )
      : ''

    const subCat = {
      title: data.title,
      cover_img,
      pdf: {
        fileUrl: pdfFile,
        fileName: data.pdf?.fileName ?? '',
        fileSize: data.pdf?.fileSize ?? '',
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

export const updateResiliencySubCat = async ({ data, collectionName }) => {
  try {
    let cover_img = ''
    if (data.cover_img.file) {
      const { file, fileName } = data.cover_img || {}
      const url = await uploadFile(file, `images/resiliency-subCat/${fileName}`)
      cover_img = url
    }

    if (data.pdf?.file) {
      const pdfFile = await uploadFile(
        data.pdf.file,
        `pdfs/resiliency-subCat/${data.pdf.fileName}`
      )
      data.pdf = {
        fileUrl: pdfFile,
        fileName: data.pdf?.fileName ?? '',
        fileSize: data.pdf?.fileSize ?? '',
      }
    }

    const resiliencyDocRef = doc(
      firestore,
      `Resiliency/general/${collectionName}`,
      data.id
    )

    return await updateDoc(resiliencyDocRef, {
      ...data,
      updatedAt: new Date(),
      cover_img: data.cover_img.file ? cover_img : data.cover_img.fileUrl,
    })
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
