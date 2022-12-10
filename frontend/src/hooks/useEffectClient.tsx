import {DependencyList, EffectCallback, useEffect, useRef} from "react";

// ----------------------------------------------------------------------

const useEffectClient = (effect: EffectCallback, deps?: DependencyList) => {
    const isRenderOnServer = useRef(true);

    useEffect(() => {
        if (isRenderOnServer.current) {
            isRenderOnServer.current = false;
            return;
        }
        effect();
        // @ts-ignore
    }, [...deps]);
};

export default useEffectClient;