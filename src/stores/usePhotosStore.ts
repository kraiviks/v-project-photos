import { defineStore } from "pinia";
import { Api } from "@/services/api/api-client";

export interface Photo {
  id?: number | string;
  albumId: string | null;
  title: string;
  url: string;
}

interface Album {
  title: string;
  href: string;
}

interface PhotoState {
  photosByAlbum: Record<string, Photo[]>; // Group photos by albums
  photos: Photo[];
  albums: Album[];
  error: string | null;
}

export const usePhotosStore = defineStore("photos-store", {
  state: (): PhotoState => ({
    photosByAlbum: {}, // Initialization
    photos: [],
    albums: [],
    error: null,
  }),

  actions: {
    async createPhoto(photo: Photo) {
      this.error = null;

      try {
        const response = await Api.createPhoto(photo);
        this.addPhotoToAlbum(response.data); // Add photo to corresponding album
      } catch (error: any) {
        this.error = error.message || "Failed to create photo.";
      }
    },

    async fetchPhotos() {
      this.error = null;

      try {
        const { data } = await Api.getPhotos();

        this.photos = data;
        this.groupPhotosByAlbum(data);

        const albums = data.map((item: Photo) => item.albumId);
        const uniqueAlbums = Array.from(new Set(albums)) as string[];
        const albumsData = uniqueAlbums.map((item: string) => {
          return {
            title: item,
            href: `/photos/albums/${item}`,
          };
        });
        this.albums = albumsData.sort((a, b) => a.title.localeCompare(b.title));
      } catch (error: any) {
        this.error = error.message || "Failed to fetch photos.";
      }
    },

    // Function to group photos by albums
    groupPhotosByAlbum(photos: Photo[]) {
      this.photosByAlbum = photos.reduce<Record<string, Photo[]>>(
        (acc, photo) => {
          const albumId = photo.albumId!;

          if (!albumId) return acc; // Skip photos without albumId
          if (!acc[albumId]) {
            acc[albumId] = []; // Initialize array for album
          }
          acc[albumId].push(photo); // Add photo to corresponding album
          return acc;
        },
        {}
      );
    },

    // Add new photo to corresponding album
    addPhotoToAlbum(photo: Photo) {
      if (!photo.albumId) return; // Skip if no albumId
      if (!this.photosByAlbum[photo.albumId]) {
        this.photosByAlbum[photo.albumId] = []; // Initialize array for album
      }
      this.photosByAlbum[photo.albumId] = [
        photo,
        ...this.photosByAlbum[photo.albumId],
      ]; // Add new photo at the beginning
    },

    async updatePhoto(photoId: number | string, updatedPhoto: Photo) {
      this.error = null;

      try {
        const response = await Api.updatePhoto(photoId, updatedPhoto);
        this.updatePhotoInAlbum(response.data); // Update photo in album
      } catch (error: any) {
        this.error = error.message || "Failed to update photo.";
      }
    },

    // Update photo in corresponding album
    updatePhotoInAlbum(updatedPhoto: Photo) {
      const albumPhotos = this.photosByAlbum[updatedPhoto.albumId!];
      if (albumPhotos) {
        const index = albumPhotos.findIndex(
          (photo) => photo.id === updatedPhoto.id
        );
        if (index !== -1) {
          albumPhotos[index] = updatedPhoto; // Update photo
        }
      }
    },

    async deletePhoto(photoId: number | string) {
      this.error = null;

      try {
        await Api.deletePhoto(photoId);
        this.deletePhotoFromAlbum(photoId); // Remove photo from album
      } catch (error: any) {
        this.error = error.message || "Failed to delete photo.";
      }
    },

    // Remove photo from corresponding album
    deletePhotoFromAlbum(photoId: number | string) {
      for (const albumId in this.photosByAlbum) {
        this.photosByAlbum[albumId] = this.photosByAlbum[albumId].filter(
          (photo: Photo) => photo.id !== photoId
        );
      }
    },

    getPhotoById(id: string | number): Photo | undefined {
      for (const albumId in this.photosByAlbum) {
        const photo = this.photosByAlbum[albumId].find(
          (photo: Photo) =>
            String(photo.id).toLowerCase() === String(id).toLowerCase()
        );
        if (photo) return photo; // Return first found photo

        return undefined;
      }
    },

    getPhotosByAlbumId(albumId: string): Photo[] {
      return this.photosByAlbum[albumId] || [];
    },
  },
});
