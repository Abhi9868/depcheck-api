import React from 'react';
import { RiseLoader } from "react-spinners";
const Loader = () => {
    return (
        <div className="flex items-center justify-center"
            style={{ minHeight: 'calc(100vh - 50px)' }}
        >

            <RiseLoader
                size={15}
                color="#ec106c"
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loader;
