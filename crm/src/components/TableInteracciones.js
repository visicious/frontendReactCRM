import React from 'react'
import axios from 'axios'
import MaterialTable, { MTableHeader } from 'material-table'
import { userLogged } from '../services/UserService'
import ToolbarTitle from './ToolbarTitle'
import { BackUrl } from '../utilities/const';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import EventIcon from '@material-ui/icons/Event';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import useStyles from '../styles/TableInteracciones';
import { useConfirmation } from '../services/ConfimationService';
import EditInteraccion from './EditInteraccion'
import EditFechaInteraccion from './EditFechaInteraccion'

function TableInteracciones(props) {
    const classes= useStyles()
    const confirm = useConfirmation();
    const { rowData, styles, tableRef, icons, consulta, id } = props;
    const [canal, setCanal] = React.useState(consulta);
    const [editOpen, setEditOpen] = React.useState(false);
    const [editFechaOpen, setEditFechaOpen] = React.useState(false)
    const [idInteraccion, setIdInteraccion] = React.useState();
    const [dataInteraccion, setDataInteraccion] = React.useState()
    const [settedData, setSettedData] = React.useState(false);
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
    const handleSetSettedData = value => {
        setSettedData(value);
    }
    const handleEditOpen = (id, data) => {
        setSettedData(false);
        setDataInteraccion(data);
        setIdInteraccion(id);
        setEditOpen(true);
    }
    const handleEditClose = result => {
        setEditOpen(false);
        if (result == 'OK') {
            refreshData()
        }
    }
    const handleEditFechaOpen = (id, data) => {
        setSettedData(false);
        setDataInteraccion(data);
        setIdInteraccion(id);
        setEditFechaOpen(true);
    }
    const handleEditFechaClose = result => {
        setEditFechaOpen(false);
        if (result == 'OK') {
            refreshData()
        }
    }
    const confirmar = (id) => {
        confirm({
            variant: "danger",
            catchOnCancel: true,
            title: 'Seguro que quiere eliminar esta interaccion',
            description: 'Eliminando esta interaccion tendra menos informacion sobre su cliente'
        })
            .then(() => {
                axios.post(BackUrl + 'interacciones/eliminar', {
                    id,
                    token: userLogged()
                }).then(res => {
                    props.tableRefMain.current.state.data[props.index].cliente.props.data.interacciones[canal]--
                    props.tableRefMain.current.state.data[props.index].numeroInteracciones--
                    props.updateMainTable();
                    refreshData()
                    console.log(res)
                }).catch(error => {
                    refreshData()
                    console.log(error)
                })
            })
            .catch(() => { console.log('nel prro') })
    }
    const refreshData = () => {
        return tableRef.current && tableRef.current.onQueryChange()
    }
    const addInteraccionVisual = () => {
        props.tableRefMain.current.state.data[props.index].cliente.props.data.interacciones[canal]++;
        props.tableRefMain.current.state.data[props.index].numeroInteracciones++;
        props.updateMainTable();
    }
    return (
        <>
            <MaterialTable
                tableRef={tableRef}
                style={styles}
                icons={icons}
                title={<ToolbarTitle refreshData={() => { addInteraccionVisual(); refreshData() }} idUltimoPropsecto={rowData.cliente.props.data.ultimoProspecto.id} correo={rowData.cliente.props.data.correo} telefono={rowData.cliente.props.data.telefono} canal={canal} />}
                columns={[
                    { title: 'Interaccion', field: 'interaccion' },
                    { title: 'Estado', field: 'estado' },
                    { title: 'Fecha de Inicio', field: 'startDate', type: 'datetime' },
                    {
                        title: 'Fecha de Finalizacion',
                        field: 'endDate',
                        type: 'datetime'
                    },
                ]}
                data={query => {
                    setCanal(query.canal ? query.canal : consulta)
                    return new Promise((resolve, reject) => {
                        axios.post(BackUrl + 'vista_clientes/interacciones/obtener_por_canal', { query, token: userLogged(), idCliente: id, canal: query.tipo ? query.tipo : consulta }).then(res => {
                            console.log(res)
                            const newData = res.data.content.map(data => ({
                                interaccion: data.comentario,
                                estado: <Estado estado={data.estadoInteraccion} id={data.id} data={data} />,
                                startDate: data.horaFechaInicio,
                                endDate: data.horaFechaTermino
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
                        tooltip: 'Editar Interaccion',
                        onClick: (event, rowData) => {
                            handleEditOpen(rowData.estado.props.id, rowData.estado.props.data)
                        }
                    },
                    rowData => ({
                        icon: () => <Delete />,
                        tooltip: 'Eliminar Interaccion',
                        onClick: (event, rowData) => {
                            confirmar(rowData.estado.props.id);
                        },
                    }),
                    rowData => ({
                        icon: () => <EventIcon className={rowData.endDate ? '' : classes.error} />,
                        tooltip: 'Fecha de finalizacion',
                        onClick: (event, rowData) => {
                            handleEditFechaOpen(rowData.estado.props.id, rowData.estado.props.data)
                        }
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
                    pageSize: 5,
                    pageSizeOptions: [3, 5, 10]
                }}
                components={{
                    Header: props => (
                        <MTableHeader style={styles.interaccionesTableHeader} {...props} />
                    )
                }}
            >
            </MaterialTable>
            <EditInteraccion open={editOpen} id={idInteraccion} handleClose={handleEditClose} settedData={settedData} setSettedData={handleSetSettedData} data={dataInteraccion} />
            <EditFechaInteraccion id={idInteraccion} open={editFechaOpen} handleClose={handleEditFechaClose} settedData={settedData} setSettedData={handleSetSettedData} horaFechaInicio={dataInteraccion && dataInteraccion.horaFechaInicio} horaFechaTermino={dataInteraccion && dataInteraccion.horaFechaTermino} />
        </>
    )
}
export default TableInteracciones