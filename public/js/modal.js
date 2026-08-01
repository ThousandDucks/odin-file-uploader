// Upload modal

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

const folderModal = document.querySelector(".folder-modal");
const closeFolderButton = document.querySelector(".close-folder-modal");

const title = document.querySelector("#folder-modal-title");
const input = document.querySelector("#folder-name");
const form = document.querySelector("#folder-form");


// Create folder

const openFolderButtons = document.querySelectorAll(".open-folder-modal");

openFolderButtons.forEach(button => {
    button.addEventListener("click", () => {
        folderModal.classList.remove("hidden");

        title.textContent = "New Folder";
        input.value = "";
        form.action = "/folders";
    });
});


// Rename folder

const renameButtons = document.querySelectorAll(".rename-folder-btn");

renameButtons.forEach(button => {
    button.addEventListener("click", () => {
        folderModal.classList.remove("hidden");

        title.textContent = "Rename Folder";
        input.value = button.dataset.folderName;

        form.action = `/folders/${button.dataset.folderId}/rename`;
    });
});

// Close folder modal

closeFolderButton.addEventListener("click", () => {
    folderModal.classList.add("hidden");
});

folderModal.addEventListener("click", (event) => {
    if (event.target === folderModal) {
        folderModal.classList.add("hidden");
    }
});

// Upload file

const fileInput = document.querySelector("#file");
const fileName = document.querySelector("#file-name");

fileInput.addEventListener("change", () => {
    fileName.textContent = fileInput.files[0].name;
});

// Date created

document.querySelectorAll(".folder-date").forEach(element => {
    const date = new Date(element.dataset.date);

    element.textContent = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
});