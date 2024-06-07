"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import qr from "qrcode";

const Qrcode = () => {  
    const { data: session } = useSession();
    const user = session?.user;
    const [qrCodeUrl, setQrCodeUrl] = useState("");

    useEffect(() => {
        if (user?.id) {
            qr.toDataURL(`http://localhost:3000/profile/${user.id}`, { errorCorrectionLevel: 'H' }, function (err, url) {
                if (err) {
                    console.error(err);
                } else {
                    setQrCodeUrl(url);
                }
            });
        }
    }, [user]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
            <div style={{ 
                position: 'relative', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '320px', 
                height: '420px',  // Increased the height
                borderRadius: '20px', 
                border: '2px solid black', 
                padding: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white'
            }}>
                <div style={{
                    width: '100%', 
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                }}>
                    {user?.name} {user?.lastName}
                </div>
                <div style={{
                    width: '100%', 
                    textAlign: 'center',
                    fontSize: '14px',
                    marginBottom: '20px'
                }}>
                    This is your profile's QR Code, share it with others!
                </div>
                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" style={{ width: '300px', height: '300px' }} />}
            </div>
        </div>
    );
}

export default Qrcode;