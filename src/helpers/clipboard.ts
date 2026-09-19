export const clipboardCopy = (text: string, setCopyIcon: () => void, unsetCopyIcon: () => void) => {
    try {
        navigator.clipboard.writeText(text);
    } catch (e: unknown) {
        legacyClipboardCopy(text);
    }

    setCopyIcon();

    setTimeout(() => {
        unsetCopyIcon();
    }, 2000);
};

export const legacyClipboardCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
};