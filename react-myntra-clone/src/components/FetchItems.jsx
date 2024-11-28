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

    const apiUrl =
      process.env.REACT_APP_API_URL || "http://localhost:8080/items";

    fetch(`${apiUrl}/items`, { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(({ items }) => {
        dispatch(fetchStatusActions.showFetchingDone());
        dispatch(itemActions.addInitialItems(items[0]));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        dispatch(fetchStatusActions.showFetchingDone());
      });

    return () => {
      controller.abort();
    };
  }, [fetchStatus, dispatch]);

  return <></>;
};

export default FetchItems;
