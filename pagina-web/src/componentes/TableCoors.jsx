import React from 'react'
import '../index.css'

export const TableCoors = ({date,time,long,lat}) => {

    return (
        <section className='container-coors'>
            <table className='content-table'>
                <tbody>
                    <tr className='colum'>
                        <td className='table-title'>Fecha</td>
                        <td className='table-item'>{date}</td>
                    </tr>
                    <tr className='colum'>
                        <td className='table-title'>Hora</td>
                        <td className='table-item'>{time}</td>
                    </tr>
                    <tr className='colum'>
                        <td className='table-title'>Longitud</td>
                        <td className='table-item'>{long}</td>
                    </tr>
                    <tr className='colum'>
                        <td className='table-title'>Latitud</td>
                        <td className='table-item'>{lat}</td>
                    </tr>
                </tbody>
            
            </table>
        </section>
    )
}
