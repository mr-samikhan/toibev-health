import { checkForDuplicate } from '../../../common/helpers'
import { DUPLICATE_RECORD_ERROR } from '../../../constants'
import {
  ref,
  doc,
  addDoc,
  storage,
  firestore,
  updateDoc,
  deleteDoc,
  collection,
  uploadBytes,
  getDownloadURL,
  query,
  getDocs,
} from '../../../firebase'
import { convertImageTo } from '../../../utils/imageConverter'

const UNIQUE_STRING = Math.random().toString(36).substr(2, 9)

const uploadFile = async (file, path) => {
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

export const addProvider = async ({ data, providers }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = providers.some(
        (item) => item?.name?.toLowerCase() === data?.name?.toLowerCase()
      )
      if (check) {
        reject(DUPLICATE_RECORD_ERROR)
      } else {
        const docRef = await addDoc(collection(firestore, 'Providers'), data)
        resolve(docRef)
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      reject(errorCode || errorMessage)
    }
  })
}

export const updateProvider = async ({ data, providers, newTitle }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        newTitle !== null &&
        providers?.some(
          (item) => item?.title?.toLowerCase() === newTitle?.toLowerCase()
        )
      ) {
        reject(DUPLICATE_RECORD_ERROR)
      } else {
        const docRef = await updateDoc(
          doc(firestore, 'Providers', data?.id),
          data
        )
        resolve(docRef)
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      reject(errorCode || errorMessage)
    }
  })
}

export const addGroupSession = async ({ data, groupSessions }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = checkForDuplicate(groupSessions, data.title)
      if (!check) {
        reject(DUPLICATE_RECORD_ERROR)
      } else {
        const docRef = await addDoc(
          collection(firestore, 'GroupSessions'),
          data
        )
        resolve(docRef)
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      reject(errorCode || errorMessage)
    }
  })
}

export const updateGroupSession = async (data) => {
  try {
    const docRef = await updateDoc(
      doc(firestore, 'GroupSessions', data?.id),
      data
    )
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const deleteGroupSession = async (id) => {
  try {
    await deleteDoc(doc(firestore, 'GroupSessions', id))
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

export const addTreatment = async ({ data, previous_recs }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        previous_recs?.some(
          (rec) => rec?.title.toLowerCase() === data?.title.toLowerCase()
        )
      ) {
        reject('duplicate-record')
      } else {
        const docRef = await addDoc(
          collection(firestore, 'Treatment', 'general', 'list'),
          data
        )
        resolve(docRef)
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      reject(errorCode || errorMessage)
    }
  })
}

export const addTreatmentResource = async ({ data, treatmentOptions }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = checkForDuplicate(treatmentOptions, data.title)
      if (!check) {
        reject(DUPLICATE_RECORD_ERROR)
      } else {
        const { file, fileName } = data.cover_img || {}
        const convertedFile = file
          ? await convertImageTo('jpg', file, fileName)
          : ''

        const cover_img = file
          ? await uploadFile(convertedFile, `images/treatment/${fileName}`)
          : ''
        const pdfFile = data.pdf?.file
          ? await uploadFile(
              data.pdf?.file,
              `pdfs/treatment/${data.pdf.fileName}`
            )
          : ''
        const docRef = await addDoc(
          collection(
            firestore,
            'Treatment',
            'general',
            'list',
            data?.id,
            'options'
          ),
          {
            ...data,
            cover_img,
            pdf: {
              fileUrl: pdfFile,
              fileName: data.pdf?.fileName ?? '',
              fileSize: data.pdf?.fileSize ?? '',
            },
          }
        )
        resolve(docRef)
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      reject(errorCode || errorMessage)
    }
  })
}

export const updateTreatmentResource = async ({ id, dataId, ...rest }) => {
  try {
    let cover_img = ''
    let pdf = ''
    if (rest.cover_img.file) {
      const { file, fileName } = rest.cover_img || {}
      const convertedFile = file
        ? await convertImageTo('jpg', file, fileName)
        : ''
      const url = await uploadFile(
        convertedFile,
        `images/treatment/${fileName}`
      )
      cover_img = url
    }
    if (rest.pdf?.file) {
      const url = await uploadFile(
        rest.pdf.file,
        `pdfs/treatment/${rest.pdf.fileName}`
      )
      pdf = url
      rest.pdf = {
        fileUrl: pdf,
        fileName: rest.pdf?.fileName ?? '',
        fileSize: rest.pdf?.fileSize ?? '',
      }
    }
    const docRef = await updateDoc(
      doc(firestore, 'Treatment', 'general', 'list', dataId, 'options', id),
      {
        ...rest,
        updatedAt: new Date(),
        cover_img: rest.cover_img.file ? cover_img : rest.cover_img.fileUrl,
      }
    )
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const deleteTreatmentResource = async ({ id, dataId }) => {
  try {
    await deleteDoc(
      doc(firestore, 'Treatment', 'general', 'list', dataId, 'options', id)
    )
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const updateTreatment = async (data) => {
  try {
    const docRef = await updateDoc(
      doc(firestore, 'Treatment', 'general', 'list', data?.id),
      data
    )
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const addMedicationsList = async ({ data, medications }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = checkForDuplicate(medications, data.title)
      if (!check) {
        reject(DUPLICATE_RECORD_ERROR)
      } else {
        const docRef = await addDoc(collection(firestore, 'MedicationsList'), {
          ...data,
          createdAt: new Date(),
        })
        resolve(docRef)
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      reject(errorCode || errorMessage)
    }
  })
}

export const updateMedicationsList = async (data) => {
  try {
    const docRef = await updateDoc(
      doc(firestore, 'MedicationsList', data?.id),
      { ...data, updatedAt: new Date() }
    )
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const deleteMedicationsList = async (id) => {
  try {
    await deleteDoc(doc(firestore, 'MedicationsList', id))
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

export const fetchAvailablilites = async (startDate, endDate) => {
  const providersRef = collection(firestore, 'Providers')
  const startDate_ = new Date(startDate)
  const endDate_ = new Date(endDate)

  const startSeconds = Math.floor(startDate_.getTime() / 1000)
  const endSeconds = Math.floor(endDate_.getTime() / 1000)
  const q = query(providersRef)
  const querySnapshot = await getDocs(q)
  let totalCount = 0

  querySnapshot.forEach((doc) => {
    const availabilities = doc.data().availabilities || []

    const countForDoc = availabilities.reduce((count, avail) => {
      if (
        avail?.isScheduled === true &&
        avail?.scheduledAt &&
        avail?.scheduledAt?.seconds >= startSeconds &&
        avail?.scheduledAt?.seconds <= endSeconds
      ) {
        count++
      }
      return count
    }, 0)

    totalCount += countForDoc
  })

  return totalCount
}
