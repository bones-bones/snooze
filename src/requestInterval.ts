export const requestInterval = (fn: () => any, delay: number) => {
    let start = Date.now();
    const handle: { value?: number } = {};
    function loop() {
        const nowish = Date.now();
        handle.value = window.requestAnimationFrame(loop);
        if (nowish - start >= delay) {
            fn();
            start = nowish;
        }
    }
    handle.value = window.requestAnimationFrame(loop);
    return handle;
};

export const clearRequestInterval = (cancelId: number) => {
    window.cancelAnimationFrame(cancelId);
};
