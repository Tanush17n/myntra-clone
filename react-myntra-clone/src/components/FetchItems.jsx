import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../store/itemSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    // Prevent refetch if already done
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.showFetchingStarting());

    // Use environment variable or fallback to localhost
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

    console.log("API URL:", apiUrl);

    fetch(`${apiUrl}/items`, { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(({ items }) => {
        dispatch(fetchStatusActions.showFetchingDone());
        // Add fetched items to the store
        dispatch(itemActions.addInitialItems(items[0]));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        // Mark fetch as failed
        dispatch(fetchStatusActions.showFetchFailed());
      });

    return () => {
      // Abort the fetch on component unmount
      controller.abort();
    };
  }, [fetchStatus.fetchDone, dispatch]); // Only re-run if fetchDone or dispatch changes

  return <></>; // No UI rendered by this component
};

export default FetchItems;
