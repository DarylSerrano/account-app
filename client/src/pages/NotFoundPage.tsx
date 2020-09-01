import React from "react"
import {Result} from "antd"
import AppLayout from "../components/AppLayout";

export default function NotFoundPage() {
    return (
        <AppLayout title="Not Found">
            <Result 
            status="404"
            title="404"
            subTitle="The page visited don't exists"/>
        </AppLayout>
    )
}