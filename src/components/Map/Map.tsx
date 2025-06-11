import { useEffect, useRef } from "react";
import useLoadingStore from "../../stores/loading";
import Loading from "../Loading/Loading";
import FloorList from "./FloorList";
import styles from "./Map.module.css";
import MapDraw from "./MapDraw";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const loadingStore = useLoadingStore();

  const showAndAppendMap = async () => {
    if (mapRef.current) {
      const map = mapRef.current;
      await new MapDraw().showMap(map);

      loadingStore.setLoadingMap(false);
    }
  };

  useEffect(() => {
    if (loadingStore.hasMapData) {
      showAndAppendMap();
    }
  }, [loadingStore.hasMapData]);

  useEffect(() => {
    return () => {
      MapDraw.cleanup();
      loadingStore.setLoadingMap(true);
    };
  }, []);

  return (
    <div className={styles.mapContainer}>
      {(loadingStore.isFloorChanging || loadingStore.isLoadingMap) && (
        <Loading />
      )}
      <FloorList />
      <div className={styles.map} ref={mapRef}></div>
    </div>
  );
};

export default Map;
