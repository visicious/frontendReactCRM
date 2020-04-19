import React from 'react'
import ChartInteracciones from './ChartInteracciones'
import { Grid } from '@material-ui/core'
import Metas from './Metas'
import InteraccionesEstadisticasTable from './InteraccionesEstadisticasTable'

export default function Estadisticas() {

    return (
        <Grid container>
            <Grid style={{ marginBottom: 50 }} item xs={12}>
                <ChartInteracciones />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Metas />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InteraccionesEstadisticasTable />
            </Grid>
        </Grid>
    )
}