import { Maps } from "dabeeomaps";
import { isEmpty } from "lodash";

declare global {
  interface Window {
    dabeeo: any;
  }
}

class MapDraw {
  static get mapContainer() {
    return this._mapContainer;
  }

  private static isShowingMapInProgress = false;

  private static _mapContainer: HTMLDivElement;

  static dabeeoMaps: any = null;

  static map: any = null;

  static mapData: any = null;

  public static getInstance() {
    if (isEmpty(this.dabeeoMaps)) {
      this.dabeeoMaps = new Maps();
    }

    return this.dabeeoMaps;
  }

  private mapOption = {};

  async showMap(mapContainer: HTMLDivElement) {
    if (MapDraw.map) {
      console.log("MapDraw: 이미 지도가 존재합니다.");
      return;
    }
    if (MapDraw.isShowingMapInProgress) {
      console.warn(
        "MapDraw: 현재 지도 생성 작업이 진행 중입니다. 새로운 요청을 무시합니다."
      );
      return;
    }

    try {
      MapDraw.isShowingMapInProgress = true;

      MapDraw._mapContainer = mapContainer;

      MapDraw.map = await MapDraw.getInstance().showMap(
        mapContainer,
        this.mapOption,
        MapDraw.mapData
      );

      (window as any).mapDraw = MapDraw.map;
    } catch (error) {
      console.error("MapDraw: showMap 실행 중 에러가 발생했습니다.", error);
    } finally {
      MapDraw.isShowingMapInProgress = false;
    }
  }

  static cleanup() {
    if (MapDraw.map) {
      MapDraw.map?.context?.cleanup();
      MapDraw.map = null;
    }
  }
}

export default MapDraw;
