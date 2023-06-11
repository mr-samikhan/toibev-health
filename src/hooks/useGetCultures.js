import { useQuery } from "react-query";
import { firestore, collection, getDocs } from "../firebase";

const fetchInfo = async () => {
  let cultureData = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "Culture"));

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      let culture = {
        id: doc.id,
        ...doc.data(),
      };
      cultureData.push(culture);
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
    return cultureData;
  } catch (error) {
    return error;
  }
};

export const useGetCultures = ({ enabled = true }) => {
  const { data, isLoading, error } = useQuery(["get-all-cultures"], fetchInfo, {
    enabled,
  });
  return { isLoading, error, cultures: data };
};
