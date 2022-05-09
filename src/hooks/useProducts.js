import { useEffect, useState } from "react";

const useProducts = () => {
    const [gpus, setGpus] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/gpu')
            .then(res => res.json())
            .then(data => setGpus(data))
    }, [])
    return [gpus, setGpus]
}

export default useProducts;