import { memo, useMemo } from "react";

import IShimmerProps from "@/components/shimmer/interafaces/IShimmerProps";

import "@/components/shimmer/shimmer.css";

const Shimmer = memo((props: IShimmerProps) => {

    const shimmerCSS = useMemo(() => ({
        width: props.width ? props.width : "100%",
        height: props.height ? props.height : "20px",
        borderRadius: props.circle ? "100%" : "10px"
    }), [props.circle, props.height, props.width]);

    return (
        <div style={shimmerCSS} className="animate" />
    )
});

Shimmer.displayName = "Shimmer";

export default Shimmer;