const copyContent = async (text: string) => {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
}

export default copyContent;
