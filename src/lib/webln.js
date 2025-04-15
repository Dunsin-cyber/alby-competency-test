export const initWebLN = async () => {
  if (window.webln) {
    await window.webln.enable();
    console.log(window.webln)
    return window.webln;
  } else {
    throw new Error("WebLN not available. Please install a compatible wallet.");
  }
};
