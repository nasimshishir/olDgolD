import { useEffect } from "react";
import { useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`/admin`)
        }
    }, [email])
}