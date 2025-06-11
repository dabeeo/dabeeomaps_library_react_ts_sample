import { create } from "zustand";

type FloorStore = {
  floors: any[];
  setFloors: (floors: any[]) => void;
};

const useFloorStore = create<FloorStore>((set, get) => ({
  floors: [],
  setFloors(floors: any[]) {
    set(() => ({
      floors,
    }));
  },
}));

export default useFloorStore;
