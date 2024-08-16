import { useEffect, useState } from "react";
import styles from "./Map.module.css";

interface Props {
  map: any | null;
  addMap: (viewer: HTMLElement) => Promise<any>;
  removeMap: () => void;
  setLoading: (loading: boolean) => void;
}

const Map = ({ map, addMap, removeMap, setLoading }: Props) => {
  const [floors, setFloors] = useState<any[]>([]);

  useEffect(() => {
    const viewer = document.getElementById("viewer");
    if (viewer) {
      addMap(viewer).then((e: any) => {
        setFloors(e.dataFloor.getFloors());
      });
    }

    return () => {
      removeMap();
    };
  }, []);

  useEffect(() => {
    if (floors && map) {
      const floorList = document.getElementById("floorList");
      if (floorList) {
        floors.forEach((floor) => {
          const result = floor.name.find(
            (name: { lang: string }) => name.lang === "ko"
          );
          if (result) {
            const item = document.createElement("div");
            item.classList.add("floorItem");
            item.innerText = result.text;

            item.addEventListener("click", async () => {
              setLoading(true);
              await map.context.changeFloor(floor.id);
              setLoading(false);
            });
            floorList.appendChild(item);
          }
        });
      }
    }
  }, [map, floors, setLoading]);

  return (
    <div className={styles.map} id="viewer">
      <div className={styles.floorList} id="floorList"></div>
    </div>
  );
};

export default Map;
