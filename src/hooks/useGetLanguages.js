import { useQuery } from "react-query";
import { firestore, collection, getDocs } from "../firebase";

const fetchInfo = async () => {
  let languageData = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "Languages"));

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      let language = {
        id: doc.id,
        subtitle: doc.data().description,
        ...doc.data(),
      };
      languageData.push(language);
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
    return languageData;
  } catch (error) {
    return error;
  }
};

export const useGetLanguages = ({ enabled = true }) => {
  const { data, isLoading, error } = useQuery(
    ["get-all-languages"],
    fetchInfo,
    {
      enabled,
    }
  );
  return { isLoading, error, languages: data };
};
