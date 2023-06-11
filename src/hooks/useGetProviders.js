import { useQuery } from "react-query";
import { firestore, collection, getDocs, getDoc, doc } from "../firebase";

const fetchInfo = async () => {
  let providersData = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "Providers"));

    querySnapshot.forEach(async (document) => {
      console.log(document.id, " => ", document.data());
      let provider = {
        id: document.id,
        subtitle: document.data().address,
        title: document.data().name,
        ...document.data(),
      };
      const docRef = doc(firestore, doc, "courses");
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      providersData.push(provider);
    });

    // if (querySnapshot && querySnapshot.size > 0) {
    //   for (const culDoc of querySnapshot.docs) {
    // let culture = {
    //   id: culDoc.id,
    //   ...culDoc.data(),
    // };
    // const coursesSnap = await CULTURE_COLLECTION.doc(culDoc.id)
    //   .collection("courses")
    //   .get();
    // let courses = [];
    // coursesSnap.forEach((courseDoc) => {
    //   courses.push({
    //     id: courseDoc.id,
    //     ...courseDoc.data(),
    //   });
    // });
    // culture.courses = courses;
    // cultureData.push(culture);
    //   }
    // }
    return providersData;
  } catch (error) {
    return error;
  }
};

export const useGetProviders = ({ enabled = true }) => {
  const { data, isLoading, error } = useQuery(
    ["get-all-providers"],
    fetchInfo,
    {
      enabled,
    }
  );
  return { isLoading, error, providers: data };
};
