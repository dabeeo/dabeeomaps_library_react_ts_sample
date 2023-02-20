import { useCallback, useState } from 'react'
import './App.css'
import { Maps, DabeeoMap } from 'dabeeomaps';
import Loading from './components/Loading/Loading';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import Main from './components/Main/Main';

function App() {
  const [map, setMap] = useState<DabeeoMap | null>(null);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const dabeeoMaps = new Maps();

  const removeMap = () => {
    if (map) {
      map.context.cleanup();
      const mapContainer = document.querySelector(".map");
      if (mapContainer?.parentNode) {
        mapContainer.parentNode.removeChild(mapContainer);
      }
      setMap(null);
    }
  }

  const addMap = useCallback(async (parent: HTMLElement) => {
    const mapContainer = document.createElement("div");
    mapContainer.style.width = "80%";
    mapContainer.style.height = "100%";
    mapContainer.classList.add("map");
    parent.appendChild(mapContainer);

    setLoading(true);
    const mapData = await dabeeoMaps.getMapData({
      clientId: "byQdkBiK4_qbW3lNRooB_Q",
      clientSecret: "2e77b65e659705891c0ca2e66d74e285",
    });

    const mapOption = {};
    const dabeeoMap = await dabeeoMaps.showMap(
      mapContainer,
      mapOption,
      mapData
    );
    setMap(dabeeoMap);
    setLoading(false);

    return mapData;
  }, []);

  return (
    <div className="App">
      {loading && <Loading />}
      <Header setCount={setCount} />
      {count === 2 ? (
        <Map map={map} addMap={addMap} removeMap={removeMap} setLoading={setLoading} />
      ) : (
        <Main count={count} />
      )}
    </div>
  )
}

export default App
