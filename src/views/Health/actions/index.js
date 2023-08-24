import {
  updateDoc,
  addDoc,
  doc,
  collection,
  firestore,
  deleteDoc,
  setDoc,
} from "../../../firebase";

export const addProvider = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, "Providers"), data);
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const updateProvider = async (data) => {
  try {
    const docRef = await updateDoc(doc(firestore, "Providers", data?.id), data);
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const addGroupSession = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, "GroupSessions"), data);
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const updateGroupSession = async (data) => {
  try {
    const docRef = await updateDoc(
      doc(firestore, "GroupSessions", data?.id),
      data
    );
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const deleteGroupSession = async (id) => {
  try {
    await deleteDoc(doc(firestore, "GroupSessions", id));
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

export const addTreatment = async (data) => {
  try {
    const docRef = await addDoc(
      collection(firestore, "Treatment", "general", "list"),
      data
    );
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};
export const addTreatmentResource = async (data) => {
  try {
    const docRef = await addDoc(
      collection(
        firestore,
        "Treatment",
        "general",
        "list",
        data?.id,
        "options"
      ),
      data
    );
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};
export const updateTreatmentResource = async ({ id, dataId, ...rest }) => {
  try {
    const docRef = await updateDoc(
      doc(firestore, "Treatment", "general", "list", dataId, "options", id),
      { ...rest }
    );
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const deleteTreatmentResource = async ({ id, dataId }) => {
  console.log(id, dataId);
  try {
    const docRef = await deleteDoc(
      doc(firestore, "Treatment", "general", "list", dataId, "options", id)
    );
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const updateTreatment = async (data) => {
  try {
    const docRef = await updateDoc(
      doc(firestore, "Treatment", "general", "list", data?.id),
      data
    );
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const addMedicationsList = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, "MedicationsList"), data);
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const updateMedicationsList = async (data) => {
  try {
    const docRef = await updateDoc(
      doc(firestore, "MedicationsList", data?.id),
      data
    );
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const deleteMedicationsList = async (id) => {
  try {
    await deleteDoc(doc(firestore, "MedicationsList", id));
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
