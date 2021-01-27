import { API_URL } from "../config";

/**
 * Given an image return the Url
 * Works for Dev and prod
 * @param {any} image 
 */

export const fromImageToUrl = (image) => {
    // If no image return default image
    if(!image){ 
        return "";
    }

    // If image is pointing to relative path then get from api
    if(image.url.indexOf("/") === 0){ // 
        return `${API_URL}${image.url}`;
    }

    // Image is external
    return image.url
}