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
    let image = "";
    let video = "";
    let pdfUrl = "";

    if (data.image?.file) {
      image = await uploadFile(
        data.image.file,
        `images/events/${data.image?.fileName}`
      );
    }

    if (data.video?.file) {
      video = await uploadFile(
        data.video.file,
        `videos/events/${data.video?.fileName}`
      );
    }

    if (data.pdf?.file) {
      pdfUrl = await uploadFile(
        data.pdf.file,
        `pdfs//events/${data.pdf?.fileName}`
      );
    }

    const eventData = {
      ...data,
      image,
      video,
      pdf: {
        fileUrl: pdfUrl,
        fileName: data.pdf?.fileName ?? "",
        fileSize: data.pdf?.fileSize ?? "",
      },
    };
    const docRef = await addDoc(collection(firestore, "Events"), eventData);

    return docRef;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const updateEvent = async (data) => {
  try {
    let image = "";
    let video = "";
    let pdfUrl = "";

    if (data.image?.fileUrl) {
      image = await uploadFile(
        data.image.file,
        `images/events/${data.image?.fileName}`
      );
    }

    if (data.video?.fileUrl) {
      video = await uploadFile(
        data.video.file,
        `videos/events/${data.video?.fileName}`
      );
    }

    if (data.pdf?.fileUrl) {
      pdfUrl = await uploadFile(
        data.pdf.file,
        `pdfs/events/${data.pdf?.fileName}`
      );
    }

    const eventData = {
      ...data,
      image: data.image?.fileUrl ? data.image?.fileUrl : image,
      video: data.video?.fileUrl ? data.video?.fileUrl : video,
      pdf: {
        fileUrl: data.pdf?.fileUrl ? data?.pdf?.fileUrl : pdfUrl,
        fileName: data.pdf?.fileName ?? "",
        fileSize: data.pdf?.fileSize ?? "",
      },
    };

    const docRef = await updateDoc(
      doc(firestore, "Events", data.id),
      eventData
    );

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
