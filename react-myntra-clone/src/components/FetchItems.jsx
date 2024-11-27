import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../store/itemSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.showFetchingStarting());

    // Use the environment variable for API URL
    const apiUrl =
      process.env.REACT_APP_API_URL || "http://localhost:8080/items"; // Default to localhost if not set

    fetch(apiUrl, { signal })
      .then((res) => res.json())
      .then(({ items }) => {
        dispatch(fetchStatusActions.showFetchDone());
        dispatch(fetchStatusActions.showFetchingDone());
        dispatch(itemActions.addInitialItems(items[0]));
      });

    return () => {
      // controller.abort(); // Uncomment if you need to abort the fetch on component unmount
    };
  }, [fetchStatus]);

  return <></>;
};

export default FetchItems;
