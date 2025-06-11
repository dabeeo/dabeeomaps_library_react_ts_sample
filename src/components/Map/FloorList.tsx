import React from "react";
import useFloorStore from "../../stores/floor";
import useLoadingStore from "../../stores/loading";
import styles from "./Map.module.css";
import MapDraw from "./MapDraw";

/**
 * 지도와 층 데이터를 받아 층 목록 UI를 렌더링하는 TypeScript 컴포넌트
 */
const FloorList: React.FC = () => {
  const loadingStore = useLoadingStore();
  const floorStore = useFloorStore();

  // map 또는 floors 데이터가 아직 준비되지 않았으면 아무것도 렌더링하지 않습니다.
  if (loadingStore.isLoadingMap) {
    return null;
  }

  // 층 변경 시 실행될 클릭 핸들러 함수
  const handleFloorChange = async (floorId: string) => {
    // 유효한 map 객체와 changeFloor 함수가 있는지 확인
    if (!MapDraw.map.context.changeFloor) return;

    try {
      loadingStore.setFloorChanging(true);
      await MapDraw.map.context.changeFloor(floorId);
      loadingStore.setFloorChanging(false);
    } catch (error) {
      console.error("층을 변경하는 중 에러가 발생했습니다.", error);
    } finally {
      loadingStore.setFloorChanging(false);
    }
  };

  return (
    <div className={styles.floorList}>
      {floorStore.floors.map((floor: any) => {
        // floor.name 배열에서 한국어 이름을 찾습니다.
        const koName = floor.name.find((name: any) => name.lang === "ko");

        if (!koName) {
          return null;
        }

        return (
          <div
            key={floor.id}
            className="floorItem"
            onClick={() => handleFloorChange(floor.id)}
          >
            {koName.text}
          </div>
        );
      })}
    </div>
  );
};

export default FloorList;
