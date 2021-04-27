import React, {useContext} from 'react'
import { Chart } from 'react-google-charts' 
import AlquevaAppContext from '../context/AlquevaAppContext'

const AreaChart = () => {
    const {state} = useContext(AlquevaAppContext)
    // console.log(state.filteredData)
 return (
     <div>
         <Chart
            width={'100%'}
            height={'500px'}
            chartType="AreaChart"
            loader={<div>A carregar gráfico...</div>}
            data={state.filteredData}
            options={{
                title: 'Cotas da albufeira de Alqueva',
                hAxis: { title: 'Data', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Cota (m)', minValue: 144 },
                // For the legend to fit, we make the chart area smaller
                chartArea: { width: '70%', height: '70%' },
                animation: {
                    duration: 1000,
                    easing: 'out',
                    startup: true,
                },
                lineWidth: 2
            }}
            // For tests
            rootProps={{ 'data-testid': '1' }}
        />
     </div>
 )
}

export {AreaChart as default}