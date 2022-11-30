import { useState } from "react"

export const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(false);

    if (email) {
        setIsSellerLoading(true)
        fetch(`https://final-server-one.vercel.app/user/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsSeller(data);
                setIsSellerLoading(false);
            })
    }

    return [isSeller, isSellerLoading]
}