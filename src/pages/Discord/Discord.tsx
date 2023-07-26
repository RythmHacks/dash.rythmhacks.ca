import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { Link } from 'react-router-dom'
import { BsDiscord } from "react-icons/bs";

const Discord = () => {
    const { supabase, user, updateUser } = useAuth()

    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')

    const [isLoading, setLoading] = useState(false)
    const [result, setResult] = useState<string>()

    useEffect(() => {
        
    })

    if (code) {
        useEffect(() => {
            setLoading(true)
            fetch(import.meta.env.VITE_BACKEND_URL + '/join-discord', {
                method: 'POST',
                body: JSON.stringify({ code }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(data => data.json())
                .then((json: string) => {
                    setLoading(false)
                    setResult(json)
                })
                .catch(console.error)
        }, [])

        if (isLoading) return <div className="lazy-preloader"></div>
        return (
            <div className="page">
                Success, you've been added
            </div>
        )
    }

    else {
        const discordOAuth2Link = encodeURI(
            'https://discord.com/api/oauth2/authorize?'
            + `client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}`
            + `&redirect_uri=${window.location.href}`
            + '&response_type=code&scope=identify guilds.join'
        )

        return (<div className="page">
            <div className='container w-full'>
                <h1>Join the Discord</h1>
                <a 
                    className="style-none text-white bg-[#5865F2] px-4 py-2 rounded-md no-underline flex items-center gap-2 w-48 hover:bg-[#4f5bda]"
                    href={discordOAuth2Link}
                ><BsDiscord size="24" />Join the Discord</a>
            </div>
        </div>)
    }
}

export default Discord;