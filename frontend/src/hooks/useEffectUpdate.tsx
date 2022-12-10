import {DependencyList, EffectCallback, useEffect, useRef} from "react";

// ----------------------------------------------------------------------

const useEffectUpdate = (effect: EffectCallback, deps?: DependencyList) => {
    const counter = useRef(0);

    useEffect(() => {
        if (counter.current < 2) {
            counter.current++;
            return;
        }
        effect();
        // @ts-ignore
    }, [...deps]);
};

export default useEffectUpdate;