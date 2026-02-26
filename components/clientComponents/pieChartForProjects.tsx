"use client"
import { Card, CardContent, CardTitle } from '../ui/card';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
type pieProp ={
  submittedByType: Record<string, number> | undefined;
  totalByType: Record<string, number> | undefined
}
const PieChartForProjects = ({submittedByType, totalByType}: pieProp)=>{
  const completedProject = submittedByType?.Project || 1;
  const totalProject = totalByType?.Project || 1
  const pieData= [{name:"completed", value:completedProject}, {name:"not started", value:totalProject}];
  const pieColors = [
  "#22c55e", 
  "#ef4444", 
]
  return (
  <Card>
    <CardTitle className="text-[18px] text-blue-500">Projects shows that weather it is completed or not started</CardTitle>
    {!submittedByType?.Project && <h2 className="m-2 p-2 text-red-500">Remember we have added one project as completed to show the pie chart, but when you submit the project this extra project will automatically removed!</h2>}
    <CardContent>
      <div className="h-[350px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie 
          data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            label
            outerRadius={80}
        >
            {pieData.map((_, index)=>(<Cell key={index} fill={pieColors[index]}/>))}
        </Pie>
        <Tooltip/>
        <Legend/>
      </PieChart>
    </ResponsiveContainer>
  </div>
    </CardContent>
  </Card>)
}

export default PieChartForProjects;