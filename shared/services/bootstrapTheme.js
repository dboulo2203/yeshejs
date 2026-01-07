
export function toogleTheme() {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        localStorage.setItem("theme", 'light');

    }
    else {
        localStorage.setItem("theme", 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
}

export function setTheme() {
    let them = localStorage.getItem("theme");
    if (them)
        document.documentElement.setAttribute('data-bs-theme', them)

}