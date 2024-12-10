const BASE_PATH = '/images';

// Add this fallback URL generator
const getPlaceholderUrl = (width = 800, height = 600, text = 'Placeholder') => 
  `https://via.placeholder.com/${width}x${height}.png?text=${text}`;

export const images = {
  mission: {
    main: getPlaceholderUrl(800, 600, 'Mission'),
    overview: getPlaceholderUrl(800, 600, 'Mission Overview'),
  },
  technology: {
    overview: getPlaceholderUrl(800, 600, '3D Scanning'),
    scanning: getPlaceholderUrl(800, 600, 'Scanning Tech'),
    mapping: getPlaceholderUrl(800, 600, 'Mapping Tech')
  },
  team: {
    sarah: `${BASE_PATH}/team/sarah.jpg`,
    rajesh: `${BASE_PATH}/team/rajesh.jpg`,
    maya: `${BASE_PATH}/team/maya.jpg`,
  },
  learn: {
    intro: `${BASE_PATH}/learn/intro-petroglyphs.jpg`,
    techniques: `${BASE_PATH}/learn/techniques.jpg`,
    conservation: `${BASE_PATH}/learn/conservation.jpg`,
    dating: `${BASE_PATH}/learn/dating-methods.jpg`,
  },
  petroglyphs: {
    konkan: `${BASE_PATH}/petroglyphs/konkan-main.jpg`,
    ratnagiri: `${BASE_PATH}/petroglyphs/ratnagiri-site.jpg`,
    sindhudurg: `${BASE_PATH}/petroglyphs/sindhudurg-art.jpg`,
  }
};

// Fallback image in case the requested image is not found
export const getImage = (path) => {
  try {
    return path || '/images/placeholder.jpg';
  } catch (error) {
    console.error('Image not found:', path);
    return '/images/placeholder.jpg';
  }
}; 