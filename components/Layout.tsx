import AppHead from './Head'
import Header from './Header'

import React from "react";
import Footer from './Footer';

export default function Layout({ children }: any) {
    return (
        <>
            <AppHead />
            <div className={`relative text-gray-900 `}>
                <div style={{ minHeight: "85vh" }} >
                    <Header />
                    <div className='container py-12 mx-auto'>
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}