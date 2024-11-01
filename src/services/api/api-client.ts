import { ApiRoutes } from "./constants";
import { type Photo } from "@/stores/usePhotosStore";
import { axiosInstance } from "./instance";

export const Api = {
  createPhoto: (photo: Photo) => axiosInstance.post(ApiRoutes.PHOTOS, photo),
  getPhotos: () => axiosInstance.get(ApiRoutes.PHOTOS),
  updatePhoto: (photoId: number | string, updatedPhoto: Photo) =>
    axiosInstance.put(`${ApiRoutes.PHOTOS}/${photoId}`, updatedPhoto),
  deletePhoto: (photoId: number | string) =>
    axiosInstance.delete(`${ApiRoutes.PHOTOS}/${photoId}`),

  createAlbum: (album: { albumId: string }) =>
    axiosInstance.post(ApiRoutes.PHOTOS, album),
};
