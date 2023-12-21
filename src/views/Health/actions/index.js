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
} from '../../../firebase'

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

export const addProvider = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, 'Providers'), data)
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const updateProvider = async (data) => {
  try {
    const docRef = await updateDoc(doc(firestore, 'Providers', data?.id), data)
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const addGroupSession = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, 'GroupSessions'), data)
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
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

export const addTreatment = async (data) => {
  try {
    const docRef = await addDoc(
      collection(firestore, 'Treatment', 'general', 'list'),
      data
    )
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const addTreatmentResource = async (data) => {
  try {
    const { file, fileName } = data.cover_img || {}

    const cover_img = file
      ? await uploadFile(file, `images/treatment/${fileName}`)
      : ''
    const pdfFile = data.pdf?.file
      ? await uploadFile(data.pdf?.file, `pdfs/treatment/${data.pdf.fileName}`)
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
    return docRef
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    throw errorCode
  }
}

export const updateTreatmentResource = async ({ id, dataId, ...rest }) => {
  try {
    let cover_img = ''
    let pdf = ''
    if (rest.cover_img.file) {
      const { file, fileName } = rest.cover_img || {}
      const url = await uploadFile(file, `images/treatment/${fileName}`)
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

export const addMedicationsList = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, 'MedicationsList'), {
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
