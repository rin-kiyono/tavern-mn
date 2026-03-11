export const requestFullscreen = () => {
  const doc = document.documentElement;
  if (doc.requestFullscreen) {
    doc.requestFullscreen().catch(err => console.log('全屏请求失败:', err));
  } else if ((doc as any).webkitRequestFullscreen) {
    (doc as any).webkitRequestFullscreen();
  }
};

export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

export const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    requestFullscreen();
  } else {
    exitFullscreen();
  }
};
