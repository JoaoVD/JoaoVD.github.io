/**
 * Driftlands — Brisa: Ilhas à Deriva | public gameplay media gallery.
 * Add user-provided, rights-cleared image/video files to assets/media/driftlands/.
 * Then add entries below. Until then the page displays an honest placeholder.
 *
 * Supported entries:
 * { type: 'image', src: '../assets/media/driftlands/forest.webp', title: 'Forest exploration' }
 * { type: 'video', src: '../assets/media/driftlands/gameplay.mp4', poster: '../assets/media/driftlands/poster.webp', title: 'Gameplay walkthrough' }
 */
const GAME_MEDIA = [];

const mediaFrame = document.querySelector('#drift-media-frame');
const mediaThumbs = document.querySelector('#drift-media-thumbs');

function renderMediaItem(item) {
  const wrapper = document.createElement('div');
  wrapper.className = 'media-viewer';
  if (item.type === 'video') {
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    if (item.poster) video.poster = item.poster;
    const source = document.createElement('source');
    source.src = item.src;
    source.type = item.src.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4';
    video.append(source);
    wrapper.append(video);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.title;
    img.loading = 'lazy';
    wrapper.append(img);
  }
  const caption = document.createElement('p');
  caption.textContent = item.title;
  wrapper.append(caption);
  mediaFrame.replaceChildren(wrapper);
}

if (mediaFrame && mediaThumbs && GAME_MEDIA.length) {
  GAME_MEDIA.forEach((item, index) => {
    const button = document.createElement('button');
    button.className = 'media-thumb';
    button.type = 'button';
    button.textContent = `${String(index + 1).padStart(2, '0')} / ${item.title}`;
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      renderMediaItem(item);
      mediaThumbs.querySelectorAll('button').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
    });
    mediaThumbs.append(button);
  });
  renderMediaItem(GAME_MEDIA[0]);
}
