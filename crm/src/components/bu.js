import React, { forwardRef, useEffect, useState } from 'react'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
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
import EventIcon from '@material-ui/icons/Event';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';

export default function Table() {
    let tableRef = React.createRef()
    let tableRefWhatsapp = React.createRef()
    let tableRefCalls = React.createRef()
    let tableRefEmail = React.createRef()
    const classes = useStyles()
    let pageSize = 5
    const [panelOpen, setPanelOpen] = React.useState({
        whatsapp: false,
        llamadas: false,
        correo: false
    })
    const [idOpen, setIdOpen] = React.useState()
    const [pageSizeOptions, setPageSizeOptions] = React.useState([5, 10, 20])
    const refreshData = ref => {
        if (ref == 'whatsapp') {
            return tableRefWhatsapp.current && tableRefWhatsapp.current.onQueryChange()
        } else if (ref == 'calls') {
            return tableRefCalls.current && tableRefCalls.current.onQueryChange()
        } else {
            return tableRefEmail.current && tableRefEmail.current.onQueryChange()
        }
    }
    const Estado = function (props) {
        if (props.estado == 1) {
            return (
                <SentimentSatisfiedAltIcon style={{ color: 'green' }} />
            )
        } else if (props.estado == 0) {
            return (
                <SentimentSatisfiedIcon style={{ color: 'gray' }} />
            )
        } else {
            return (
                <SentimentVeryDissatisfiedIcon style={{ color: 'red' }} />
            )
        }
    }
    const ToolbarTitle = (props) => {
        return (<div><Button variant={'outlined'} className={`${classes.interaccionesTableTitleButton} ${classes.interaccionesTableAgregar}`}
            startIcon={<DescriptionIcon />}>Agregar</Button> <Button variant={'outlined'} className={`${classes.interaccionesTableTitleButton} ${classes.interaccionesTableGenerar}`}
                startIcon={<AddIcon />}>Generar</Button></div>)
    }
    const togglePanelWhatsapp = (id, tipo) => {
        console.log(tableRef)
        const idArray = tableRef.current.state.data
        const newArray = idArray.map(data => data.cliente.props.data.id)
        if (idOpen == id) {
            if (panelOpen[tipo] == true) {
                setPanelOpen({
                    whatsapp: false,
                    llamadas: false,
                    correo: false
                })
                tableRef.current.onToggleDetailPanel([newArray.indexOf(id)], rowData => (<div></div>))
            } else {
                let newPanelOpen = {
                    whatsapp: false,
                    llamadas: false,
                    correo: false
                }
                newPanelOpen[tipo] = true
                console.log(newPanelOpen)
                setPanelOpen(newPanelOpen)
                return tableRefWhatsapp.current && tableRefWhatsapp.current.onQueryChange()
            }
        } else {
            tableRef.current.onToggleDetailPanel([newArray.indexOf(id)],
                rowData => {
                    return (
                        <MaterialTable
                            tableRef={tableRefWhatsapp}
                            style={styles.interaccionesTable}
                            icons={tableIcons}
                            title={<ToolbarTitle />}
                            columns={[
                                { title: 'Interaccion', field: 'interaccion' },
                                { title: 'Estado', field: 'estado' },
                                { title: 'Fecha de Inicio', field: 'startDate', type: 'date' },
                                {
                                    title: 'Fecha de Finalizacion',
                                    field: 'endDate',
                                    type: 'date'
                                },
                            ]}
                            data={query => {
                                return new Promise((resolve, reject) => {
                                    axios.post(BackUrl + 'vista_clientes/interacciones/obtener_por_canal', { query, token: userLogged(), idCliente: id, canal: tipo }).then(res => {
                                        console.log(res)
                                        const newData = res.data.content.map(data => ({
                                            interaccion: data.comentario,
                                            estado: <Estado estado={data.estado_interaccion} />,
                                            startDate: data.hora_fecha_inicio,
                                            endDate: data.hora_fecha_termino
                                        }))
                                        resolve({
                                            data: newData,
                                            page: res.data.page,
                                            totalCount: res.data.totalCount
                                        })
                                    }).catch(error => {
                                        console.log(error)
                                    })
                                })
                            }}
                            actions={[
                                {
                                    icon: () => <Edit />,
                                    tooltip: 'Editar',
                                    onClick: (event, rowData) => alert("editar" + rowData.interaccion)
                                },
                                rowData => ({
                                    icon: () => <Delete />,
                                    tooltip: 'Delete User',
                                    onClick: (event, rowData) => confirm("You want to delete " + rowData.interaccion),
                                    disabled: rowData.birthYear < 2000
                                }),
                                rowData => ({
                                    icon: () => <EventIcon />,
                                    tooltip: 'Delete User',
                                    onClick: (event, rowData) => confirm("You want to delete " + rowData.interaccion),
                                    disabled: rowData.birthYear < 2000
                                })
                            ]}
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
                                },
                                header: {
                                    actions: 'acciones'
                                }
                            }}
                            options={{
                                actionsColumnIndex: -1,
                                pageSize: pageSize,
                                pageSizeOptions: pageSizeOptions
                            }}
                            components={{
                                Header: props => (
                                    <MTableHeader style={styles.interaccionesTableHeader} {...props} />
                                )
                            }}
                            actions={[
                                {
                                    icon: 'refresh',
                                    tooltip: 'Refresh Data',
                                    isFreeAction: true,
                                    onClick: () => tableRefWhatsapp.current && tableRefWhatsapp.current.onQueryChange(),
                                }
                            ]}
                        >
                        </MaterialTable>
                    )
                }
            )
        }
        setIdOpen(id)
        setPanelOpen({
            ...panelOpen,
            [tipo]: true
        })
        // console.log(tableRef.current)
    }
    const togglePanelCalls = (id) => {
        refreshData('calls')
        const idArray = tableRef.current.state.data
        const newArray = idArray.map(data => data.cliente.props.data.id)
        tableRef.current.onToggleDetailPanel([newArray.indexOf(id)],
            rowData => {
                return (
                    <MaterialTable
                        tableRef={tableRefCalls}
                        icons={tableIcons}
                        title="Interacciones"
                        columns={[
                            { title: 'Interaccion', field: 'interaccion' },
                            { title: 'Estado', field: 'estado' },
                            { title: 'Fecha de Inicio', field: 'startDate', type: 'date' },
                            {
                                title: 'Fecha de Finalizacion',
                                field: 'endDate',
                                type: 'date'
                            },
                        ]}
                        data={query => {
                            return new Promise((resolve, reject) => {
                                axios.post(BackUrl + 'vista_clientes/interacciones/obtener_por_canal', { query, token: userLogged(), idCliente: id, canal: 'telefono' }).then(res => {
                                    const newData = res.data.content.map(data => ({
                                        interaccion: data.comentario,
                                        estado: <Estado estado={data.estado_interaccion} />,
                                        startDate: data.hora_fecha_inicio,
                                        endDate: data.hora_fecha_termino
                                    }))
                                    resolve({
                                        data: newData,
                                        page: res.data.page,
                                        totalCount: res.data.totalCount
                                    })
                                }).catch(error => {
                                    console.log(error)
                                })
                            })
                        }}
                        actions={[
                            {
                                icon: () => <Edit />,
                                tooltip: 'Editar',
                                onClick: (event, rowData) => alert("editar" + rowData.interaccion)
                            },
                            rowData => ({
                                icon: () => <Delete />,
                                tooltip: 'Delete User',
                                onClick: (event, rowData) => confirm("You want to delete " + rowData.interaccion),
                                disabled: rowData.birthYear < 2000
                            }),
                            rowData => ({
                                icon: () => <EventIcon />,
                                tooltip: 'Delete User',
                                onClick: (event, rowData) => confirm("You want to delete " + rowData.interaccion),
                                disabled: rowData.birthYear < 2000
                            })
                        ]}
                        localization={{
                            header: {
                                actions: 'acciones'
                            }
                        }}
                        options={{
                            actionsColumnIndex: -1,
                            pageSize: pageSize,
                            pageSizeOptions: pageSizeOptions
                        }}
                    >
                    </MaterialTable>
                )
            }
        )
    }
    const togglePanelMail = (id) => {
        refreshData('correo')
        const idArray = tableRef.current.state.data
        const newArray = idArray.map(data => data.cliente.props.data.id)
        tableRef.current.onToggleDetailPanel([newArray.indexOf(id)],
            rowData => {
                return (
                    <MaterialTable
                        tableRef={tableRefEmail}
                        icons={tableIcons}
                        title="Interacciones"
                        columns={[
                            { title: 'Interaccion', field: 'interaccion' },
                            { title: 'Estado', field: 'estado' },
                            { title: 'Fecha de Inicio', field: 'startDate', type: 'date' },
                            {
                                title: 'Fecha de Finalizacion',
                                field: 'endDate',
                                type: 'date'
                            },
                        ]}
                        data={query => {
                            return new Promise((resolve, reject) => {
                                axios.post(BackUrl + 'vista_clientes/interacciones/obtener_por_canal', { query, token: userLogged(), idCliente: id, canal: 'correo' }).then(res => {
                                    const newData = res.data.content.map(data => ({
                                        interaccion: data.comentario,
                                        estado: <Estado estado={data.estado_interaccion} />,
                                        startDate: data.hora_fecha_inicio,
                                        endDate: data.hora_fecha_termino
                                    }))
                                    resolve({
                                        data: newData,
                                        page: res.data.page,
                                        totalCount: res.data.totalCount
                                    })
                                }).catch(error => {
                                    console.log(error)
                                })
                            })
                        }}
                        actions={[
                            {
                                icon: () => <Edit />,
                                tooltip: 'Editar',
                                onClick: (event, rowData) => alert("editar" + rowData.interaccion)
                            },
                            rowData => ({
                                icon: () => <Delete />,
                                tooltip: 'Delete User',
                                onClick: (event, rowData) => confirm("You want to delete " + rowData.interaccion),
                                disabled: rowData.birthYear < 2000
                            }),
                            rowData => ({
                                icon: () => <EventIcon />,
                                tooltip: 'Delete User',
                                onClick: (event, rowData) => confirm("You want to delete " + rowData.interaccion),
                                disabled: rowData.birthYear < 2000
                            })
                        ]}
                        localization={{
                            header: {
                                actions: 'acciones'
                            }
                        }}
                        options={{
                            actionsColumnIndex: -1,
                            pageSize: pageSize,
                            pageSizeOptions: pageSizeOptions
                        }}
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
                    >
                    </MaterialTable>
                )
            }
        )
    }
    const Nombre = function (props) {
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
                    <h3 style={{ margin: 0 }}>{props.data.tipo == 'persona' ? props.data.nombres + ' ' + props.data.apellidos : props.data.empresa + ' ' + (props.data.ruc ? props.data.ruc : '')}<br /></h3>
                    Telefono:{props.data.telefono}<br />
                    Correo:{props.data.correo}
                </div>
                <div className={classes.interaccionesContainer}>
                    <Button className={classes.interaccionesButton} onClick={() => { togglePanelWhatsapp(props.data.id, 'whatsapp') }}>
                        <Badge badgeContent={props.data.interacciones.whastapp} classes={{ badge: classes.badge }} showZero>
                            <WhatsAppIcon />
                        </Badge>
                    </Button>
                    <Button className={classes.interaccionesButton} onClick={() => { togglePanelWhatsapp(props.data.id, 'llamadas') }}>
                        <Badge badgeContent={props.data.interacciones.telefono} classes={{ badge: classes.badge }} showZero>
                            <PhoneIcon />
                        </Badge>
                    </Button>
                    <Button className={classes.interaccionesButton} onClick={() => { togglePanelWhatsapp(props.data.id, 'correo') }}>
                        <Badge badgeContent={props.data.interacciones.correo} classes={{ badge: classes.badge }} showZero>
                            <MailOutlineIcon />
                        </Badge>
                    </Button>
                </div>
            </div>
        )
    }
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    };
    const [data, setData] = React.useState(
        [
            {
                cliente: <Nombre
                    data={
                        {
                            id: 25,
                            tipo: "empresa",
                            nombres: "",
                            apellidos: "",
                            genero: "",
                            empresa: "La iberica",
                            ruc: 212390,
                            telefono: 999999999,
                            correo: 'asd@gmail.com',
                            estado_cliente: 'Prospecto',
                            intencion_compra: 0,
                            numero_interacciones: 6,
                            cantidad_cierres: 1,

                            observacion: "",
                            hora_fecha_creacion: "2020-02-18T17:32:53.000Z",
                            direccion: "",
                            web: null,
                            interacciones: {
                                whatsapp: 1,
                                telefono: 2,
                                correo: 0
                            },
                            t_prospectos: {
                                id: 14,
                                id_cliente: 25,
                                porcentaje_cierre: 0.7,
                                prioridad: 5,
                                hora_fecha_creacion: "2020-02-18T17:32:53.000Z",
                                hora_fecha_contacto: "2020-02-05T05:00:00.000Z",
                                estado_finalizacion: "pendiente",
                                comentario: null,
                                id_estado_embudo_venta: 4
                            }
                        }
                    }
                />,
                prioridad: 5,
                estadoCliente: "Prospecto",
                intencionCompra: 0,
                numeroInteracciones: 3,
                cantidadCierres: 1
            },
            {
                cliente: <Nombre
                    data={
                        {
                            id: 25,
                            tipo: "persona",
                            nombres: "Andres Alejandro",
                            apellidos: "Juarez Jimenez",
                            genero: "H",
                            empresa: "",
                            ruc: null,
                            correo: 'and.all.jua.jim@hotmail.com',
                            telefono: 954651219,
                            estado_cliente: 'Prospecto',
                            intencion_compra: 1,
                            numero_interacciones: 9,
                            cantidad_cierres: 3,

                            observacion: "",
                            hora_fecha_creacion: "2020-02-18T17:32:53.000Z",
                            direccion: "",
                            web: null,
                            interacciones: {
                                whatsapp: 1,
                                telefono: 2,
                                correo: 0
                            },
                            t_prospectos: {
                                id: 14,
                                id_cliente: 25,
                                porcentaje_cierre: 0.7,
                                prioridad: 5,
                                hora_fecha_creacion: "2020-02-18T17:32:53.000Z",
                                hora_fecha_contacto: "2020-02-05T05:00:00.000Z",
                                estado_finalizacion: "pendiente",
                                comentario: null,
                                id_estado_embudo_venta: 4
                            }
                        }
                    }
                />,
                prioridad: 5,
                estadoCliente: "Prospecto",
                intencionCompra: 1,
                numeroInteracciones: 9,
                cantidadCierres: 3
            },
            {
                cliente: <Nombre
                    data={
                        {
                            id: 25,
                            tipo: "persona",
                            nombres: "Joel",
                            apellidos: "Valdez",
                            genero: "H",
                            empresa: "",
                            ruc: null,
                            correo: 'cvo523@hotmail.com',
                            telefono: 979957017,
                            estado_cliente: 'Cliente',
                            intencion_compra: 2,
                            numero_interacciones: 5,
                            cantidad_cierres: 2,

                            observacion: "",
                            hora_fecha_creacion: "2020-02-18T17:32:53.000Z",
                            direccion: "",
                            web: null,
                            interacciones: {
                                whatsapp: 1,
                                telefono: 2,
                                correo: 0
                            },
                            t_prospectos: {
                                id: 14,
                                id_cliente: 25,
                                porcentaje_cierre: 0.7,
                                prioridad: 10,
                                hora_fecha_creacion: "2020-02-18T17:32:53.000Z",
                                hora_fecha_contacto: "2020-02-05T05:00:00.000Z",
                                estado_finalizacion: "pendiente",
                                comentario: null,
                                id_estado_embudo_venta: 4
                            }
                        }
                    }
                />,
                prioridad: 10,
                estadoCliente: "Cliente",
                intencionCompra: 2,
                numeroInteracciones: 5,
                cantidadCierres: 2
            }
        ]
    )
    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                tableRef={tableRef}
                icons={tableIcons}
                columns={[
                    { title: "Clientes", field: "cliente", cellStyle: { width: '500px', display: 'block' }, sorting: false },
                    { title: "Prioridad", field: "prioridad", type: "numeric", cellStyle: { textAlign: 'center' }, headerStyle: { textAlign: 'center' } },
                    { title: "Estado", field: "estadoCliente", cellStyle: { textAlign: 'center' }, headerStyle: { textAlign: 'center' } },
                    // { title: "Intencion de compra", field: "birthCity", lookup: { 34: "İstanbul", 63: "Şanlıurfa" } }
                    { title: "Intencion de compra", field: "intencionCompra", type: 'numeric', cellStyle: { textAlign: 'center' }, headerStyle: { textAlign: 'center' } },
                    { title: "Numero de interacciones", field: "numeroInteracciones", type: 'numeric', cellStyle: { textAlign: 'center' }, headerStyle: { textAlign: 'center' } },
                    { title: "Cantidad de cierres", field: "cantidadCierres", type: 'numeric', cellStyle: { textAlign: 'center' }, headerStyle: { textAlign: 'center' } }
                ]}
                data={query => {
                    return new Promise((resolve, reject) => {
                        axios.post(BackUrl + 'vista_clientes/obtener', { query, token: userLogged() }).then(res => {
                            console.log(res)
                            const newData = res.data.content.map(data => ({
                                cliente: <Nombre
                                    data={data}
                                />,
                                prioridad: data.ultimo_prospecto.prioridad,
                                estadoCliente: data.estado_cliente,
                                intencionCompra: data.intencion_compra,
                                numeroInteracciones: data.numero_interacciones,
                                cantidadCierres: data.cantidad_cierres
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
                // data={data}
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
            // detailPanel={rowData => {
            //     return (
            //         <Button onClick={() => {
            //             tableRef.current.onToggleDetailPanel(
            //                 [rowData.tableData.id],
            //                 tableRef.current.props.detailPanel
            //             )
            //         }} >Close</Button>
            //     )
            // }}
            // detailPanel={[{
            //     icon: null,
            //     render: rowData => (
            //         <iframe
            //             width="100%"
            //             height="315"
            //             src="https://www.youtube.com/embed/C0DPdy98e4c"
            //             frameborder="0"
            //             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            //             allowFullScreen
            //         />
            //     )
            // }]}
            />
            <button onClick={() => { console.log(tableRef) }}>Print table ref</button>
        </div >
    );
}
