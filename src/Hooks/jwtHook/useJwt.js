import { useEffect, useState } from "react";

const useJwt = email => {

    const [token, setToken] = useState('');

    useEffect(() => {
        if (email) {
            fetch(`https://final-server-one.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        setToken(data.accessToken);
                    }
                });
        }

    }, [email]);
    return [token];

}

export default useJwt;