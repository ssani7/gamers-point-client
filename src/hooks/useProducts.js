import { useEffect, useState } from "react";

const useProducts = () => {
    const [gpus, setGpus] = useState([]);
    useEffect(() => {
        fetch('https://assignment-11-gpu-inventory.herokuapp.com/gpu')
            .then(res => res.json())
            .then(data => setGpus(data))
    }, [])
    return [gpus, setGpus]
}

export default useProducts;