import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Header() {
    const router = useRouter();

    const routes = [
        { name: "Paste", href: "/" },
        { name: "Recent Pastes", href: "/paste/recent" },

    ]

    return (
        <>
            <div className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" >
                <ul className="container mx-auto flex flex-wrap text-sm font-medium text-center text-gray-500 ">
                    <li className="mr-2">
                        <Link href={"/"} className="inline-block p-4 text-green-600 rounded-t-lg  ">Olas Paste</Link>
                    </li>
                    {routes.map((route) => {
                        return (
                            <li key={route.name} className="mr-2">
                                <Link href={route.href} className={`inline-block p-4  ${router.pathname === route.href && "bg-gray-100"}    rounded-t-lg hover:text-gray-600 hover:bg-gray-50 `}>{route.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}


