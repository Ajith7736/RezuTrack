export function Image(image: {
    url: string,
    path: string
} | undefined) {
    if (image && image.url) {
        return `<img src="${image.url}" alt="resume profile picture" class="img-style">`
    } else {
        return ''
    }
}