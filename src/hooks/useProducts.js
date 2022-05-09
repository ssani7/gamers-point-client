import { useEffect, useState } from "react";

const useProducts = () => {
    const [gpus, setGpus] = useState([]);
    useEffect(() => {
        fetch('https://sheltered-hollows-42967.herokuapp.com/gpu')
            .then(res => res.json())
            .then(data => setGpus(data))
    }, [])
    return [gpus, setGpus]
}

export default useProducts;