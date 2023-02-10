import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <footer className='w-full bg-fern-600  h-24 flex flex-col justify-center items-center ' >
            <p className='text-base my-4' > &copy; {new Date().getFullYear()} Olaonipekun Carew </p>
        </footer>
    )
}
