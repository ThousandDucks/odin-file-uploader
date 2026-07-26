const openUploadButton = document.querySelector(".open-upload-modal");
const uploadModal = document.querySelector(".upload-modal");
const closeUploadButton = document.querySelector(".close-upload-modal");

openUploadButton.addEventListener("click", () => {
    uploadModal.classList.remove("hidden");
});

closeUploadButton.addEventListener("click", () => {
    uploadModal.classList.add("hidden");
});

uploadModal.addEventListener("click", (event) => {
    if (event.target === uploadModal) {
        uploadModal.classList.add("hidden");
    }
});

// Folder modal

const openFolderButton = document.querySelector(".open-folder-modal");
const folderModal = document.querySelector(".folder-modal");
const closeFolderButton = document.querySelector(".close-folder-modal");

openFolderButton.addEventListener("click", () => {
    folderModal.classList.remove("hidden");
});

closeFolderButton.addEventListener("click", () => {
    folderModal.classList.add("hidden");
});

folderModal.addEventListener("click", (event) => {
    if (event.target === folderModal) {
        folderModal.classList.add("hidden");
    }
});