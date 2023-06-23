import {
  updateDoc,
  addDoc,
  doc,
  collection,
  firestore,
  deleteDoc,
} from "../../../firebase";

export const addAssessment = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, "Assessments"), data);
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const updateAssessment = async (data) => {
  try {
    const docRef = await updateDoc(
      doc(firestore, "Assessments", data.id),
      data
    );
    return docRef;
  } catch (e) {
    return e;
  }
};

export const deleteAssessment = async (id) => {
  try {
    const docRef = await deleteDoc(doc(firestore, "Assessments", id));
    return docRef;
  } catch (e) {
    return e;
  }
};

export const addQuestion = async (data) => {
  try {
    const docRef = await addDoc(
      collection(firestore, "Assessments", data.id, "questions"),
      data.data
    );
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const updateQuestion = async (data) => {
  try {
    const docRef = await updateDoc(
      doc(firestore, "Assessments", data.id, "questions", data.questionId),
      data.data
    );
    return docRef;
  } catch (e) {
    return e;
  }
};
export const addCondition = async (data) => {
  console.log(data);
  try {
    const docRef = await addDoc(
      collection(firestore, "Assessments", data.assessmentId, "conditions"),
      data
    );
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const updateCondition = async (data) => {
  try {
    const docRef = await updateDoc(
      doc(
        firestore,
        "Assessments",
        data.assessmentId,
        "conditions",
        data.conditionId
      ),
      data
    );
    return docRef;
  } catch (e) {
    return e;
  }
};
