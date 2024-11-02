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
  albums: Album[];
  error: string | null;
  photosAmount: number; // Total number of photos
}

export const usePhotosStore = defineStore("photos-store", {
  state: (): PhotoState => ({
    photosByAlbum: {},
    albums: [],
    error: null,
    photosAmount: 0, // Initialize photo amount
  }),

  actions: {
    async createPhoto(photo: Photo) {
      this.error = null;

      try {
        const response = await Api.createPhoto(photo);
        this.addPhotoToAlbum(response.data);
        this.photosAmount++; // Increase photo count

        const album = this.albums.find(
          (album) => album.title === photo.albumId
        );
        if (!album) {
          this.addAlbum({
            title: photo.albumId!,
            href: `/photos/albums/${photo.albumId}`,
          });
        }
      } catch (error: any) {
        this.error = error.message || "Failed to create photo.";
      }
    },

    async fetchPhotos() {
      this.error = null;

      try {
        const { data } = await Api.getPhotos();
        this.groupPhotosByAlbum(data);
        this.photosAmount = data.length; // Set initial photo count

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

    addPhotoToAlbum(photo: Photo) {
      if (!photo.albumId) return;
      if (!this.photosByAlbum[photo.albumId]) {
        this.photosByAlbum[photo.albumId] = [];
      }
      this.photosByAlbum[photo.albumId].unshift(photo); // Add new photo at the beginning
      this.photosAmount++; // Increase count
    },

    async updatePhoto(photoId: number | string, updatedPhoto: Photo) {
      this.error = null;

      try {
        const response = await Api.updatePhoto(photoId, updatedPhoto);
        this.updatePhotoInAlbum(response.data);
      } catch (error: any) {
        this.error = error.message || "Failed to update photo.";
      }
    },

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
        const response = await Api.deletePhoto(photoId);
        this.deletePhotoFromAlbum(photoId);

        const isEmptyAlbum =
          this.photosByAlbum[response.data.albumId!].length === 0;
        if (isEmptyAlbum) {
          this.deleteAlbumFromState(response.data.albumId!);
        }
      } catch (error: any) {
        this.error = error.message || "Failed to delete photo.";
      }
    },

    deletePhotoFromAlbum(photoId: number | string) {
      for (const albumId in this.photosByAlbum) {
        const initialLength = this.photosByAlbum[albumId].length;
        this.photosByAlbum[albumId] = this.photosByAlbum[albumId].filter(
          (photo: Photo) => photo.id !== photoId
        );
        if (initialLength > this.photosByAlbum[albumId].length) {
          this.photosAmount--; // Decrease count
        }
      }
    },

    getPhotoById(id: string): Photo | undefined {
      for (const albumId in this.photosByAlbum) {
        const photo = this.photosByAlbum[albumId].find(
          (photo: Photo) => photo.id === id
        );
        if (photo) return photo; // Return first found photo
      }
      return undefined;
    },

    getPhotosByAlbumId(albumId: string): Photo[] {
      return this.photosByAlbum[albumId] || [];
    },

    async createAlbum(title: string) {
      this.error = null;

      try {
        const response = await Api.createAlbum({ albumId: title });
        this.addPhotoToAlbum(response.data);
        this.addAlbum({ title, href: `/photos/albums/${title}` });
      } catch (error: any) {
        this.error = error.message || "Failed to create album.";
      }
    },

    addAlbum(album: Album) {
      this.albums.push(album);
    },

    async deleteAlbum(albumId: string) {
      this.error = null;

      try {
        const photosToDelete = this.photosByAlbum[albumId] || [];
        for (const photo of photosToDelete) {
          await Api.deletePhoto(photo.id!);
          this.photosAmount--; // Decrease count for each photo in the album
        }

        this.deleteAlbumFromState(albumId);
      } catch (error: any) {
        this.error = error.message || "Failed to delete album.";
      }
    },

    deleteAlbumFromState(albumId: string) {
      delete this.photosByAlbum[albumId];
      this.albums = this.albums.filter((album) => album.title !== albumId);
    },
  },
});
