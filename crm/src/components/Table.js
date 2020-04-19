import React from 'react'
import MaterialTable, { MTableCell, MTableActions, MTableToolbar, MTableHeader } from "material-table";
import axios from 'axios'
import { BackUrl } from '../utilities/const';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EditIcon from '@material-ui/icons/Edit';
import useStyles, { styles } from '../styles/Table';
import AdjustIcon from '@material-ui/icons/Adjust';
import { Button, Badge } from '@material-ui/core';
import { userLogged } from '../services/UserService';
import tableIcons from '../utilities/TableIcons';
import AddInteraccion from './AddInteraccion';
import TableInteracciones from './TableInteracciones';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export default function Table(props) {
    let { tableRef, tableRefWhatsapp } = props
    const classes = useStyles()
    let pageSize = 5
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    let panelOpen = {
        whatsapp: false,
        telefono: false,
        correo: false
    }
    const [panelOpenPrueba, setPanelOpenPrueba] = React.useState({
        whatsapp: false,
        telefono: false,
        correo: false
    })
    let idOpen
    const printTableRef = () => {
        console.log(tableRef)
        console.log(panelOpenPrueba)
    }
    const togglePanelWhatsapp = (id, tipo) => {
        const idArray = tableRef && tableRef.current.state.data
        const newArray = idArray.map(data => data.cliente.props.data.id)
        if (idOpen == id) {
            if (panelOpen[tipo] == true) {
                panelOpen = {
                    whatsapp: false,
                    telefono: false,
                    correo: false
                }
                setPanelOpenPrueba(panelOpen)
                idOpen = null
                tableRef.current.onToggleDetailPanel([newArray.indexOf(id)], rowData => {
                    console.log(rowData)
                    return (<div></div>)
                })
                return
            } else {
                panelOpen = {
                    whatsapp: false,
                    telefono: false,
                    correo: false
                }
                panelOpen[tipo] = true
                setPanelOpenPrueba(panelOpen)
                return tableRefWhatsapp.current && tableRefWhatsapp.current.onQueryChange({ canal: tipo })
            }
        } else {
            panelOpen = {
                whatsapp: false,
                telefono: false,
                correo: false
            }
            panelOpen[tipo] = true
            forceUpdate()
            if (idOpen) {
                tableRef.current.onToggleDetailPanel([newArray.indexOf(idOpen)], rowData => (<div></div>))
            }
            idOpen = id
            tableRef.current.onToggleDetailPanel([newArray.indexOf(id)],
                rowData => {
                    return (
                        <TableInteracciones index={newArray.indexOf(id)} updateMainTable={forceUpdate} tableRefMain={tableRef} consulta={tipo} rowData={rowData} styles={styles.interaccionesTable} icons={tableIcons} tableRef={tableRefWhatsapp} id={id} />
                    )
                }
            )
        }
    }
    const Nombre = function (props) {
        const { data } = props
        // console.log(panelOpen)
        return (
            <div className={classes.containerCell}>
                <div className={classes.leftButtonsContainer}>
                    <Button>
                        <EditIcon />
                    </Button>
                    <Button>
                        <AdjustIcon />
                    </Button>
                </div>
                <div className={classes.persona}>
                    <h3 style={{ margin: 0 }}>{data.tipo == 'persona' ? data.nombres + ' ' + data.apellidos : data.empresa + ' ' + (data.ruc ? data.ruc : '')}<br /></h3>
                    Telefono:{data.telefono[0] || ''}<br />
                    Correo:{data.correo[0] || ''}
                </div>
                <div className={classes.interaccionesContainer}>
                    <Button className={`${classes.interaccionesButton} ${(panelOpen.whatsapp && data.id == idOpen) ? classes.selected : ''}`} onClick={() => { togglePanelWhatsapp(data.id, 'whatsapp') }}>
                        <Badge badgeContent={data.interacciones.whatsapp} classes={{ badge: (panelOpen.whatsapp && data.id == idOpen) ? classes.badgeInverted : classes.badge }} showZero>
                            <WhatsAppIcon />
                        </Badge>
                    </Button>
                    <Button className={`${classes.interaccionesButton} ${(panelOpen.telefono && data.id == idOpen) ? classes.selected : ''}`} onClick={() => { togglePanelWhatsapp(data.id, 'telefono') }}>
                        <Badge badgeContent={data.interacciones.telefono} classes={{ badge: (panelOpen.telefono && data.id == idOpen) ? classes.badgeInverted : classes.badge }} showZero>
                            <PhoneIcon />
                        </Badge>
                    </Button>
                    <Button className={`${classes.interaccionesButton} ${(panelOpen.correo && data.id == idOpen) ? classes.selected : ''}`} onClick={() => { togglePanelWhatsapp(data.id, 'correo') }}>
                        <Badge badgeContent={data.interacciones.correo} classes={{ badge: (panelOpen.correo && data.id == idOpen) ? classes.badgeInverted : classes.badge }} showZero>
                            <MailOutlineIcon />
                        </Badge>
                    </Button>
                </div>
            </div>
        )
    }
    const [sortHeader, setSortHeader] = React.useState({
        whatsapp: 0,
        telefono: 0,
        correo: 0
    })
    const sortHeaderby = prop => {
        let headerSort = {
            whatsapp: 0,
            telefono: 0,
            correo: 0
        }
        if (sortHeader[prop] == 1) {
            headerSort[prop] = 2
        } else if (sortHeader[prop] == 2) {
            headerSort[prop] == 0
        } else {
            headerSort[prop]++
        }
        setSortHeader(headerSort)
        return tableRef.current && tableRef.current.onQueryChange({
            orderCanal: headerSort[prop] == 0 ? null : {
                orderBy: prop,
                orderDirection: headerSort[prop] == 1 ? 'asc' : 'desc'
            }
        })
    }
    const BotonesSort = () => {
        return (
            <div>Clientes
                <div style={{ float: 'right' }}>
                    <Button onClick={() => { sortHeaderby('whatsapp') }} className={classes.sort}>
                        {sortHeader.whatsapp == 0 ? <ImportExportIcon /> : (sortHeader.whatsapp == 1 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon className={classes.downAnimation} />)}
                    </Button>
                    <Button onClick={() => { sortHeaderby('telefono') }} className={classes.sort}>
                        {sortHeader.telefono == 0 ? <ImportExportIcon /> : (sortHeader.telefono == 1 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon className={classes.downAnimation} />)}
                    </Button>
                    <Button onClick={() => { sortHeaderby('correo') }} className={classes.sort}>
                        {sortHeader.correo == 0 ? <ImportExportIcon /> : (sortHeader.correo == 1 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon className={classes.downAnimation} />)}
                    </Button>
                </div>
            </div>
        )
    }
    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                tableRef={tableRef}
                icons={tableIcons}
                columns={[
                    { title: <BotonesSort />, field: "cliente", cellStyle: { width: '500px', display: 'block' }, headerStyle: { paddingRight: 0 }, sorting: false },
                    { title: "Prioridad", field: "prioridad", type: "numeric", cellStyle: { textAlign: 'center' }, headerStyle: { textAlign: 'center' } },
                    { title: "Estado", field: "estadoCliente", cellStyle: { textAlign: 'center' }, headerStyle: { textAlign: 'center' } },
                    { title: "Intencion de compra", field: "intencionCompra", type: 'numeric', cellStyle: { textAlign: 'center' }, headerStyle: { textAlign: 'center' } },
                    { title: "Numero de interacciones", field: "numeroInteracciones", type: 'numeric', cellStyle: { textAlign: 'center' }, headerStyle: { textAlign: 'center' } },
                    { title: "Cantidad de cierres", field: "cantidadCierres", type: 'numeric', cellStyle: { textAlign: 'center' }, headerStyle: { textAlign: 'center' } }
                ]}
                data={query => {
                    idOpen = null
                    return new Promise((resolve, reject) => {
                        axios.post(BackUrl + 'vista_clientes/obtener', { query, token: userLogged() }).then(res => {
                            console.log(res)
                            const newData = res.data.content.map(data => ({
                                cliente: <Nombre
                                    data={data}
                                />,
                                prioridad: data.ultimoProspecto.prioridad,
                                estadoCliente: data.estadoCliente,
                                intencionCompra: data.intencionCompra,
                                numeroInteracciones: data.numeroInteracciones,
                                cantidadCierres: data.cantidadCierres
                            }))
                            pageSize = res.data.content.length
                            resolve({
                                data: newData,
                                page: res.data.page,
                                totalCount: res.data.totalCount
                            })
                        }).catch(error => {
                            console.log(error)
                        })
                    })
                }
                }
                title="Clientes"
                localization={{
                    pagination: {
                        labelRowsSelect: 'columnas',
                        labelDisplayedRows: '{from}-{to} de {count}'
                    },
                    toolbar: {
                        nRowsSelected: '{0} columna(s) seleccionadas'
                    },
                    body: {
                        emptyDataSourceMessage: 'No hay data',
                        filterRow: {
                            filterTooltip: 'Filtrar'
                        }
                    }
                }}
                components={{
                    Cell: props => {
                        var newProps = {
                            ...props,
                        }
                        if (props.value?.props?.data.tipo == 'persona') {
                            newProps.value = props.value?.props?.data.nombres + ' ' + props.value?.props?.data.apellidos + ' ' + props.value?.props?.data.correo + ' ' + props.value?.props?.data.telefono
                        } else if (props.value?.props?.data.tipo == 'empresa') {
                            newProps.value = props.value?.props?.data.empresa + ' ' + props.value?.props?.data.ruc + ' ' + props.value?.props?.data.correo + ' ' + props.value?.props?.data.telefono
                        }
                        return (
                            <MTableCell {...props} style={{ padding: 0 }} />
                        )
                    }
                }}
            />
            <button onClick={() => { printTableRef() }}>Print table ref</button>
        </div >
    );
}
