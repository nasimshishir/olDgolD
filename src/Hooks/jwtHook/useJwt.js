import { useState } from "react";

const useJwt = email => {

    const [token, setToken] = useState('');

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


    return [token];

}

export default useJwt;