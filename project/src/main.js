import { callImpcApi } from './api/impcApi.js';
import { isIframeLoaded } from './utils/iframeUtils.js';
import { sendIMPCMessage } from './utils/messageUtils.js';

// Main function to handle iframe loading and messaging
async function initialize() {

    console.log("Initializing");
    try {
        const impcData = await callImpcApi("MGI:104874", "OMIM:125853")
        console.log(impcData);


        const iframe = document.querySelector("iframe[name='pheno-multi']");
        const loadedIframe = await isIframeLoaded(iframe);
        console.log("Iframe loaded successfully");
        sendIMPCMessage(loadedIframe, impcData);
    } catch (error) {
        console.error(error);
    }
}

// Execute main function on window load
window.onload = initialize;

window.addEventListener("message", (event) => {
    const { name, width, height } = event.data;
    const iframe = document.querySelector(`iframe[name='pheno-multi']`);
    if (!iframe) return;
    // recommended styling...
    // let iframe fill its container
    iframe.style.width = "100%";
    iframe.style.height = "1000px";
    // but never bigger than its contents
    iframe.style.maxWidth = width + "px";
    iframe.style.maxHeight = height + "px";
    // contents will wrap/scroll appropriately at smaller sizes
});