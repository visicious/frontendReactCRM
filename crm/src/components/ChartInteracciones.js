import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text, Customized, BarChart,
} from 'recharts';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TopSellers from './TopSellers';
import Summary from './Summary';
import axios from 'axios';
import { BackUrl } from '../utilities/const';
import { userLogged } from '../services/UserService';

export default function ChartInteracciones() {
    const [data, setData] = React.useState([
        {
            name: 'Page A', ganados: 4000, perdidos: 2400, generados: 2400,
        },
        {
            name: 'Page B', ganados: 3000, perdidos: 1398, generados: 2210,
        },
        {
            name: 'Page C', ganados: 2000, perdidos: 4000, generados: 2290,
        },
        {
            name: 'Page D', ganados: 2780, perdidos: 3908, generados: 2000,
        },
        {
            name: 'Page E', ganados: 1890, perdidos: 4800, generados: 2181,
        },
        {
            name: 'Page F', ganados: 2390, perdidos: 3800, generados: 2500,
        },
        {
            name: 'Page G', ganados: 3490, perdidos: 4300, generados: 2100,
        },
    ])
    React.useEffect(() => {
        let token = userLogged()
        axios.post(BackUrl + 'estadisticas/obtener', { token }).then(res => {
            console.log(res)
            if (res.data.message == 'OK') {
                setData(res.data.content)
            }
        }).catch(error => {
            console.log(error)
        })
    }, []);
    const randomData = () => {
        setData([
            {
                name: 'Page A', ganados: Math.floor(Math.random() * 10) * 1000, perdidos: Math.floor(Math.random() * 10) * 1000, generados: 5000,
            },
            {
                name: 'Page B', ganados: Math.floor(Math.random() * 10) * 1000, perdidos: Math.floor(Math.random() * 10) * 1000, generados: 2210,
            },
            {
                name: 'Page C', ganados: Math.floor(Math.random() * 10) * 1000, perdidos: Math.floor(Math.random() * 10) * 1000, generados: 2290,
            },
            {
                name: 'Page D', ganados: Math.floor(Math.random() * 10) * 1000, perdidos: Math.floor(Math.random() * 10) * 1000, generados: 2000,
            },
            {
                name: 'Page E', ganados: Math.floor(Math.random() * 10) * 1000, perdidos: Math.floor(Math.random() * 10) * 1000, generados: 2181,
            },
            {
                name: 'Page F', ganados: Math.floor(Math.random() * 10) * 1000, perdidos: Math.floor(Math.random() * 10) * 1000, generados: 2500,
            },
            {
                name: 'Page G', ganados: Math.floor(Math.random() * 10) * 1000, perdidos: Math.floor(Math.random() * 10) * 1000, generados: 2100,
            },
        ])
    }
    const [filters, setFilters] = React.useState({
        typeDate: 'S',
        canal: 'A'
    })
    const handleFilters = (value, prop) => {
        const newFilters = {
            ...filters,
            [prop]: value
        }
        setFilters(newFilters)
    }
    const Filters = () => {
        return (
            <Grid container >
                <Grid item xs={12}>
                    <FormControl style={{ margin: 5, width: 100 }}>
                        {/* <InputLabel>Semanal</InputLabel> */}
                        <Select
                            value={filters.typeDate}
                            onChange={(event) => { handleFilters(event.target.value, 'typeDate') }}
                        >
                            <MenuItem value={"S"}>Semanal</MenuItem>
                            <MenuItem value={"M"}>Mensual</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ margin: 5, width: 170 }}>
                        {/* <InputLabel>Canal</InputLabel> */}
                        <Select
                            value={filters.canal}
                            onChange={(event) => { handleFilters(event.target.value, 'canal') }}
                        >
                            <MenuItem value={"A"}>Todos los canales</MenuItem>
                            <MenuItem value={"L"}>Llamada</MenuItem>
                            <MenuItem value={"W"}>Whatsapp</MenuItem>
                            <MenuItem value={"E"}>Email</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }
    return (
        <>
            <Filters />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <ResponsiveContainer width="100%" height='100%' minHeight="300px" >
                        <LineChart
                            data={data}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="ganados" stroke="#8884d8" activeDot={{ r: 8 }} animationDuration={250} />
                            <Line type="monotone" dataKey="perdidos" stroke="#82ca9d" animationDuration={250} />
                            <Line type="monotone" dataKey="generados" stroke="#4e4e4e" animationDuration={250} />
                        </LineChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div>
                        <TopSellers />
                    </div>
                    <div>
                        <Summary timeType={'Mensual'} />
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
