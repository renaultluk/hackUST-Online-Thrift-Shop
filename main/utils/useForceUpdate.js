import { useState } from "react";

const useForceUpdate = () => {
    const [value, setValue] = useState(0);
    console.log("useForceUpdate");
    return () => setValue(value => value + 1);
}

export default useForceUpdate;