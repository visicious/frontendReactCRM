import React from 'react'
import App from '../App'
import Table from '../components/Table'

export default function clientes() {
    let tableRef = React.createRef()
    let tableRefWhatsapp = React.createRef()
    return (
        <App>
            <Table tableRef={tableRef} tableRefWhatsapp={tableRefWhatsapp}></Table>
        </App>
    )
}
