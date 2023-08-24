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

const uploadFile = async (file, path) => {
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

export const addEvent = async (data) => {
  try {
    const { image, video, pdf, ...otherData } = data;

    const docRef = await addDoc(collection(firestore, "Events"), otherData);

    if (image?.file) {
      const imageName = `${docRef.id}_${image.fileName}`;
      const imageUrl = await uploadFile(
        image.file,
        `images/events/${imageName}`
      );
      await updateDoc(doc(firestore, "Events", docRef.id), { image: imageUrl });
    }
    if (video?.file) {
      const videoName = `${docRef.id}_${video.fileName}`;
      const videoUrl = await uploadFile(
        video.file,
        `videos/events/${videoName}`
      );
      await updateDoc(doc(firestore, "Events", docRef.id), { video: videoUrl });
    }
    if (pdf?.file) {
      const pdfName = `${docRef.id}_${pdf.fileName}`;
      const pdfUrl = await uploadFile(pdf.file, `pdfs/events/${pdfName}`);
      await updateDoc(doc(firestore, "Events", docRef.id), {
        pdf: {
          fileUrl: pdfUrl,
          fileName: pdf.fileName || "",
          fileSize: pdf.fileSize || "",
        },
      });
    }

    return docRef;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const updateEvent = async (data) => {
  try {
    const { image, video, pdf, ...otherData } = data;

    const docRef = await updateDoc(
      doc(firestore, "Events", data.id),
      otherData
    );

    if (image?.file) {
      const imageName = `${data.id}_${image.fileName}`;
      const imageUrl = await uploadFile(
        image.file,
        `images/events/${imageName}`
      );
      await updateDoc(doc(firestore, "Events", data.id), { image: imageUrl });
    }
    if (video?.file) {
      const videoName = `${data.id}_${video.fileName}`;
      const videoUrl = await uploadFile(
        video.file,
        `videos/events/${videoName}`
      );
      await updateDoc(doc(firestore, "Events", data.id), { video: videoUrl });
    }
    if (pdf?.file) {
      const pdfName = `${data.id}_${pdf.fileName}`;
      const pdfUrl = await uploadFile(pdf.file, `pdfs/events/${pdfName}`);
      await updateDoc(doc(firestore, "Events", data.id), {
        pdf: {
          fileUrl: pdfUrl,
          fileName: pdf.fileName || "",
          fileSize: pdf.fileSize || "",
        },
      });
    }

    return docRef;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    await deleteDoc(doc(firestore, "Events", id));
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
