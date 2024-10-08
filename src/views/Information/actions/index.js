import { checkForDuplicate } from '../../../common/helpers'
import { DUPLICATE_RECORD_ERROR } from '../../../constants'
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
} from '../../../firebase'

const UNIQUE_STRING = Math.random().toString(36).substr(2, 9)

const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, `${path}__${UNIQUE_STRING}`)
    const snapshot = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snapshot.ref)
    return url
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const addService = async ({ data, services_ }) => {
  return new Promise(async (resolve, reject) => {
    let images = []
    try {
      const check = checkForDuplicate(services_, data.title)
      if (!check) {
        reject(DUPLICATE_RECORD_ERROR)
      } else {
      }
      for (let index = 0; index < data?.images.length; index++) {
        const file = data?.images[index]
        if (file?.file) {
          const url = await uploadImage(
            file.file,
            `images/services/${index}/${file.fileName}`
          )
          images.push(url)
        } else {
          images.push(file.fileUrl)
        }
      }

      const serviceData = {
        ...data,
        images,
      }

      const docRef = await addDoc(
        collection(firestore, 'Information', 'services', 'list'),
        serviceData
      )

      resolve(docRef)
    } catch (error) {
      console.error('Error adding document:', error)
      reject(error)
    }
  })
}

export const updateService = async (data) => {
  let images = []
  try {
    for (let index = 0; index < data?.images.length; index++) {
      const file = data?.images[index]
      if (file?.file) {
        const url = await uploadImage(
          file.file,
          `images/services/${index}/${file.fileName}`
        )
        images.push(url)
      } else {
        images.push(file.fileUrl)
      }
    }

    const serviceData = {
      ...data,
      images,
    }
    const docRef = await updateDoc(
      doc(firestore, 'Information', 'services', 'list', data.id),
      serviceData
    )

    return docRef
  } catch (error) {
    console.error('Error adding document:', error)
    throw error
  }
}

export const deleteService = async (id) => {
  try {
    await deleteDoc(doc(firestore, 'Information', 'services', 'list', id))
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

export const addClinic = async ({ data, clinics }) => {
  return new Promise(async (resolve, reject) => {
    let images = []
    try {
      const check = checkForDuplicate(clinics, data.title)
      if (!check) {
        reject(DUPLICATE_RECORD_ERROR)
      } else {
        for (let index = 0; index < data?.images.length; index++) {
          const file = data?.images[index]
          if (file?.file) {
            const url = await uploadImage(
              file.file,
              `images/clinics/${index}/${file.fileName}`
            )
            images.push(url)
          } else {
            images.push(file.fileUrl)
          }
        }

        const clinicData = {
          ...data,
          images,
        }

        const docRef = await addDoc(
          collection(firestore, 'Information', 'clinics', 'list'),
          clinicData
        )

        resolve(docRef)
      }
    } catch (error) {
      console.error('Error adding document:', error)
      reject(error)
    }
  })
}

export const updateClinic = async (data) => {
  let images = []
  try {
    for (let index = 0; index < data?.images.length; index++) {
      const file = data?.images[index]
      if (file?.file) {
        const url = await uploadImage(
          file.file,
          `images/clinics/${index}/${file.fileName}`
        )
        images.push(url)
      } else {
        images.push(file.fileUrl)
      }
    }

    const clinicData = {
      ...data,
      images,
    }
    const docRef = await updateDoc(
      doc(firestore, 'Information', 'clinics', 'list', data.id),
      clinicData
    )

    return docRef
  } catch (error) {
    console.error('Error adding document:', error)
    throw error
  }
}

export const deleteClinic = async (id) => {
  try {
    await deleteDoc(doc(firestore, 'Information', 'clinics', 'list', id))
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

export const updateSocialLinks = async (data) => {
  try {
    await setDoc(doc(firestore, 'Information', 'clinics'), data, {
      merge: true,
    })
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

export const updateDescription = async (data) => {
  try {
    await setDoc(doc(firestore, 'Information', 'services'), data, {
      merge: true,
    })
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}
