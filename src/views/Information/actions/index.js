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
} from "../../../firebase";

const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const addService = async (data) => {
  let images = [];
  try {
    for (let index = 0; index < data?.images.length; index++) {
      const file = data?.images[index];
      if (file?.file) {
        const url = await uploadImage(
          file.file,
          `images/services/${index}/${file.fileName}`
        );
        images.push(url);
      } else {
        images.push(file.fileUrl);
      }
    }

    const serviceData = {
      ...data,
      images,
    };

    const docRef = await addDoc(
      collection(firestore, "Information", "services", "list"),
      serviceData
    );

    return docRef;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const updateService = async (data) => {
  let images = [];
  try {
    for (let index = 0; index < data?.images.length; index++) {
      const file = data?.images[index];
      if (file?.file) {
        const url = await uploadImage(
          file.file,
          `images/services/${index}/${file.fileName}`
        );
        images.push(url);
      } else {
        images.push(file.fileUrl);
      }
    }

    const serviceData = {
      ...data,
      images,
    };
    const docRef = await updateDoc(
      doc(firestore, "Information", "services", "list", data.id),
      serviceData
    );

    return docRef;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    await deleteDoc(doc(firestore, "Information", "services", "list", id));
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

export const addClinic = async (data) => {
  let images = [];
  try {
    for (let index = 0; index < data?.images.length; index++) {
      const file = data?.images[index];
      if (file?.file) {
        const url = await uploadImage(
          file.file,
          `images/clinics/${index}/${file.fileName}`
        );
        images.push(url);
      } else {
        images.push(file.fileUrl);
      }
    }

    const clinicData = {
      ...data,
      images,
    };

    const docRef = await addDoc(
      collection(firestore, "Information", "clinics", "list"),
      clinicData
    );

    return docRef;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const updateClinic = async (data) => {
  let images = [];
  try {
    for (let index = 0; index < data?.images.length; index++) {
      const file = data?.images[index];
      if (file?.file) {
        const url = await uploadImage(
          file.file,
          `images/clinics/${index}/${file.fileName}`
        );
        images.push(url);
      } else {
        images.push(file.fileUrl);
      }
    }

    const clinicData = {
      ...data,
      images,
    };
    const docRef = await updateDoc(
      doc(firestore, "Information", "clinics", "list", data.id),
      clinicData
    );

    return docRef;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const deleteClinic = async (id) => {
  try {
    await deleteDoc(doc(firestore, "Information", "clinics", "list", id));
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

export const updateSocialLinks = async (data) => {
  try {
    await updateDoc(doc(firestore, "Information", "clinics"), data);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
