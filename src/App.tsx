import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Main from "./components/Main/Main";
import MapDraw from "./components/Map/MapDraw";
import useLoadingStore from "./stores/loading";
import useFloorStore from "./stores/floor";

function App() {
  const [loadMapScript, setLoadMapScript] = useState<boolean>(false);
  const loadingStore = useLoadingStore();
  const floorStore = useFloorStore();
  const [count, setCount] = useState(1);

  const getMapData = useCallback(async () => {
    try {
      const mapData = await MapDraw.getInstance().getMapData({
        clientId: "byQdkBiK4_qbW3lNRooB_Q",
        clientSecret: "2e77b65e659705891c0ca2e66d74e285",
      });

      // mapData가 없을 경우
      if (!mapData) {
        return undefined;
      }

      MapDraw.mapData = mapData;
      floorStore.setFloors(mapData.dataFloor.getFloors());
      loadingStore.setHasMapData(true);
    } catch (e) {
      console.error("dabeeoMaps getMapData error!", e);
    }
  }, []);

  // 1. dabeeomaps map script 로딩 완료
  useEffect(() => {
    setLoadMapScript(true);
    MapDraw.getInstance();
  }, []);

  // 2. dabeeo map data 조회
  useEffect(() => {
    if (loadMapScript) {
      getMapData();
    }
  }, [loadMapScript]);

  return (
    <div className="App">
      <Header setCount={setCount} />
      {count === 2 ? <Map /> : <Main count={count} />}
    </div>
  );
}

export default App;
