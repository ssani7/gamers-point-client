import { useEffect, useState } from "react";

const useGetToken = (user) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const email = user?.user?.email;
        console.log(user)

        if (email) {
            fetch(`https://assignment-11-gpu-inventory.herokuapp.com/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const accesToken = data.accessToken;
                    localStorage.setItem('accessToken', accesToken)
                    setToken(accesToken)
                })
        }
    }, [user])

    return [token]
}

export default useGetToken;