import { useEffect, useState } from 'react';
import { PasteApi } from "@/api/api";
import { NextRouter } from "next/router";
import Layout from "@/components/Layout";
import Table from "@/components/table";
import { PasteColumns } from "../../utils/columns"

export default function Pastes({ data }) {
    const [pastes, setPastes] = useState([]);
    useEffect(() => {
        setPastes(data)
    }, [])

    return (
        <Layout>
            <h1 className="text-3xl" >Pastes</h1>
            <Table
                columns={PasteColumns}
                data={pastes}
            />
        </Layout>
    )
}

export async function getServerSideProps(context: NextRouter) {
    const res: any = await PasteApi.get(`/`);
    const data = res.data?.allPastes
    if (data === undefined) {
        return { props: { data: null } };
    }
    return { props: { data } }
}