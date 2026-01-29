import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full h-full min-h-100">
            <div className="relative">
                {/* Outer Ring */}
                <div className="w-16 h-16 rounded-full border-4 border-[#1878B5]/20 animate-pulse"></div>

                {/* Spinning Ring */}
                <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-[#1878B5] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#1878B5] rounded-full"></div>
            </div>
        </div>
    );
};

export default Loader;
