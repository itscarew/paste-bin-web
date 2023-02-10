import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

export default function NotFound() {
    return (
        <>
            <Layout>
                What you thnk you are looking for is not here ... <Link href={"/"} >Go Paste</Link>
            </Layout>
        </>
    )
}
