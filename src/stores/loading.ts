import { create } from "zustand";

type LoadingStoreProps = {
  hasMapData: boolean;
  setHasMapData: (hasMapData: boolean) => void;

  isLoadingMap: boolean;
  setLoadingMap: (isLoadingMap: boolean) => void;

  isFloorChanging: boolean;
  setFloorChanging: (isFloorChanging: boolean) => void;
};

const useLoadingStore = create<LoadingStoreProps>((set, get) => ({
  hasMapData: false,
  setHasMapData(hasMapData: boolean) {
    set(() => ({ hasMapData }));
  },

  isLoadingMap: true,
  setLoadingMap(isLoadingMap: boolean) {
    set(() => ({ isLoadingMap }));
  },

  isFloorChanging: false,
  setFloorChanging(isFloorChanging: boolean) {
    set(() => ({ isFloorChanging }));
  },
}));

export default useLoadingStore;
